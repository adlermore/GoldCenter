function SliderSceleton({ title }) {
  return (
    <div className="w-full relative product_slider py-[70px] laptopHorizontal:py-[60px] tablet:py-[30px]">
      <div className="custom_container">
        <div className="  opacity-55 text-[32px] section_title text-black uppercase mb-[50px] laptopHorizontal:text-[24px]">
          {title}
        </div>
        <div className="grid grid-cols-4 gap-20 laptopHorizontal:grid-cols-2 tablet:grid-cols-1">
        {[1, 2, 3, 4].map((item) => (
          <div className='relative' key={item}>
            <div className='card is-loading laptopHorizontal:p-20'>
              <div className='w-full relative h-[180px] image'></div>
              <div className='mt-16 text-xl font-bold content laptopHorizontal:text-xl laptopHorizontal:min-h-[56px] min-h-[55px]'>
                <h2></h2>
                <h2 className='w-[50%] mt-[7px]'></h2>
              </div>
            </div>
          </div>
        ))}
        </div>
        <span
          className="loadmore_btn mt-[58px] h-[50px] w-full max-w-[276px] bg-transparent border-transparent text-xl flex items-center justify-center border-2 text-white mx-auto  cursor-pointer hover:bg-siteCrem borderSilver hover:border-siteCrem duration-300"
        />
      </div>
    </div>
  );
}

export default SliderSceleton;
