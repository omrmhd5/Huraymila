export function resolveMediaUrl(imageUrl) {
  if (!imageUrl) return "";
  if (
    imageUrl.startsWith("http") ||
    imageUrl.startsWith("/assets/") ||
    imageUrl.startsWith("data:")
  ) {
    return imageUrl;
  }

  const origin = (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
  ).replace(/\/api\/?$/, "");
  const path = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return `${origin}${path}`;
}
