'use client'
import Image from 'next/image'
import homeImage from '../public/images/homeImage.webp';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main >
      <div className='md:flex block md:w-[2/3] w-[80%] md:mt-20 mt-14 m-auto '>
        <div className='md:w-1/2 w-[100%] md:m-0 m-auto '>
        <Image className='w-[100%] h-[100%]' src={homeImage} alt='homepage Image' />
        </div>

        <div className='md:w-1/2 w-[100%] md:m-0 m-auto '>
        <h2 className='md:mt-[10%] text-[1.2rem] font-medium p-2 md:text-left text-center'>Welcome to our Secure Parking Facility</h2>
        <p className='mt-2 text-[.8rem] md:text-[1rem] p-2 md:text-left text-center'>Convenient and secure parking solutions for your vehicles.</p>
        </div>
      </div>

      <div className='md:flex justify-between m-auto block md:w-[80%] w-[100%]'>
        <button className='block w-[40%] m-auto bg-green-400 p-3 rounded-[1rem] text-white mt-2 hover:scale-110 transition' onClick={() => router.push('./register')}>Register</button>
        <button className='block w-[40%] m-auto bg-green-400 p-3 rounded-[1rem] text-white mt-5 md:mt-0 hover:scale-110 transition' onClick={() => {router.push('/login')}}>Login</button>
      </div>
    </main>
  )
}
