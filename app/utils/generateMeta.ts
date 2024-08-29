/**
 * Generates meta tags for a given page title.
 * @param {string} title - The title of the page.
 * @returns {Array} An array containing the title and description meta tags.
 */
export function generateMeta(title: string) {
  return () => [
    { title: `${title} | Melody Help` },
    {
      name: "description",
      content: "Simple Music Streaming Web App",
    },
  ];
}
