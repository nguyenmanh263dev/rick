import axios from "../libs/axios";

const login = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", {
    username: email,
    password,
  });
  const { data } = response;
  console.log(
    {
      username: email,
      password,
    },
    response.data
  );

  return data;
};

const getMyInfo = async () => {
  const { data } = await axios.get("/user/me");

  return data;
};
export { login, getMyInfo };
