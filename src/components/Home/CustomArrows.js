import React from 'react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

const PrevArrow = ({className, onClick}) => (
  <button type="button" className={className} onClick={onClick}>
    <IoIosArrowBack />
  </button>
)

const NextArrow = ({className, onClick}) => (
  <button type="button" className={className} onClick={onClick}>
    <IoIosArrowForward />
  </button>
)

export {PrevArrow, NextArrow}
