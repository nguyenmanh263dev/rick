import { Platform } from "react-native";

// Environment variables
const ENV = {
  dev: {
    API_BASE_URL: "https://api.example.com",
    AUTH_TOKEN: "",
  },
  prod: {
    API_BASE_URL: "https://api.example.com",
    AUTH_TOKEN: "",
  },
};

// Get the environment based on the platform
const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars();
