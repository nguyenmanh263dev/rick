import axios from "../libs/axios";

const login = async (email: string, password: string) => {
  const { data } = await axios.post("/auth/login", {
    username: email,
    password,
  });

  return data;
};

const getMyInfo = async () => {
  const { data } = await axios.get("/user/me");
  console.log(44, data);

  return data;
};
export { login, getMyInfo };
