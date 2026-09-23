export function getSafeReturnUrl(value: string | undefined, fallback = "/") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  try {
    const baseUrl = new URL("https://patient.local");
    const returnUrl = new URL(value, baseUrl);

    if (returnUrl.origin !== baseUrl.origin) {
      return fallback;
    }

    return `${returnUrl.pathname}${returnUrl.search}${returnUrl.hash}`;
  } catch {
    return fallback;
  }
}
