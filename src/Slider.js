import React, { useState } from 'react';
import './Slider.css';

function Slider() {

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
    <div className="slider">
      {
        SliderArr.map((item, index) => {
            return (
              <div key={index} className="slide" style={{ transform: `translateX(${x}%)` }}>
                {item}
              </div>
            )
          }
        )
      }
      <button className='button button-left' onClick={goLeft}/>
      <button className='button button-right' onClick={goRight}/>
    </div>
  )
}

export default Slider;
