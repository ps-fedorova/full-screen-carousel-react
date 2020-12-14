import React, {useEffect, useRef, useState} from 'react';
import './Carousel.css';

function Carousel() {
  let SliderArr = [1, 2, 3];

  const [x, setX] = useState(0);
  const widthOfTheSlide = 100;

  function goLeft() {
    x < 0 &&
    setX(x + widthOfTheSlide);
  }

  function goRight() {
    x > -widthOfTheSlide * (SliderArr.length - 1) &&
    setX(x - widthOfTheSlide);
  }


  return (
    <div className="carousel">

      <ul className="carousel__list" style={{ transform: `translateX(${x}vw)` }}

      >
        {
          SliderArr.map((item, index) => {
              return (
                <li className="carousel__item" key={index}
                >
                 {item}
                </li>
              )
            }
          )}
      </ul>


      <button className='button button-left' onClick={goLeft}/>
      <button className='button button-right' onClick={goRight}/>
    </div>
  )
}

export default Carousel;
