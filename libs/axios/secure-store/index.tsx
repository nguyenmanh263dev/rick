import * as SecureStore from "expo-secure-store";

// Lưu token
const saveTokenSecure = async (token: string) => {
  try {
    await SecureStore.setItemAsync("authToken", token);
    console.log("Token saved securely");
  } catch (error) {
    console.error("Error saving token securely:", error);
  }
};

// Lấy token
const getTokenSecure = async () => {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token securely:", error);
    return null;
  }
};

// Xóa token
const removeTokenSecure = async () => {
  try {
    await SecureStore.deleteItemAsync("authToken");
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
