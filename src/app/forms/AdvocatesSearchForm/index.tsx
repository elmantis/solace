import FormInput from "@/components/FormInput";
import { AdvocatesSearch } from "@/types/types";
import { debounce } from "@/utils/debounce";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
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
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    const debouncedSubmit = debounce(() => {
      onSubmit(watchedValues);
    }, 400);

    debouncedSubmit();

    return () => {
      debouncedSubmit.cancel?.();
    };
  }, [watchedValues.searchTerm]);

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
