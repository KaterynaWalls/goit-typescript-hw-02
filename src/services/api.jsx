import axios from "axios";

const BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  const images = response.data.results.map((img) => ({
    id: img.id,
    smallUrl: img.urls.small,
    largeUrl: img.urls.regular,
    name: img.alt_description || "Image",
  }));
  const totalPages = Math.ceil(response.data.total / 12);
  return { images, totalPages };
};
