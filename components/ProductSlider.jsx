'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import IconShare from '@/public/icons/IconShare';
import IconShareFb from '@/public/icons/IconShareFb.jsx';
import Link from 'next/link';
import IconRight from '@/public/icons/IconRight.jsx';
import { JsonContext } from '@/context/jsonContext';
import { FacebookShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function ProductSlider({ sliderData }) {

  const { setActivePopup } = useContext(JsonContext);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleServiceBook = (e, serviceIndex) => {
    e.preventDefault();
    setActivePopup('quote');
    setTimeout(() => {
      document.body.classList.add("quote_opened");
      document.body.style.overflow = "hidden";
    }, 100);
  }

  useEffect(() => {

    let timer = setTimeout(() => setCopied(null), 2000);
    return () => {
      clearTimeout(timer);
    };

  }, [copied])

  setTimeout(() => {
    setLoading(true)
  }, 1000);

  return (
    <div className='pb-40 laptopHorizontal:pb-0 relative'>
      <div className='grid grid-cols-4 gap-[20px] mt-[32px] laptopHorizontal:grid-cols-3 laptopHorizontal:[&>div:last-child]:hidden laptop:grid-cols-2 laptop:[&>div:nth-child(3)]:hidden mobile:grid-cols-1 '>
        {loading ?
          sliderData.map((slider, index) => (
            <div key={index} className='relative'>
              <div className='shadow-custom  p-20 laptopHorizontal:p-20'>
                <div className='w-full relative h-[180px] '>
                  <Image
                    src={process.env.NEXT_PUBLIC_DATA + '/uploads/' + slider.image}
                    alt="Ricardo portrait"
                    width={250}
                    height={180}
                    quality="100"
                    priority={true}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className='mt-16 text-xl font-bold laptopHorizontal:text-xl laptopHorizontal:min-h-[56px]  min-h-[55px]'>{slider.title}</div>
                <div className='mt-16 text-sm ellipsis3'>{slider.description.replace(/(<([^>]+)>)/gi, "")}</div>
                <div className='mt-20 text-base font-semibold laptopHorizontal:mt-20'>Share</div>
                <div className='mt-8 flex justify-between items-center'>
                  <div className='flex gap-8'>
                    <CopyToClipboard text={typeof window !== 'undefined' ? window.location.host + `/services?id=${slider.id}` : ''}
                      onCopy={() => setCopied(index)}>
                      <span className={`w-32 h-32 flex  cursor-pointer hover:opacity-70 items-center [&>svg_path]:duration-300 duration-300 justify-center  bg-[#F4F4F4]  ${copied == index && 'bg-siteGreen opacity-70 cursor-default bg-opacity-70 [&>svg_path]:fill-white'}  `}>
                        <IconShare />
                      </span>
                    </CopyToClipboard>

                    <FacebookShareButton
                      url={typeof window !== 'undefined' ? window.location.host + `/services?id=${slider.id}` : ''}
                    >
                      <span className='w-32 h-32 flex  cursor-pointer hover:opacity-70 duration-300 items-center justify-center bg-[#F4F4F4]'>
                        <IconShareFb />
                      </span>
                    </FacebookShareButton>
                  </div>
                  <a
                    href="/"
                    onClick={e => handleServiceBook(e, slider.id)}
                    className='flex items-center gap-5'>
                    <span className='underline font-semibold text-base '>Book Now</span>
                    <IconRight />
                  </a>
                </div>
              </div>
            </div>
          ))
          :
          <>
            {[1, 2, 3, 4].map((item) => (
              <div className='relative' key={item}>
                <div className='shadow-custom card is-loading p-20 laptopHorizontal:p-20'>
                  <div className='w-full relative h-[180px] image'></div>
                  <div className='mt-16 text-xl font-bold content laptopHorizontal:text-xl laptopHorizontal:min-h-[56px] min-h-[55px]'>
                    <h2></h2>
                    <h2 className='w-[50%] mt-[7px]'></h2>
                  </div>
                  <div className='mt-16 text-sm ellipsis3'><p></p></div>
                  <div className='mt-20 text-base font-semibold laptopHorizontal:mt-20'></div>
                  <div className='mt-8 flex justify-between items-center'>
                    <div className='flex gap-8'>
                      <p href="/" className='w-32 !h-32 flex items-center justify-center'></p>
                      <p href="/" className='w-32 !h-32 flex items-center justify-center'></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        }
      </div>
      <Link href="/services" className='min-w-[168px] text-center py-8 px-16 border border-blueDark1 absolute right-0 bottom-[-30px] duration-300 hover:bg-blueDark2 hover:text-white hover:opacity-100 laptopHorizontal:relative laptopHorizontal:ml-[auto] laptopHorizontal:flex laptopHorizontal:max-w-fit laptopHorizontal:text-center laptopHorizontal:items-center laptopHorizontal:justify-center'>Show More</Link>
    </div>
  )
}

export default MainSlider