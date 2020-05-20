import React from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";

import { Product } from "../fixtures/MockData";
import { makeStyles } from "@material-ui/styles";
import { Formik, Form, Field, FormikErrors } from "formik";

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

function getDefaultValues(): Product {
  return {
    name: "",
    ean: "",
    active: false,
    color: "",
    type: "",
    weight: 0
  };
}

function getNameField({ field, meta }: any, classes: Record<"field", string>) {
  return (
    <TextField
      label="Product Name"
      variant="outlined"
      required
      className={classes.field}
      error={meta.error !== undefined}
      helperText={meta.error}
      {...field}
    />
  );
}

function getTypeField({ field, meta }: any, classes: Record<"field", string>) {
  return (
    <TextField
      label="Product Type"
      variant="outlined"
      required
      className={classes.field}
      error={meta.error !== undefined}
      helperText={meta.error}
      {...field}
    />
  );
}

function getEanField({ field, meta }: any, classes: Record<"field", string>) {
  return (
    <TextField
      label="EAN"
      variant="outlined"
      required
      className={classes.field}
      error={meta.error !== undefined}
      helperText={meta.error}
      {...field}
    />
  );
}

function getColorField({ field, meta }: any, classes: Record<"field", string>) {
  return (
    <TextField
      label="Color"
      variant="outlined"
      required
      className={classes.field}
      error={meta.error !== undefined}
      helperText={meta.error}
      {...field}
    />
  );
}

function getWeightField(
  { field, meta }: any,
  classes: Record<"field", string>
) {
  return (
    <TextField
      label="Weight"
      variant="outlined"
      required
      type="number"
      className={classes.field}
      error={meta.error !== undefined}
      helperText={meta.error}
      {...field}
    />
  );
}

function getStatusField(
  { field, meta }: any,
  classes: Record<"field", string>
) {
  return (
    <TextField
      select
      label="Status"
      variant="outlined"
      className={classes.field}
      error={meta.error !== undefined}
      helperText={meta.error}
      {...field}
    >
      {getMenuItems()}
    </TextField>
  );
}

function validateForm(data: any) {
  let errors: FormikErrors<Product> = {};
  errors.name = "Bad Name";
  return errors;
}

export function ProductEdit({ product }: Props) {
  const classes = useStyles();

  let initialValues = getDefaultValues();
  if (product) {
    initialValues = { ...product };
  }

  const submitHandler = (values: Product, actions: any) => {
    console.log("submit");
  };

  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={initialValues}
      validate={validateForm}
    >
      <Form className={classes.form}>
        <div>
          <Field name="name">
            {(params: any) => getNameField(params, classes)}
          </Field>
        </div>
        <div>
          <Field name="type">
            {(params: any) => getTypeField(params, classes)}
          </Field>
          <Field name="ean">
            {(params: any) => getEanField(params, classes)}
          </Field>
        </div>
        <div>
          <Field name="color">
            {(params: any) => getColorField(params, classes)}
          </Field>
          <Field name="weight">
            {(params: any) => getWeightField(params, classes)}
          </Field>
        </div>
        <div>
          <Field name="active">
            {(params: any) => getStatusField(params, classes)}
          </Field>
        </div>
        <div>
          <Button type="submit">Confirm</Button>
        </div>
      </Form>
    </Formik>
  );
}

const useStyles = makeStyles({
  form: {
    "&>div": {
      display: "flex"
    },
    "&>div>*": {
      flex: "1",
      margin: "10px"
    },
    "&>div>*:last-child": {
      marginRight: 0
    },
    "&>div>*:first-child": {
      marginLeft: 0
    }
  },
  field: {}
});
