import { Input } from "antd";
import * as React from "react";
import { FormItem } from "react-hook-form-antd";

export interface IInputCheckCommonProps {
  label: string;
  name: string;
  control?: any;
}

export function InputCheckCommon(props: IInputCheckCommonProps) {
  const { label, name, control } = props;
  return (
    <FormItem
      control={control}
      name={name}
      label={label}
      style={{
        fontFamily: "Visby",
      }}
      className="flex items-center"
    >
      <Input
        style={{
          fontFamily: "Visby",
        }}
        className="checkbox checkbox-primary"
        name={name}
        size="large"
        type="checkbox"
      />
    </FormItem>
  );
}
