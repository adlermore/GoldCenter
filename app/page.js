'use client'

import ChildSlider from "@/components/slider/ChildSlider";
import ParentSlider from "@/components/slider/ParentSlider";

// import MainSlider from "@/components/MainSlider";


export default function Home() {

  const MultiParentSettings = {
    dots: true,
    infinite: true,
    arrow: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const Settings = {
    dots: true,
    infinite: true,
    arrow: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="home_page">
      {/* <MainSlider /> */}
      <ParentSlider>
        <ChildSlider />
        {/* <ChildSlider /> */}
        {/* Add as many child sliders as needed */}
      </ParentSlider>

      {/* <div className="custom_container">
        <div className="multiSlider_container">
          <Slider {...MultiParentSettings}>
            <div className="multyChild_slider"  onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
              <Slider {...Settings}>
                <div>1.1</div>
                <div>1.2</div>
                <div>1.3</div>
              </Slider>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
            <div>
              <h3>7</h3>
            </div>
            <div>
              <h3>8</h3>
            </div>
            <div>
              <h3>9</h3>
            </div>
          </Slider>
        </div>
      </div> */}

    </div>
  );
}
