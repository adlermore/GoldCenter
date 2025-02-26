import React from 'react'
import Image from 'next/image'
import searchImg from '@/public/images/searchImg.png'
import searchIcon from '@/public/images/searchIcon.png'
import { useRouter } from 'next/navigation';

function HomeSearch() {

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    if (searchTerm) {
      router.push(`/productListing?filter=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className='home_search'>
      <form className='search_inner' onSubmit={handleSubmit}>
        <button type="submit" className='searchImg static_bg' aria-label="Submit Search using Image">
          <Image
            width={50}
            height={21}
            src={searchImg}
            alt="search image"
            priority={true}
          />
        </button>
        <input type='text' placeholder='Search' name="search" />
        <button type="submit" className='searchIcon static_bg' aria-label="Submit Search using Icon">
          <Image
            width={32}
            height={33}
            src={searchIcon}
            alt="search Icon"
            priority={true}
          />
        </button>
      </form>
    </div>
  )
}

export default HomeSearch
