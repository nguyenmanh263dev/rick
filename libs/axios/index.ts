import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: "https://api.example.com", // Replace with your base URL
  timeout: 5000, // Request timeout in milliseconds
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Authorization token to headers if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request Sent:", config);
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    console.log("Response Received:", response);
    return response;
  },
  (error: AxiosError) => {
    console.error("Response Error:", error);

    // Handle common error statuses
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        // Perform actions like redirecting to login
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        console.error("Forbidden! You do not have access.");
      } else if (error.response.status === 500) {
        console.error("Server Error! Please try again later.");
      }
    } else if (error.request) {
      // No response was received
      console.error("No response received from the server:", error.request);
    } else {
      console.error("Error in setting up the request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
