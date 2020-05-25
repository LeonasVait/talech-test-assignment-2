import React from "react";
import HighCharts from "react-highcharts";

import { Product } from "../services/ProductsService";
import { HistoryEntry } from "../services/HistoryService";

interface Props {
  yAxisText: string;
  seriesDescription: string;
  product: Product;
  history: HistoryEntry[];
  maxLength: number;
}

export function HistoryView({
  seriesDescription,
  yAxisText,
  product,
  history,
  maxLength
}: Props) {
  const displayed = history.slice(
    history.length - 1 - maxLength,
    history.length
  );

  const timeOffset = -new Date().getTimezoneOffset() * 60 * 1000;

  const config: Highcharts.Options = {
    title: { style: { visibility: "hidden" } },
    yAxis: { title: { text: yAxisText } },
    xAxis: { type: "datetime" },
    series: [
      {
        name: seriesDescription,
        data: displayed.map(entry => [entry.time + timeOffset, entry.newValue])
      }
    ]
  };

  return <HighCharts config={config}></HighCharts>;
}
