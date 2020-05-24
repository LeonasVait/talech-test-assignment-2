import React from "react";
import HighCharts from "react-highcharts";

import { Product } from "../services/ProductsService";
import { HistoryEntry } from "../services/HistoryService";
import { Typography, makeStyles } from "@material-ui/core";

interface Props {
  yAxisText: string;
  seriesDescription: string;
  product: Product;
  history: HistoryEntry[];
  maxLength: number;
}

function HistoryListEntry({ oldValue, newValue, time }: HistoryEntry) {
  return (
    <div>
      <Typography>
        Changed from <b>{oldValue}</b> to <b>{newValue}</b>
      </Typography>
      <Typography>{new Date(time).toLocaleString()}</Typography>
    </div>
  );
}

export function HistoryView({
  seriesDescription,
  yAxisText,
  product,
  history,
  maxLength
}: Props) {
  const classes = useStyles();

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

  return (
    <>
      <HighCharts config={config}></HighCharts>
      <div className={classes.list}>
        {displayed.map((entry, index) => (
          <HistoryListEntry
            key={index}
            oldValue={entry.oldValue}
            newValue={entry.newValue}
            time={entry.time}
          />
        ))}
      </div>
    </>
  );
}

const useStyles = makeStyles({
  list: {
    "&>div": {
      display: "flex",
      justifyContent: "space-between"
    },
    "&>div:hover": {
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  }
});
