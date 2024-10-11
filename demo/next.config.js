module.exports = {
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? "../docs" : undefined,
  basePath: "/turbo-colormap",
  assetPrefix: "/turbo-colormap/",
  trailingSlash: true,
};
