import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const widthOfTheSlide = 100;
const standardOfDifference = 50;
const TIMER_TIME = 1; // transition time in seconds
const SliderArr = ['Первый', 'Второй', 'Последний'];

const Carousel = () => {

  const [x, setX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const [mouseDown, setMouseDown] = useState(false);

  // to enable the transition only when changing the slide
  const [timer, setTimer] = useState(0);
  const [timerGo, setTimerGo] = useState(false);

  const id = useRef(0);

  const stopTimer = () => {
    window.clearInterval(id.current);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => stopTimer();
  }, [timerGo]);

  // to prevent the timer from going into negative mode
  useEffect(() => {
    if (timer <= 0 || timerGo === false) {
      stopTimer();
      setTimerGo(false);
    }
  }, [timer, timerGo]);

  const goLeft = () => {
    if (x < 0) {
      setX(x + widthOfTheSlide);
      setOffsetX(0);
      setTimerGo(true);
      setTimer(timer + TIMER_TIME);
    }
  }

  const goRight = () => {
    if (x > -widthOfTheSlide * (SliderArr.length - 1)) {
      setX(x - widthOfTheSlide);
      setOffsetX(0);
      setTimerGo(true);
      setTimer(timer + TIMER_TIME);
    }
  }

// swipe switching
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

// switching from the keyboard
  function swipeKeyboard(evt) {
    if (evt.key === 'ArrowRight') goRight();
    if (evt.key === 'ArrowLeft') goLeft();
  }

  useEffect(() => {
    window.addEventListener('keydown', swipeKeyboard);

    return () => {
      window.removeEventListener('keydown', swipeKeyboard);
    };
  });

  return (
    <div className="carousel">

      <ul className="carousel__list"
          style={{
            transform: `translateX(calc(${x}vw + ${offsetX}px))`,
            transition: timerGo ? `all ${TIMER_TIME}s ease 0s` : "",
          }}

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
      <div style={{ marginTop: 20 }}>{timer}</div>
      <button className='button button-left' onClick={goLeft}>&larr;</button>
      <button className='button button-right' onClick={goRight}>&rarr;</button>
    </div>
  )
}

export default Carousel;
