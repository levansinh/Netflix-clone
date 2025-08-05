import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import InputValidation from '@/components/ui/Input/InputValidation';
import { useSignup } from '../apis/signup.api';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: { username: '', email: '', password: '' }
  });

  const { handleSubmit } = methods;

  const { mutate, isLoading } = useSignup();
  const submitHandler = handleSubmit((values) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/');
      },
      onError: () => {
        toast.error('Signup failed. Please try again.');
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
        <h1 className='text-3xl font-medium text-white mb-7'>Sign Up</h1>
        <FormProvider {...methods}>
          <form onSubmit={submitHandler} className='flex flex-col space-y-4'>
            <InputValidation
              name='username'
              id='username'
              placeholder='Username'
            />
            <InputValidation
              name='email'
              id='email'
              placeholder='Email'
              type='email'
            />
            <InputValidation
              name='password'
              id='password'
              placeholder='Password'
              type='password'
            />

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer'
            >
              Sign Up
            </button>
          </form>
        </FormProvider>

        <div className='mt-10 text-[#737373] text-sm'>
          <p>
            Already have an account?
            <span
              onClick={() => navigate('/signin')}
              className='text-white font-medium cursor-pointer ml-2 hover:underline'
            >
              Sign In Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
