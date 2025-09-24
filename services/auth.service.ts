import axios from "../libs/axios";

const login = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", {
    username: email,
    password,
  });
  const { data } = response;

  return data;
};

const getMyInfo = async () => {
  try {
    const { data } = await axios.get("/user/me");
    return data;
  } catch (error) {
    return null;
  }
};
export { login, getMyInfo };
