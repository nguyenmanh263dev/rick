import { NavigatorScreenParams } from "@react-navigation/native";
import { ICategory } from "./category.type";

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Calendar: undefined;
  Wallet: undefined;
  Profile: undefined;
  VerifyPin: undefined;
  CategoryDetail: undefined;
  CategoryDetailForm: { category: ICategory };
  ReportDetail: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
