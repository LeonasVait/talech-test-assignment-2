import React from "react";
import { TextField } from "@material-ui/core";

export type TextFieldType = "number" | "text";

interface Props {
  fieldType?: TextFieldType;
  label: string;
  fieldCallbackArgs: any;
}

export function ValidatedTextField({
  fieldType,
  label,
  fieldCallbackArgs
}: Props) {
  return (
    <TextField
      label={label}
      variant="outlined"
      required
      type={fieldType ? fieldType : "text"}
      error={fieldCallbackArgs.meta.error !== undefined}
      helperText={fieldCallbackArgs.meta.error}
      {...fieldCallbackArgs.field}
    />
  );
}
