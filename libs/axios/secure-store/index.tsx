import * as Keychain from "react-native-keychain";

// Lưu token
const saveTokenSecure = async (token: string) => {
  try {
    console.log("saveeeeeee", token);

    await Keychain.setGenericPassword("authToken", token);
  } catch (error) {
    console.error("Error saving token securely:", error);
  }
};

// Lấy token
const getTokenSecure = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    console.log(12, credentials);

    if (credentials) {
      const token = credentials.password;

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
