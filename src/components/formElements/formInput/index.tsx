import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { createElement } from "react";
import { useController } from "react-hook-form";

const InputWithEndIcon = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative">
      <Input className="peer pe-9" {...props} />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Icon size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
};

const Currency = ({ currencyLabel, currencyIcon, name, control, ...props }) => {
  const field = useController({
    name,
    control,
    rules: {
      pattern: {
        value: /^[1-9]\d{0,6}\.\d{2}$/,
        message: "Enter valid number",
      },
    },
  });
  return (
    <div className="relative flex rounded-lg shadow-sm shadow-black/5">
      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground">
        {currencyIcon}
      </span>
      <Input
        className="-me-px rounded-e-none ps-6 shadow-none"
        placeholder="0.00"
        {...props}
        {...field}
      />
      <span className="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground">
        {currencyLabel}
      </span>
    </div>
  );
};

const getElement = (variant) => {
  switch (variant) {
    case "InputWithEndIcon":
      return InputWithEndIcon;
    case "Currency":
      return Currency;
    default:
      return Input;
  }
};

const FormInput = ({ control, name, rules, label, variant, ...props }) => {
  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {createElement(getElement(variant), {
              name: field.name,
              control,
              ...props,
            })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
