import axios from "axios";

const BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("ACCESS_KEY is missing!");
}
interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}
interface ApiResponse {
  results: UnsplashImage[];
  total: number;
}
interface ImageData {
  id: string;
  smallUrl: string;
  largeUrl: string;
  name: string;
}
interface FetchImagesResult {
  images: ImageData[];
  totalPages: number;
}
export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<FetchImagesResult> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: 12,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });
    const images: ImageData[] = response.data.results.map((img) => ({
      id: img.id,
      smallUrl: img.urls.small,
      largeUrl: img.urls.regular,
      name: img.alt_description || "Image",
    }));
    const totalPages = Math.ceil(response.data.total / 12);
    return { images, totalPages };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images.");
  }
};
