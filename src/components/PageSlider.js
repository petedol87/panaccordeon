import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'
import './PageSlider.css'

const PageSlider = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageSlider-large'
  return (
    <div className={`PageSlider relative ${className}`}>
      {backgroundImage && (
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
