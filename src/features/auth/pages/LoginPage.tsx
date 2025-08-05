import InputValidation from '@/components/ui/Input/InputValidation';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useLogin } from '../apis/login.api';

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin();

  const methods = useForm({ defaultValues: { username: '', password: '' } });
  const { handleSubmit } = methods;

  const submitHandler = handleSubmit(async (values) => {
    mutate(values, {
      onSuccess: ({ message }) => {
        toast.success(message);
      }
    });
  });

  return (
    <div
      className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5'
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/background_banner.jpg')"
      }}
    >
      <div className='max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8 py-14 mx-auto mt-8'>
        <h1 className='text-3xl font-medium text-white mb-7'>Sign In</h1>
        <FormProvider {...methods}>
          <form onSubmit={submitHandler} className='flex flex-col space-y-4'>
            <InputValidation
              placeholder='Username'
              name='username'
              id='username'
            />
            <InputValidation
              placeholder='Password'
              name='password'
              id='password'
              type='password'
            />

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer'
            >
              Sign In
            </button>
          </form>
        </FormProvider>

        <div className='mt-10 text-[#737373] text-sm'>
          <p>
            New to Netflix?{' '}
            <span
              onClick={() => navigate('/signup')}
              className='text-white font-medium cursor-pointer ml-2 hover:underline'
            >
              Sign Up Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
