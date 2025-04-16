import FormInput from "@/components/FormInput";
import { AdvocatesSearch } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  searchTerm: yup.string().matches(/^[A-Za-z ]*$/, "Please enter valid name"),
});

type AdvocateSearchFormProps = {
  initialValues: {
    searchTerm: string;
  };
  onSubmit: (data: AdvocatesSearch) => void;
};

const AdvocateSearchForm: React.FC<AdvocateSearchFormProps> = ({
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
          name="searchTerm"
          fieldLabel="Search your advocate"
        />
      </div>
    </form>
  );
};

export default AdvocateSearchForm;
