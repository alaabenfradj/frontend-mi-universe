// craco.config.js
const dotenvCra = require("dotenv-cra");
process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenvCra.config();
//
let plugins = [require("tailwindcss"), require("autoprefixer")];
// ENABLE IF RUN WITH RTL VERSION
if (process.env.REACT_APP_LRT_OR_RTL === "rtl") {
  plugins[2] = require("postcss-cssjanus");
}

module.exports = {
  style: {
    postcss: {
      plugins,
    },
  },
};
