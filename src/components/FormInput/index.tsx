import { HelperText, Label, TextInput } from "flowbite-react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  errors: any;
  register: UseFormRegister<any>;
  name: string;
  fieldLabel: string;
  disabled?: boolean;
};
const FormInput: React.FC<InputProps> = ({
  register,
  errors,
  name,
  fieldLabel,
}) => {
  const inputId = `input-${name}`;

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={inputId}>{fieldLabel}</Label>
      </div>
      <TextInput
        id={inputId}
        placeholder={fieldLabel}
        {...register(name)}
        color={errors[name] ? "failure" : "info"}
      />
      {errors[name] && (
        <HelperText>
          <span className="text-red-500">{errors[name].message}</span>
        </HelperText>
      )}
    </div>
  );
};

export default FormInput;
