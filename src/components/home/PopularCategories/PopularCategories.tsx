import { useCallback } from "react";
import { useNavigate } from "react-router";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionState } from "@/components/ui/SectionState";

import type { Category } from "@/types/categories";

import {
  CARD_CLASS_BY_TYPE,
  WINE_TYPE_BY_CATEGORY,
} from "./config/categoryMappings";

import "./PopularCategories.scss";

type CategoryTypeKey = keyof typeof WINE_TYPE_BY_CATEGORY;

type PopularCategoriesProps = {
  categories: Category[];
};

const normalizeCategoryType = (type: string) => {
  return type.trim().toLowerCase();
};

const isCategoryTypeKey = (
  type: string,
): type is CategoryTypeKey => {
  return type in WINE_TYPE_BY_CATEGORY;
};

const getCategoryTypeKey = (
  type: string,
): CategoryTypeKey | null => {
  const normalizedType = normalizeCategoryType(type);

  return isCategoryTypeKey(normalizedType)
    ? normalizedType
    : null;
};

const getWineTypeByCategory = (type: string) => {
  const categoryTypeKey = getCategoryTypeKey(type);

  return categoryTypeKey
    ? WINE_TYPE_BY_CATEGORY[categoryTypeKey]
    : "";
};

const getCardClassName = (type: string) => {
  const categoryTypeKey = getCategoryTypeKey(type);

  return categoryTypeKey
    ? CARD_CLASS_BY_TYPE[categoryTypeKey]
    : "";
};

export const PopularCategories = ({
  categories,
}: PopularCategoriesProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = useCallback(
    (type: string) => {
      const wineType =
        getWineTypeByCategory(type);

      navigate(
        wineType
          ? `/catalog?wineTypes=${wineType}`
          : "/catalog",
      );
    },
    [navigate],
  );

  const renderContent = () => {
    if (!categories.length) {
      return (
        <SectionState
          variant="empty"
          text="No categories found."
        />
      );
    }

    return (
      <div className="popular-categories__grid">
        {categories.map((category) => {
          const cardModifier =
            getCardClassName(category.type);

          return (
            <button
              key={category.id}
              className={`popular-categories__card ${cardModifier}`}
              type="button"
              onClick={() =>
                handleCategoryClick(category.type)
              }
            >
              <h3 className="popular-categories__card-title">
                {category.title}
              </h3>

              <img
                className="popular-categories__card-image"
                src={category.homeImage}
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