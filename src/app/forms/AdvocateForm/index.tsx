import FormInput from "@/components/FormInput";
import { UpdateAdvocateValues } from "../../../types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Card } from "flowbite-react";

const schema = yup.object<UpdateAdvocateValues>({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
    .optional(),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
    .optional(),
});

type AdvocateFormProps = {
  initialValues: UpdateAdvocateValues;
  onSubmit: (data: UpdateAdvocateValues) => void;
};

const AdvocateForm: React.FC<AdvocateFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex max-w-md flex-col gap-4">
        <FormInput
          register={register}
          errors={errors}
          name="firstName"
          fieldLabel="First Name"
        />
        <FormInput
          register={register}
          errors={errors}
          name="lastName"
          fieldLabel="Last Name"
        />
        <Button color="alternative" type="submit">
          Submit Form
        </Button>
      </div>
    </form>
  );
};

export default AdvocateForm;
