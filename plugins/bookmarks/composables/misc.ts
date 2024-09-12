export function extractDomain (link: string) {
  try {
    return new URL(link).hostname
  } catch (e) {}
}
