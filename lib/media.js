const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

const DEFAULT_BACKEND_ORIGIN = "http://localhost:8080";

const getBackendOrigin = () => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return DEFAULT_BACKEND_ORIGIN;
  }
};

const isPlainObject = (value) =>
  Object.prototype.toString.call(value) === "[object Object]";

export const resolveAssetUrl = (value) => {
  if (typeof value !== "string") return value;

  const url = value.trim();
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }

  const backendOrigin = getBackendOrigin();

  if (url.startsWith("/uploads/")) {
    return `${backendOrigin}${url}`;
  }

  try {
    const parsed = new URL(url);

    if (!parsed.pathname.startsWith("/uploads/")) {
      return url;
    }

    return `${backendOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
};

export const normalizeMediaUrlsDeep = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeMediaUrlsDeep(item));
  }

  if (typeof value === "string") {
    return resolveAssetUrl(value);
  }

  if (!value || typeof value !== "object" || !isPlainObject(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      normalizeMediaUrlsDeep(nestedValue),
    ])
  );
};

export const getAssetFileName = (value, fallback = "") => {
  const resolvedUrl = resolveAssetUrl(value);

  if (typeof resolvedUrl !== "string" || !resolvedUrl) {
    return fallback;
  }

  const lastSegment = resolvedUrl.split("/").pop() || fallback;
  return decodeURIComponent(lastSegment);
};
