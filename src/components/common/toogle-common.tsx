import { Switch } from "antd";
import { Controller } from "react-hook-form";

export interface IToogleCommonProps {
  control: any;
  name: string;
  label: string;
}
export function ToogleCommon(props: IToogleCommonProps) {
  const { control, name, label } = props;
  return (
    <div className="flex gap-2">
      <p className="font-medium">{label}</p>
      <div className="">
        <Controller
          control={control}
          name={name}
          render={({ field }) => <Switch {...field} />}
        />
      </div>
    </div>
  );
}
