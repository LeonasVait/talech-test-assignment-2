import { FormikErrors } from "formik";
import { Product } from "../services/ProductsService";

export function validateProductForm(newValues: Product) {
  let errors: FormikErrors<Product> = {};

  const text3To32 = getTextLengthValidator(3, 32);
  const text13 = getTextLengthValidator(13, 13);
  const numbersOnly = getCharsetValidator(
    "0123456789",
    "Only digits 0-9 are allowed"
  );
  const words = getWordsValidator();
  const value0to100000 = getValueRangeValidator(0, 10000);

  errors.name = text3To32(newValues.name) || words(newValues.name);
  errors.type = text3To32(newValues.type) || words(newValues.type);
  errors.ean = numbersOnly(newValues.ean) || text13(newValues.ean);
  errors.color = text3To32(newValues.color) || words(newValues.color);
  errors.weight = value0to100000(newValues.weight);
  errors.price = value0to100000(newValues.price);
  errors.quantity = value0to100000(newValues.quantity);

  if (
    errors.name ||
    errors.type ||
    errors.ean ||
    errors.color ||
    errors.weight ||
    errors.price ||
    errors.quantity ||
    errors.active
  ) {
    return errors;
  }
}

export function getWordsValidator() {
  return (data: string) =>
    getEmptyValidator()(data) ||
    getTrimValidator()(data) ||
    getCharsetValidator(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789- ",
      "Only alphanumeric, space and dash allowed"
    )(data) ||
    getRegexValidator(
      /[ -]{2,}/,
      "Multiple dash and space are not allowed"
    )(data);
}

export function getTextLengthValidator(minLength: number, maxLength: number) {
  return (data: string) =>
    getEmptyValidator()(data) ||
    getTrimValidator()(data) ||
    getMinLengthValidator(minLength)(data) ||
    getMaxLengthValidator(maxLength)(data);
}

export function getEmptyValidator() {
  return (data: string) => {
    if (data.trim().length === 0) {
      return `Must not be empty`;
    }
  };
}

export function getTrimValidator() {
  return (data: string) => {
    if (data.trim().length !== data.length) {
      return `Spaces at the start and end are not allowed`;
    }
  };
}

export function getMinLengthValidator(minLength: number) {
  return (data: string) => {
    if (data.length < minLength) {
      return `Must be at least ${minLength} long`;
    }
  };
}

export function getMaxLengthValidator(maxLength: number) {
  return (data: string) => {
    if (data.length > maxLength) {
      return `Must be at most ${maxLength} long`;
    }
  };
}

export function getCharsetValidator(charset: string, message: string) {
  return (data: string) => {
    for (let c of data.split("")) {
      if (!charset.includes(c)) {
        return message;
      }
    }
  };
}

export function getRegexValidator(regex: RegExp, message: string) {
  return (data: string) => {
    if (data.match(regex)) {
      return message;
    }
  };
}

export function getValueRangeValidator(min: number, max: number) {
  return (data: number) =>
    getMinValueValidator(min)(data) || getMaxValueValidator(max)(data);
}

export function getMinValueValidator(min: number) {
  return (data: number) => {
    if (data < min) {
      return `Value cannot be less than ${min}`;
    }
  };
}

export function getMaxValueValidator(max: number) {
  return (data: number) => {
    if (data > max) {
      return `Value cannot be greater than ${max}`;
    }
  };
}
