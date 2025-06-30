import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import secureStore from "./secure-store";

// Configure axios defaults
// axios.defaults.baseURL = process.env.API_BASE_URL;
axios.defaults.baseURL = "http://localhost:2603";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await secureStore.getTokenSecure();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("Response Error:", error, error.request);

    // Handle common error statuses
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
      } else if (error.response.status === 403) {
        console.error("Forbidden! You do not have access.");
      } else if (error.response.status === 500) {
        console.error("Server Error! Please try again later.");
      }
    } else if (error.request) {
      console.error("No response received from the server:", error.request);
    } else {
      console.error("Error in setting up the request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axios;
