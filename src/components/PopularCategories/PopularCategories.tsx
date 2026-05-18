import { useEffect, useState } from 'react';
import './PopularCategories.scss';
import { SectionTitle } from '../SectionTitle';
import type { Category } from '../../types/categories';
import { getCategories } from '../../shared/api/categoryApi';

const getCardClassName = (type: string) => {
  switch (type.toLowerCase()) {
    case 'red':
      return 'popular-categories__card--red';

    case 'rosé':
    case 'rose':
      return 'popular-categories__card--rose';

    case 'sparkling':
      return 'popular-categories__card--sparkling';

    case 'premium':
      return 'popular-categories__card--premium';

    default:
      return '';
  }
};

export const PopularCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="popular-categories">
      <div className="container">
        <SectionTitle title="Popular Categories" />

        <div className="popular-categories__grid">
          {categories.map(category => (
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