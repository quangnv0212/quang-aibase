"use client";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FormItem } from "react-hook-form-antd";
export interface IInputPasswordProps {
  label: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  control: any;
  size?: "large" | "middle" | "small";
}

export function InputPassword(props: IInputPasswordProps) {
  const { label, name, placeholder, prefix, control, size = "middle" } = props;
  return (
    <div className={"flex flex-col gap-2"}>
      <p className="font-medium">{label}</p>
      <FormItem control={control} name={name}>
        <Input.Password
          placeholder={placeholder}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{
            fontFamily: "Visby",
          }}
          size={size}
          prefix={prefix}
        />
      </FormItem>
    </div>
  );
}
