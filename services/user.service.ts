import type { IUserConfig } from '@types';
import axios from 'axios';

const url = '/user-config/';
const getUserConfig = async () => {
  const { data } = await axios.get<IUserConfig>(url);
  return data;
};

const setUserConfig = async (config: { key: string; value: string }[]) => {
  const { data } = await axios.post(url, config);
  return data;
};

export { getUserConfig, setUserConfig };
