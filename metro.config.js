const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(
  {
    ...config,
    projectRoot: __dirname, // ← đảm bảo lấy đúng root
    resolver: {
      ...config.resolver,
      alias: {
        "@utils": path.resolve(__dirname, "utils"),
        "@services": path.resolve(__dirname, "services"),
        "@components": path.resolve(__dirname, "components"),
        "@hooks": path.resolve(__dirname, "hooks"),
        "@types": path.resolve(__dirname, "types"),
        "@context": path.resolve(__dirname, "context"),
      },
    },
  },
  {
    input: path.resolve(__dirname, "global.css"), // ← dùng absolute path
  }
);
