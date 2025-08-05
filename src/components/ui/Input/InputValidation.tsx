import { Controller, useFormContext } from 'react-hook-form';

interface InputValidationProps {
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
}

const InputValidation = ({
  name,
  type = 'text',
  ...passProps
}: InputValidationProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <input
            type={type}
            className='w-full h-[50px] bg-[#333] text-white rouded px-5 text-base'
            {...passProps}
            {...field}
          />
          {errors[name] && (
            <p className='text-red-500 mt-1'>
              {errors[name].message as string}
            </p>
          )}
        </>
      )}
    />
  );
};

export default InputValidation;
