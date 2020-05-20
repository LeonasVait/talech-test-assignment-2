import React, { SyntheticEvent } from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";

import { Product } from "../fixtures/MockData";
import { makeStyles } from "@material-ui/styles";

interface Props {
  product?: Product;
}

const activeOptions = [
  { value: true, label: "Enabled" },
  { value: false, label: "Disabled" }
];

function getMenuItems() {
  return activeOptions.map((option, index) => (
    <MenuItem key={index} value={option.value ? "true" : "false"}>
      {option.label}
    </MenuItem>
  ));
}

export function ProductEdit({ product }: Props) {
  const classes = useStyles();

  if (!product) {
    product = {
      name: "",
      ean: "",
      active: false,
      color: "",
      type: "",
      weight: 0
    };
  }

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form onSubmit={submitHandler}>
      <TextField
        label="Product Name"
        variant="outlined"
        required
        fullWidth
        className={classes.field}
      />

      <div>
        <TextField
          label="Product Type"
          variant="outlined"
          required
          className={classes.field}
        />

        <TextField
          label="EAN"
          variant="outlined"
          required
          className={classes.field}
        />
      </div>

      <div>
        <TextField
          label="Color"
          variant="outlined"
          required
          className={classes.field}
        />

        <TextField
          label="Weight"
          variant="outlined"
          required
          type="number"
          className={classes.field}
        />
      </div>

      <TextField
        select
        label="Status"
        variant="outlined"
        required
        fullWidth
        className={classes.field}
      >
        {getMenuItems()}
      </TextField>

      <Button type="submit">Confirm</Button>

      <Button type="submit">Cancel</Button>
    </form>
  );
}

const useStyles = makeStyles({
  field: {
    margin: "10px"
  }
});
