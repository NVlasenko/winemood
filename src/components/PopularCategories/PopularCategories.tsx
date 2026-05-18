// import "./PopularCategories.scss";

// import redWineImage from "../../assets/images/red-wine.png";
// import type { Category } from "../../types/categories";
// import { SectionTitle } from "../SectionTitle";

// const categories: Category[] = [
//   {
//     id: 1,
//     title: "Red Wines",
//     type: "Red",
//     image: redWineImage,
//   },
//   {
//     id: 2,
//     title: "Rosé",
//     type: "Rosé",
//     image: redWineImage,
//   },
//   {
//     id: 3,
//     title: "Sparkling",
//     type: "Sparkling",
//     image: redWineImage,
//   },
//   {
//     id: 4,
//     title: "Premium",
//     type: "Premium",
//     image: redWineImage,
//   },
// ];

// const getCardClassName = (title: string) => {
//   switch (title) {
//     case "Red Wines":
//       return "popular-categories__card--red";

//     case "Rosé":
//       return "popular-categories__card--rose";

//     case "Sparkling":
//       return "popular-categories__card--sparkling";

//     case "Premium":
//       return "popular-categories__card--premium";

//     default:
//       return "";
//   }
// };

// export const PopularCategories = () => {
//   return (
//     <section className="popular-categories">
//       <div className="container">
//       <SectionTitle title="Popular Categories" />

//         <div className="popular-categories__grid">
//           {categories.map((category) => (
//             <article
//               key={category.id}
//               className={`
//               popular-categories__card
//               ${getCardClassName(category.title)}
//             `}
//             >
//               <h3 className="popular-categories__card-title">
//                 {category.title}
//               </h3>

//               <img
//                 className="popular-categories__card-image"
//                 src={category.image}
//                 alt={category.title}
//               />
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import { useEffect, useState } from 'react';

import './PopularCategories.scss';

import redWineImage from '../../assets/images/red-wine.png';

import { SectionTitle } from '../SectionTitle';
import type { Category } from '../../types/categories';
import { getCategories } from '../../shared/api/categoryApi';

const getCardClassName = (type: string) => {
  switch (type) {
    case 'Red':
      return 'popular-categories__card--red';

    case 'Rosé':
      return 'popular-categories__card--rose';

    case 'Sparkling':
      return 'popular-categories__card--sparkling';

    case 'Premium':
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
                src={category.image || redWineImage}
                alt={category.title}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};