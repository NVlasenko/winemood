import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { getCategories } from "@/shared/api/categoryApi";
import arrowRight from "@/assets/images/icons/arrow-right.svg";

import type { Category } from "@/types/categories";

import {
  WINE_TYPE_BY_CATEGORY,
} from "@/components/home/PopularCategories/config/categoryMappings";

import "./ProfileCategories.scss";

type CategoryTypeKey = keyof typeof WINE_TYPE_BY_CATEGORY;

const normalizeCategoryType = (type: string) =>
  type.trim().toLowerCase();

const isCategoryTypeKey = (type: string): type is CategoryTypeKey =>
  type in WINE_TYPE_BY_CATEGORY;

const getWineTypeByCategory = (type: string) => {
  const normalized = normalizeCategoryType(type);
  return isCategoryTypeKey(normalized)
    ? WINE_TYPE_BY_CATEGORY[normalized]
    : "";
};

export const ProfileCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleClick = useCallback(
    (type: string) => {
      const wineType = getWineTypeByCategory(type);
      navigate(
        wineType
          ? `/catalog?wineTypes=${wineType}`
          : "/catalog"
      );
    },
    [navigate]
  );

  return (
    <section className="profile-categories">
      <div className="container">
        <SectionTitle title="For You" />

        <div className="profile-categories__grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="profile-categories__card"
            >
              <img
                src={category.profileImage}
                alt={category.title}
                className="profile-categories__image"
              />

              <div className="profile-categories__overlay" />

              <div className="profile-categories__title-wrapper">
                <h3 className="profile-categories__title">
                  {category.title}
                </h3>
              </div>

              <div className="profile-categories__content">
                <button
                  className="profile-categories__button"
                  onClick={() => handleClick(category.type)}
                >
                  See more
                  <img
                    src={arrowRight}
                    className="profile-categories__arrow"
                    alt=""
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};