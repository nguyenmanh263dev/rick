import axios from "axios";
import { IReportByCategory, IReportByPeriod, IReportGeneral } from "types";

const url = "/report/";
const getGeneralReport = async (date: string) => {
  const { data } = await axios.get<IReportGeneral>(url + "general", {
    params: { date },
  });
  console.log(url + "general");

  return data;
};

const getTargetReport = async (date: string) => {
  const { data } = await axios.get(url + "target", { params: { date } });
  return data;
};

const getReport = async (params: { fromDate: string; toDate: string }) => {
  const { data } = await axios.get(url, { params });
  return data;
};

const getReportByCategory = async (
  date: string
): Promise<IReportByCategory[]> => {
  const { data } = await axios.get(url + "by-category", {
    params: { date },
  });
  return data;
};

const getReportByPeriod = async (params: {
  fromDate: string;
  toDate: string;
}): Promise<IReportByPeriod[]> => {
  const { data } = await axios.get(url + "by-period", { params });
  return data;
};
export {
  getGeneralReport,
  getTargetReport,
  getReport,
  getReportByCategory,
  getReportByPeriod,
};
