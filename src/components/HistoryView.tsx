import React from "react";

import { Product } from "../services/ProductsService";
import { HistoryEntry } from "../services/HistoryService";
import { Typography } from "@material-ui/core";

interface Props {
  product: Product;
  history: HistoryEntry[];
}

function HistoryListEntry({ oldValue, newValue, time }: HistoryEntry) {
  return (
    <Typography>
      {oldValue} {newValue} {time}
    </Typography>
  );
}

export function HistoryView({ product, history }: Props) {
  return (
    <div>
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
