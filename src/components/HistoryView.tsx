import React from "react";

import { Product } from "../services/ProductsService";
import { HistoryEntry } from "../services/HistoryService";
import { Typography, makeStyles } from "@material-ui/core";

interface Props {
  product: Product;
  history: HistoryEntry[];
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

export function HistoryView({ product, history }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.list}>
      {history.slice(0, 5).map((entry, index) => (
        <HistoryListEntry
          key={index}
          oldValue={entry.oldValue}
          newValue={entry.newValue}
          time={entry.time}
        />
      ))}
    </div>
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
