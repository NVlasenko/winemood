import { useEffect, useState } from "react";

import "./PopularCategories.scss";

import { SectionTitle } from "../SectionTitle";
import type { Category } from "../../types/categories";
import { getCategories } from "../../shared/api/categoryApi";

const getCardClassName = (type: string) => {
  const normalizedType = type.toLowerCase();

  const classByType: Record<string, string> = {
    red: "popular-categories__card--red",
    rosé: "popular-categories__card--rose",
    rose: "popular-categories__card--rose",
    sparkling: "popular-categories__card--sparkling",
    premium: "popular-categories__card--premium",
  };

  return classByType[normalizedType] || "";
};

export const PopularCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCategories();

        if (!Array.isArray(data)) {
          throw new Error("Invalid categories data");
        }

        if (isMounted) {
          setCategories(data);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load categories:", error);

        if (error instanceof TypeError) {
          setError("Network error. Please check your internet connection.");
          return;
        }

        if (error instanceof Error) {
          if (error.message.includes("404")) {
            setError("Categories endpoint not found.");
            return;
          }

          if (error.message.includes("500")) {
            setError("Server error. Please try again later.");
            return;
          }

          if (error.message.includes("Failed to fetch")) {
            setError("Unable to connect to the server.");
            return;
          }

          setError(error.message);
          return;
        }

        setError("Something went wrong.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <p className="popular-categories__state">
          Loading categories...
        </p>
      );
    }

    if (error) {
      return (
        <p className="popular-categories__state popular-categories__state--error">
          {error}
        </p>
      );
    }

    if (!categories.length) {
      return (
        <p className="popular-categories__state">
          No categories found.
        </p>
      );
    }

    return (
      <div className="popular-categories__grid">
        {categories.map((category) => {
          const cardModifier = getCardClassName(category.type);

          return (
            <article
              key={category.id}
              className={`popular-categories__card ${cardModifier}`}
            >
              <h3 className="popular-categories__card-title">
                {category.title}
              </h3>

              <img
                className="popular-categories__card-image"
                src={category.image}
                alt={category.title}
              />
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <section className="popular-categories">
      <div className="container">
        <SectionTitle title="Popular Categories" />

        {renderContent()}
      </div>
    </section>
  );
};