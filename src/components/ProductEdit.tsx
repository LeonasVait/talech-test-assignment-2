import React from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";

import { Product } from "../fixtures/MockData";
import { makeStyles } from "@material-ui/styles";
import { Formik, Form, Field, FormikErrors } from "formik";
import { ValidatedTextField, TextFieldType } from "./ValidatedTextField";

interface Props {
  product?: Product;
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
      validate={values => validateForm(values, initialValues)}
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

function validateForm(newValues: Product, initialValues: Product) {
  console.log(newValues);

  let errors: FormikErrors<Product> = {};

  const text3To32 = getTextLengthValidator(3, 32);
  const text13 = getTextLengthValidator(13, 13);
  const numbersOnly = getCharsetValidator(
    "0123456789",
    "Only digits 0-9 are allowed"
  );
  const words = getWordsValidator();
  const valueRange = getValueRangeValidator(0, 10000);

  errors.name = text3To32(newValues.name) || words(newValues.name);
  errors.type = text3To32(newValues.type) || words(newValues.type);
  errors.ean = numbersOnly(newValues.ean) || text13(newValues.ean);
  errors.color = text3To32(newValues.color) || words(newValues.color);
  errors.weight = valueRange(newValues.weight);
  return errors;
}

function getWordsValidator() {
  return (data: string) =>
    getEmptyValidator()(data) ||
    getTrimValidator()(data) ||
    getCharsetValidator(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789- ",
      "Only alphanumeric, space and dash allowed"
    )(data) ||
    getRegexValidator(/[ -]{2,}/, "Multiple dash and space are not allowed")(
      data
    );
}

function getTextLengthValidator(minLength: number, maxLength: number) {
  return (data: string) =>
    getEmptyValidator()(data) ||
    getTrimValidator()(data) ||
    getMinLengthValidator(minLength)(data) ||
    getMaxLengthValidator(maxLength)(data);
}

function getEmptyValidator() {
  return (data: string) => {
    if (data.trim().length === 0) {
      return `Must not be empty`;
    }
  };
}

function getTrimValidator() {
  return (data: string) => {
    if (data.trim().length !== data.length) {
      return `Spaces at the start and end are not allowed`;
    }
  };
}

function getMinLengthValidator(minLength: number) {
  return (data: string) => {
    if (data.length < minLength) {
      return `Must be at least ${minLength} long`;
    }
  };
}

function getMaxLengthValidator(maxLength: number) {
  return (data: string) => {
    if (data.length > maxLength) {
      return `Must be at most ${maxLength} long`;
    }
  };
}

function getCharsetValidator(charset: string, message: string) {
  return (data: string) => {
    for (let c of data.split("")) {
      if (!charset.includes(c)) {
        return message;
      }
    }
  };
}

function getRegexValidator(regex: RegExp, message: string) {
  return (data: string) => {
    if (data.match(regex)) {
      return message;
    }
  };
}

function getValueRangeValidator(min: number, max: number) {
  return (data: number) =>
    getMinValueValidator(min)(data) || getMaxValueValidator(max)(data);
}

function getMinValueValidator(min: number) {
  return (data: number) => {
    if (data < min) {
      return `Value cannot be less than ${min}`;
    }
  };
}

function getMaxValueValidator(max: number) {
  return (data: number) => {
    if (data > max) {
      return `Value cannot be greater than ${max}`;
    }
  };
}
