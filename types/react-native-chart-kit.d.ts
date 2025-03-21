declare module "react-native-chart-kit" {
  import { ReactNode } from "react";
  import { ViewStyle } from "react-native";

  export interface ChartConfig {
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    backgroundGradientFromOpacity?: number;
    backgroundGradientToOpacity?: number;
    color?: (opacity?: number) => string;
    strokeWidth?: number;
    barPercentage?: number;
    useShadowColorFromDataset?: boolean;
    decimalPlaces?: number;
    propsForLabels?: object;
    propsForBackgroundLines?: object;
    fillShadowGradient?: string;
    fillShadowGradientOpacity?: number;
  }

  export interface LineChartData {
    labels: string[];
    datasets: {
      data: number[];
      color?: (opacity?: number) => string;
      strokeWidth?: number;
    }[];
    legend?: string[];
  }

  export interface LineChartProps {
    data: LineChartData;
    width: number;
    height: number;
    chartConfig: ChartConfig;
    bezier?: boolean;
    style?: ViewStyle;
    withDots?: boolean;
    withShadow?: boolean;
    withInnerLines?: boolean;
    withOuterLines?: boolean;
    withHorizontalLines?: boolean;
    withVerticalLines?: boolean;
    yAxisLabel?: string;
    yAxisSuffix?: string;
    yAxisInterval?: number;
  }

  export interface PieChartData {
    name: string;
    amount: number;
    color: string;
    legendFontColor?: string;
    legendFontSize?: number;
  }

  export interface PieChartProps {
    data: PieChartData[];
    width: number;
    height: number;
    chartConfig: ChartConfig;
    accessor: string;
    backgroundColor?: string;
    paddingLeft?: string;
    center?: [number, number];
    absolute?: boolean;
    hasLegend?: boolean;
  }

  export interface BarChartData {
    labels: string[];
    datasets: {
      data: number[];
      colors?: string[];
      color?: string | ((opacity: number) => string);
    }[];
  }

  export interface BarChartProps {
    data: BarChartData;
    width: number;
    height: number;
    chartConfig: ChartConfig;
    style?: ViewStyle;
    yAxisLabel?: string;
    yAxisSuffix?: string;
    withInnerLines?: boolean;
    showBarTops?: boolean;
    showValuesOnTopOfBars?: boolean;
  }

  export class LineChart extends React.Component<LineChartProps> {}
  export class PieChart extends React.Component<PieChartProps> {}
  export class BarChart extends React.Component<BarChartProps> {}
  export class ProgressChart extends React.Component<any> {}
  export class ContributionGraph extends React.Component<any> {}
  export class StackedBarChart extends React.Component<any> {}
}
