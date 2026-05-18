import { useEffect, useState } from "react";

import "./PopularCategories.scss";

import { SectionTitle } from "../SectionTitle";

import type { Category } from "../../types/categories";

import { getCategories } from "../../shared/api/categoryApi";

const getCardClassName = (type: string) => {
  switch (type.toLowerCase()) {
    case "red":
      return "popular-categories__card--red";

    case "rosé":
    case "rose":
      return "popular-categories__card--rose";

    case "sparkling":
      return "popular-categories__card--sparkling";

    case "premium":
      return "popular-categories__card--premium";

    default:
      return "";
  }
};

export const PopularCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);

        setError("");

        const data = await getCategories();

        if (!Array.isArray(data)) {
          throw new Error("Invalid categories data");
        }

        setCategories(data);
      } catch (error) {
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
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="popular-categories">
        <div className="container">
          <SectionTitle title="Popular Categories" />

          <p className="popular-categories__state">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="popular-categories">
        <div className="container">
          <SectionTitle title="Popular Categories" />

          <p className="popular-categories__state popular-categories__state--error">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="popular-categories">
        <div className="container">
          <SectionTitle title="Popular Categories" />

          <p className="popular-categories__state">No categories found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-categories">
      <div className="container">
        <SectionTitle title="Popular Categories" />

        <div className="popular-categories__grid">
          {categories.map((category) => (
            <article
              key={category.id}
              className={`
                popular-categories__card
                ${getCardClassName(category.type)}
              `}
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
          ))}
        </div>
      </div>
    </section>
  );
};
