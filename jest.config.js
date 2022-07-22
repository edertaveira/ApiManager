/*global module*/
module.exports = {
  transform: {
    "\\.[jt]sx?$": "esbuild-jest",
  },
  globals: {
    window: {},
  },
};
