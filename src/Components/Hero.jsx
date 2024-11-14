import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import banner1 from '../Images/bannerOne.jpeg';
import banner2 from '../Images/bannerTwo.jpeg';
import banner3 from '../Images/banner.jpeg';
import banner4 from '../Images/bannerThree.jpeg';
import banner5 from '../Images/bannerFour.jpeg';
import banner6 from '../Images/bannerFive.jpeg';
import banner7 from '../Images/bannerSix.jpeg';
import banner8 from '../Images/bannerSev.jpeg';
import banner9 from '../Images/bannerNine.jpeg';
import banner10 from '../Images/bannerTen.jpeg';
import banner11 from '../Images/banner11.jpeg';

import banner12 from '../Images/banner12.jpeg';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const banners = [
  { src: banner12, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner1, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner2, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner3, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner4, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner5, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner6, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },

  { src: banner7, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner8, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner9, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },

  { src: banner10, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" },
  { src: banner11, title: "Advocate & Politician", subtitle: "LLB (Hons), LLM | State Secretary, Samajwadi Yuvjan Sabha, Madhya Pradesh" }


];
const Hero = () => {
  return (
    <section id="hero" className="md:h-screen relative text-white">
      <AutoplaySlider
        play={true}
        bullets={false}
        organicArrows={false}
        infinite={true}
        interval={6000}
        cssModule={['slider', 'awssld__content']}
        animation="cubeAnimation"
      >
        {banners.map((banner, index) => (
          <div key={index} data-src={banner.src} className="each-slide">
            <div className="slide-content flex flex-col justify-center items-center h-full text-center bg-gradient-to-t from-black/70 to-transparent p-6 rounded-lg shadow-lg">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 transition-all duration-500 ease-in-out">
                {banner.title}
              </h2>
              <p className="text-lg md:text-2xl mb-8 transition-all duration-500 ease-in-out">
                {banner.subtitle}
              </p>
              <a
                href="#about"
                className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </AutoplaySlider>
    </section>
  );
};

export default Hero;
