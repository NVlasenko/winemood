// import { API_BASE_URL } from "./config";

// export type FilterOptionsResponse = {
//   wineTypes: string[];
// };

// export const getFilterOptions =
//   async (): Promise<FilterOptionsResponse> => {
//     const response = await fetch(
//       `${API_BASE_URL}/api/wines/filter-options`,
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Failed to load filter options: ${response.status}`,
//       );
//     }

//     return response.json();
//   };