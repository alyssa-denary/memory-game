module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env")({ stage: 1 }),
    // require("cssnano"),
    require("postcss-nested"),
    require("postcss-custom-media"),
    require("postcss-media-minmax"),
    require("autoprefixer"),
  ],
};
