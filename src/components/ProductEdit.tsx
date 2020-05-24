import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import { Button, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Product } from "../services/ProductsService";
import { ValidatedTextField, TextFieldType } from "./ValidatedTextField";
import { validateProductForm } from "../validation/FormValidators";
import {
  loadProduct,
  updateProduct,
  createProduct
} from "../state/reducers/productEdit";

export function ProductEdit() {
  const classes = useStyles();

  const { productId } = useParams();
  const [skipValidation, setSkipValidation] = useState(!productId);
  const [isRedirect, setRedirect] = useState(false);

  let initialValues = getDefaultValues();

  const dispatch = useDispatch();

  const product = useSelector((state: any) => state.activeProduct.product);
  const isLoading = useSelector((state: any) => state.activeProduct.isLoading);

  useEffect(() => {
    const id = parseInt(productId);
    if (!isNaN(id)) {
      dispatch(loadProduct(id));
    }
  }, [dispatch, productId]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (productId !== undefined && !product) {
    return <Redirect to="/products" />;
  }

  if (isRedirect) {
    return <Redirect to="/products" />;
  }

  if (productId !== undefined) {
    initialValues = { ...product };
  }

  const submitHandler = (values: Product, actions: any) => {
    const productValues = { ...values, active: values.active ? true : false };
    if (!productId) {
      dispatch(createProduct(productValues));
    } else {
      dispatch(updateProduct(productValues));
    }

    setRedirect(true);
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
          <Field name="price">{getTextFieldCallback("Price", "number")}</Field>

          <Field name="quantity">
            {getTextFieldCallback("Quantity", "number")}
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
    id: 0,
    name: "",
    ean: "",
    active: false,
    color: "",
    type: "",
    weight: 0,
    price: 0,
    quantity: 0
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
