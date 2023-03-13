const auditsForPerformanceCategory = [
  {
    id: "total-blocking-time",
    weight: 30,
    group: "metrics",
    acronym: "TBT",
    relevantAudits: [
      "long-tasks", // scripts
      "third-party-summary", // scripts
      "third-party-facades", // scripts
      "bootup-time", // scripts
      "mainthread-work-breakdown", // common
      "dom-size", // page structure
      "duplicated-javascript", // scripts
      "legacy-javascript", // scripts
      "viewport", // seo
    ],
  },
  {
    id: "largest-contentful-paint",
    weight: 25,
    group: "metrics",
    acronym: "LCP",
    relevantAudits: [
      "server-response-time", // server response time
      "render-blocking-resources", // css file, js, and font from google
      "redirects", // other
      "critical-request-chains", // other
      "uses-text-compression", // fonts
      "uses-rel-preconnect", // other
      "uses-rel-preload", // other
      "font-display", // fonts
      "unminified-javascript", // minify
      "unminified-css", // minify
      "unused-css-rules", // unused CSS
      "largest-contentful-paint-element", // lazy loaded image above the fold
      "preload-lcp-image", // other
      "unused-javascript", // unused JS
      "efficient-animated-content", // other - gif warning
      "total-byte-weight", //
    ],
  },
  {
    id: "cumulative-layout-shift",
    weight: 15,
    group: "metrics",
    acronym: "CLS",
    relevantAudits: [
      "layout-shift-elements",
      "non-composited-animations",
      "unsized-images",
    ],
  },
  {
    id: "first-contentful-paint",
    weight: 10,
    group: "metrics",
    acronym: "FCP",
    relevantAudits: [
      "server-response-time",
      "render-blocking-resources",
      "redirects",
      "critical-request-chains",
      "uses-text-compression",
      "uses-rel-preconnect",
      "uses-rel-preload",
      "font-display",
      "unminified-javascript",
      "unminified-css",
      "unused-css-rules",
    ],
  },
];
