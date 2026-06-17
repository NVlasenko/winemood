import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { getCategories } from "@/shared/api/categoryApi";
import type { Category } from "@/types/categories";

import {
  CARD_CLASS_BY_TYPE,
  WINE_TYPE_BY_CATEGORY,
} from "./config/categoryMappings";

import "./PopularCategories.scss";

const normalizeCategoryType = (type: string) => type.toLowerCase();

const getWineTypeByCategory = (type: string) =>
  WINE_TYPE_BY_CATEGORY[normalizeCategoryType(type)] || "";

const getCardClassName = (type: string) =>
  CARD_CLASS_BY_TYPE[normalizeCategoryType(type)] || "";

export const PopularCategories = () => {
  const navigate = useNavigate();

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

  const handleCategoryClick = useCallback(
    (type: string) => {
      const wineType = getWineTypeByCategory(type);

      navigate(wineType ? `/catalog?wineTypes=${wineType}` : "/catalog");
    },
    [navigate]
  );

  const renderContent = () => {
    if (loading) {
      return <p className="popular-categories__state">Loading categories...</p>;
    }

    if (error) {
      return (
        <p className="popular-categories__state popular-categories__state--error">
          {error}
        </p>
      );
    }

    if (!categories.length) {
      return <p className="popular-categories__state">No categories found.</p>;
    }

    return (
      <div className="popular-categories__grid">
        {categories.map((category) => {
          const cardModifier = getCardClassName(category.type);

          return (
            <button
              key={category.id}
              className={`popular-categories__card ${cardModifier}`}
              type="button"
              onClick={() => handleCategoryClick(category.type)}
            >
              <h3 className="popular-categories__card-title">
                {category.title}
              </h3>

              <img
                className="popular-categories__card-image"
                src={category.image}
                alt={category.title}
              />
            </button>
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