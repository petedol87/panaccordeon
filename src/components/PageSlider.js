import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'
import Slider from "react-slick";
import './PageSlider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PageSlider = ({
  title,
  subtitle,
  backgroundImage,
  gallery,
  large,
  className = ''
}) => {
  if (large) className += ' PageSlider-large'
  const settings = {
    // adaptiveHeight: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5500,
    easing: 'ease-out',
    className: 'Slider',
    dots: true,
    infinite: true,
    speed: 700,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className={`PageSlider relative ${className}`}>

      {gallery && gallery.length > 0 && (
        <Slider {...settings}>
          {gallery.map((img, index) => (
            <Image
              background="true"
              resolutions="large"
              src={img.image}
              alt={title}
              size="cover"
              key={index}
            />
          ))}
        </Slider>
      )}

      {(!gallery || gallery.length === 0) && backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}


      <div className="container relative">
        <h1 className="PageSlider--Title">{title}</h1>
        {subtitle && (
          <Content className="PageSlider--Subtitle" src={subtitle} />
        )}
      </div>
    </div>
  )
}

PageSlider.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageSlider
