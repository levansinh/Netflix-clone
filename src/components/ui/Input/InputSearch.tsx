import { IoSearchOutline } from 'react-icons/io5';
import { Controller, useFormContext } from 'react-hook-form';

interface InputSearchProps {
  name: string;
  id: string;
}

const InputSearch = ({ name, ...passProps }: InputSearchProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className='relative hidden md:inline-flex'>
          <input
            {...field}
            {...passProps}
            type='text'
            className='bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none'
            placeholder='Search...'
          />
          <IoSearchOutline className='absolute top-2 right-4 w-5 h-5' />
        </div>
      )}
    />
  );
};

export default InputSearch;
