import {
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoLogOutOutline
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuthStoreActions, useGetUser } from '@/store/auth.store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import IMAGES from '@/assets/images';
import { FormProvider, useForm } from 'react-hook-form';

import InputSearch from '@/components/ui/Input/InputSearch';

const Navbar = () => {
  const user = useGetUser();
  const { logout } = useAuthStoreActions();
  const [showMenu, setShowMenu] = useState(false);

  console.log('User:', Object.keys(user).length);

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  const methods = useForm({ defaultValues: { search: '' } });
  const { handleSubmit } = methods;

  const submitHandler = handleSubmit((values) => {
    console.log('Search submitted:', values.search);
  });

  return (
    <nav className='bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap'>
      <Link to={'/'}>
        <img
          src={IMAGES.logo}
          alt='Logo'
          className='w-24 cursor-pointer brightness-125'
        />
      </Link>

      <ul className='hidden xl:flex space-x-6'>
        <li className='cursor-pointer hover:text-[#e50914]'>Home</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Tv Shows</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Movies</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Anime</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Games</li>
        <li className='cursor-pointer hover:text-[#e50914]'>New & Popular</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Upcoming</li>
      </ul>

      <div className='flex items-center space-x-4 relative'>
        <FormProvider {...methods}>
          <form action='' onSubmit={submitHandler}>
            <InputSearch name='search' id='search' />
          </form>
        </FormProvider>

        <Link to={user ? 'ai-recommendations' : 'signin'}>
          <button className='bg-[#e50914] px-5 py-2 text-white cursor-pointer'>
            Get AI Movie Picks
          </button>
        </Link>

        {!user.username ? (
          <Link to={'/signin'}>
            <button className='border border-[#333333] py-2 px-4 cursor-pointer'>
              Sign In
            </button>
          </Link>
        ) : (
          <div className='text-white'>
            <img
              src={IMAGES.avatar}
              alt=''
              className='w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer'
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className='absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]'>
                <div className='flex flex-col items-center mb-2'>
                  <span className='text-white font-semibold text-base'>
                    {user.username}
                  </span>
                  <span className='text-xs text-gray-400'>{user.email}</span>
                </div>

                <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                  <IoHelpCircleOutline className='w-5 h-5' />
                  Help Center
                </button>

                <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                  <IoSettingsOutline className='w-5 h-5' />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'
                >
                  <IoLogOutOutline className='w-5 h-5' />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
