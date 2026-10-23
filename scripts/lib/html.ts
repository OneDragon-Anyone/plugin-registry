import sanitizeHtml from "sanitize-html";

const ABSOLUTE_URL = /^[a-z][a-z0-9+.-]*:|^\/\//i;

function resolveRepoUrl(url: string, base: string): string {
  if (!url || url.startsWith("#") || ABSOLUTE_URL.test(url)) return url;
  return new URL(url.replace(/^\/+/, ""), base).toString();
}

export function renderSafeHtml(html: string | undefined, repo: string, commit: string): string {
  if (!html) return "";
  const blobBase = `https://github.com/${repo}/blob/${commit}/`;
  const rawBase = `https://raw.githubusercontent.com/${repo}/${commit}/`;
  const aligned = ["align"];

  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "details", "summary", "kbd", "del", "ins", "sup", "sub"],
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title", "width", "height", "align"],
      td: ["align", "colspan", "rowspan"],
      th: ["align", "colspan", "rowspan"],
      div: aligned,
      p: aligned,
      h1: aligned,
      h2: aligned,
      h3: aligned,
      details: ["open"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      a: (tagName, attribs) => {
        const href = resolveRepoUrl(attribs.href ?? "", blobBase);
        const external = href && !href.startsWith("#");
        return {
          tagName,
          attribs: external ? { ...attribs, href, rel: "nofollow noopener noreferrer", target: "_blank" } : { ...attribs, href }
        };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, src: resolveRepoUrl(attribs.src ?? "", rawBase), loading: "lazy" }
      })
    }
  });
}
