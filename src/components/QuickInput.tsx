import React, { useRef, useState } from "react";
import { TextField } from "@material-ui/core";

interface QuickInputProps<T> {
  label: string;
  initialValue: T;
  onConfirm: (value: T) => void;
  validator: (value: T) => string | undefined;
}

interface Props<T> extends QuickInputProps<T> {
  inputType: string;
  stringToValue: (value: string) => T;
  valueToString: (value: T) => string;
}

function QuickInput<T>({
  inputType,
  label,
  initialValue,
  valueToString,
  stringToValue,
  validator,
  onConfirm
}: Props<T>) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(valueToString(initialValue));
  const [error, setError] = useState<string | undefined>(undefined);

  const changeValue = (newValue: string) => {
    setValue(newValue);
    setError(validator(stringToValue(newValue)));
  };

  const confirmValue = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.blur();

    if (error) {
      setValue(valueToString(initialValue));
      setError(undefined);
      return;
    }

    onConfirm(stringToValue(value));
    setValue(valueToString(stringToValue(value)));
  };

  return (
    <TextField
      label={label}
      type={inputType}
      inputRef={inputRef}
      value={value}
      onBlur={confirmValue}
      onKeyUp={event => {
        if (event.key === "Enter") {
          confirmValue();
        }
      }}
      onChange={event => changeValue(event.target.value)}
      error={!!error}
      helperText={error}
      style={{ flex: "none" }}
    />
  );
}

export function QuickNumberInput(props: QuickInputProps<number>) {
  return (
    <QuickInput<number>
      valueToString={(value: number) => {
        if (value === undefined || value === null) {
          return "";
        }
        return value.toFixed(2);
      }}
      stringToValue={parseFloat}
      inputType="number"
      {...props}
    />
  );
}
