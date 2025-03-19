export const extractDomain = (link: string) => {
  try {
    return new URL(link).hostname
  } catch (e) {
    console.log(e)
  }
}
