module.exports = {
  globDirectory: "hosting/",
  globPatterns: ["**/*.{html,svg,png,js,css}"],
  swDest: "public/sw.js",
  runtimeCaching: [
    {
      urlPattern: /\.(?:webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "dlnr_media",
        expiration: {
          maxEntries: 20,
        },
      },
    },
  ],
};
