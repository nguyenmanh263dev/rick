import axios from "axios";
import { IReportGeneral } from "types";

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

export { getGeneralReport, getTargetReport, getReport };
