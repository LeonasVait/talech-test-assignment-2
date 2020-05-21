import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { Formik, Form, Field } from "formik";

import { Product } from "../services/ProductsService";
import { ValidatedTextField, TextFieldType } from "./ValidatedTextField";
import { validateProductForm } from "../validation/FormValidators";

interface Props {
  product?: Product;
  onSubmit: () => void;
}

export function ProductEdit({ product, onSubmit }: Props) {
  const classes = useStyles();
  const [skipValidation, setSkipValidation] = useState(!product);

  let initialValues = getDefaultValues();
  if (product) {
    initialValues = { ...product };
  }

  const submitHandler = (values: Product, actions: any) => {
    //TODO dispatch appropriate actions;
    onSubmit();
  };

  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={initialValues}
      validate={values => {
        if (!skipValidation) {
          return validateProductForm(values);
        }
      }}
      validateOnMount
    >
      <Form className={classes.form}>
        <div>
          <Field name="name">{getTextFieldCallback("Product name")}</Field>
        </div>

        <div>
          <Field name="type">{getTextFieldCallback("Product type")}</Field>

          <Field name="ean">{getTextFieldCallback("EAN")}</Field>
        </div>

        <div>
          <Field name="color">{getTextFieldCallback("Color")}</Field>

          <Field name="weight">
            {getTextFieldCallback("Weight", "number")}
          </Field>
        </div>

        <div>
          <Field name="active">
            {(callbackArgs: any) => StatusField(callbackArgs)}
          </Field>
        </div>

        <div>
          <Button type="submit" onClick={() => setSkipValidation(false)}>
            Confirm
          </Button>
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

function getTextFieldCallback(label: string, fieldType?: TextFieldType) {
  return (fieldCallbackArgs: any) => (
    <ValidatedTextField
      label={label}
      fieldCallbackArgs={fieldCallbackArgs}
      fieldType={fieldType}
    ></ValidatedTextField>
  );
}

function StatusField({ field, meta }: any) {
  return (
    <TextField
      select
      label="Status"
      variant="outlined"
      error={meta.error !== undefined}
      helperText={meta.error}
      {...field}
    >
      <MenuItem value="true">Enabled</MenuItem>
      <MenuItem value="false">Disabled</MenuItem>
    </TextField>
  );
}
