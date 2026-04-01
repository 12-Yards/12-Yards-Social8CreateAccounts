export function updatePageSEO(options: {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}) {
  const { title, description, url, image = "/favicon.png", type = "website" } = options;
  const baseUrl = "https://social8.app";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  document.title = title;

  const updates: [string, string, string][] = [
    ['meta[name="description"]', "content", description],
    ['meta[property="og:title"]', "content", title],
    ['meta[property="og:description"]', "content", description],
    ['meta[property="og:url"]', "content", fullUrl],
    ['meta[property="og:image"]', "content", image],
    ['meta[property="og:type"]', "content", type],
    ['meta[name="twitter:title"]', "content", title],
    ['meta[name="twitter:description"]', "content", description],
    ['meta[name="twitter:url"]', "content", fullUrl],
    ['link[rel="canonical"]', "href", fullUrl],
  ];

  for (const [selector, attr, value] of updates) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }
}

export function resetPageSEO() {
  updatePageSEO({
    title: "Community Management Software for Clubs & Members | Social8",
    description: "Social8 is an all-in-one community management platform for clubs and communities. Manage members, events, competitions, content, and reciprocal play from one powerful system.",
    url: "/",
  });
}
