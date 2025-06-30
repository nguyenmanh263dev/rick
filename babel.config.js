const { types } = require("@babel/core");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            utils: "./utils",
            services: "./services",
            components: "./components",
            hooks: "./hooks",
            types: "./types",
            context: "./context",
          },
        },
      ],
    ],
  };
};
