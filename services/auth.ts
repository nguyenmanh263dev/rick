import axios from "../libs/axios";

const login = async (email: string, password: string) => {
  return axios.post("login", {
    email,
    password,
  });
};

export { login };
