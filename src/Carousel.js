import React, { useState } from 'react';
import './Carousel.css';

function Carousel() {
  let SliderArr = ['Первый', 'Второй', 'Последний'];

  const [x, setX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const [mouseDown, setMouseDown] = useState(false);

  const widthOfTheSlide = 100;
  const standardOfDifference = 50;

  function goLeft() {
    x < 0 &&
    setX(x + widthOfTheSlide);
    setOffsetX(0);
  }

  function goRight() {
    x > -widthOfTheSlide * (SliderArr.length - 1) &&
    setX(x - widthOfTheSlide);
    setOffsetX(0);
  }

  // Переключение свайпами
  const handleStartMove = (event) => {
    if (event.type === 'mousedown') {
      setStartX(event.nativeEvent.clientX);
      setMouseDown(true);
    } else if (event.type === 'touchstart') {
      setStartX(event.touches[0].clientX);
    }
  };

  const handleMove = (event) => {
    if (mouseDown === true && event.type === 'mousemove') {
      setOffsetX(event.clientX - startX);
    } else if (event.changedTouches && event.type === 'touchmove') {
      setOffsetX(event.changedTouches[0].clientX - startX);
    }
  };

  const handleEndMove = (event) => {
    let difference = 0;
    if (event.type === 'mouseup' && mouseDown === true) {
      difference = startX - event.clientX;
      setMouseDown(false);
    } else if (event.type === 'mouseout' && mouseDown === true) {
      difference = startX - event.clientX;
      setMouseDown(false);
    } else if (event.type === 'touchend') {
      difference = startX - event.changedTouches[0].clientX;
    }

    if (difference > standardOfDifference) {
      goRight();
    } else if (difference < -standardOfDifference) {
      goLeft();
    } else {
      setOffsetX(0);
    }
  };

  // переключение с клавиатуры
  function swipeKeyboard(evt) {
    if (evt.key === 'ArrowRight') goRight();
    if (evt.key === 'ArrowLeft') goLeft();
  }

  React.useEffect(() => {
    window.addEventListener('keydown', swipeKeyboard);

    return () => {
      window.removeEventListener('keydown', swipeKeyboard);
    };
  });

  return (
    <div className="carousel">

      <ul className="carousel__list" style={{ transform: `translateX(calc(${x}vw + ${offsetX}px))` }}

          onMouseDown={handleStartMove}
          onMouseMove={handleMove}
          onMouseUp={handleEndMove}

          onTouchStart={handleStartMove}
          onTouchMove={handleMove}
          onTouchEnd={handleEndMove}
          onMouseOut={handleEndMove}

      >
        {
          SliderArr.map((item, index) => {
              return (
                <li className="carousel__item" key={index}>
                  {item}
                </li>
              )
            }
          )}
      </ul>

      <button className='button button-left' onClick={goLeft}>&larr;</button>
      <button className='button button-right' onClick={goRight}>&rarr;</button>
    </div>
  )
}

export default Carousel;
