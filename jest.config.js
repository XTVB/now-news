const esModules = ["@now"].join("|");
const preset = require("jest-preset-angular/jest-preset");

module.exports = {
  globals: {
    "ts-jest": {
      stringifyContentPathRegex: "\\.html$",
      astTransformers: [
        "jest-preset-angular/InlineHtmlStripStylesTransformer.js",
      ],
      tsConfig: "<rootDir>/src/tsconfig.spec.json",
      allowSyntheticDefaultImports: false,
    },
  },
  verbose: true,
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  moduleNameMapper: preset.moduleNameMapper,
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
};
