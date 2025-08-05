import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { useGetListDataWithCategory } from '@/apis/getListDataWithCategory.api';

interface CardListProps {
  title: string;
  category: 'popular' | 'top_rated' | 'upcoming' | 'now_playing';
}

const CardList = ({ title, category }: CardListProps) => {
  const { data } = useGetListDataWithCategory({ category });
  console.log('CardList data:', data);

  return (
    <div className='text-white md:px-4'>
      <h2 className='pt-10 pb-5 text-lg font-medium'>{title}</h2>

      <Swiper slidesPerView={'auto'} spaceBetween={10} className='mySwiper'>
        {data?.length &&
          data.map((item, index) => (
            <SwiperSlide key={index} className='max-w-72'>
              <Link to={`/movie/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.backdropPath}`}
                  alt=''
                  className='h-44 w-full object-center object-cover'
                />
                <p className='text-center pt-2'>{item.originalTitle}</p>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CardList;
