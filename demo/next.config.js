module.exports = {
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? "../docs" : undefined,
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/turbo-colormap" : undefined,
  trailingSlash: true,
};
