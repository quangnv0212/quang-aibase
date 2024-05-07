"use client";
import { Input } from "antd";
import { FormItem } from "react-hook-form-antd";

export interface IInputTextCommonProps {
  label: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  control?: any;
  size?: "large" | "middle" | "small";
}

export function InputTextCommon(props: IInputTextCommonProps) {
  const { label, name, placeholder, prefix, control, size = "middle" } = props;
  return (
    <div className={"flex flex-col gap-2"}>
      <p className="font-medium">{label}</p>
      <FormItem control={control} name={name}>
        <Input
          style={{
            fontFamily: "Visby",
          }}
          name={name}
          placeholder={placeholder}
          prefix={prefix}
          size={size}
        />
      </FormItem>
    </div>
  );
}
