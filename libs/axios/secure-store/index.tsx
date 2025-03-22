import * as Keychain from "react-native-keychain";

// Lưu token
const saveTokenSecure = async (token: string) => {
  try {
    await Keychain.setGenericPassword("authToken", token);
    console.log("Token saved securely");
  } catch (error) {
    console.error("Error saving token securely:", error);
  }
};

// Lấy token
const getTokenSecure = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const token = credentials.password;
      try {
        console.log(JSON.parse(token || "{}"));
      } catch (e) {
        // Handle non-JSON tokens silently
      }
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving token securely:", error);
    return null;
  }
};

// Xóa token
const removeTokenSecure = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log("Token removed securely");
  } catch (error) {
    console.error("Error removing token securely:", error);
  }
};

const secureStore = {
  saveTokenSecure,
  getTokenSecure,
  removeTokenSecure,
};

export default secureStore;
