import { useState, useEffect } from 'react';

const slideImage = require('../assets/images/hero.png').default;
const slideImage2 = require('../assets/images/gr_bg.png').default;
const arrowLeft = require('../assets/images/arrow-left.svg').default;
const arrowRight = require('../assets/images/arrow-right.svg').default;

// const slidesData = require('../json/slides.json');

const Slider = () => {
  let [show, setShow] = useState(false);
  let [direction, setDirection] = useState(1);
  let [current, setCurrent] = useState(0);
  let [transitionName, setTransitionName] = useState('fade');

  const [slides, setSlides] = useState([
    {
      id: 0,
      img: slideImage,
      title: '<span>サンプルテキスト</span><br/><span>サンプル ルテキスト</span><br/><span>サンプルテキスト</span>',
      date: '2019.06.19'
    },
    {
      id: 1,
      img: slideImage2,
      title: '<span>サンプルテキスト</span><br/><span>サンプル ルテキスト</span><br/><span>サンプルテキスト</span>',
      date: '2019.07.20'
    },
    {
      id: 2,
      img: slideImage,
      title: '<span>サンプルテキスト</span><br/><span>サンプル ルテキスト</span><br/><span>サンプルテキスト</span>',
      date: '2019.08.21'
    }
  ]);

  function handleJump(index) {
    current < index
      ? setTransitionName('slide-next-enter')
      : setTransitionName('slide-prev-enter');
    setCurrent(index);
  }

  function handleSlide(dir) {
    setDirection(dir);

    dir === 1
      ? setTransitionName('slide-next-enter')
      : setTransitionName('slide-prev-enter');
    const len = slides.length;
    setCurrent((current + (dir % len) + len) % len);
  }

  const SlideItem = ({id, img, title, date}) => {
    return (
      <li className={'slider-item ' + (id === current ? 'is-active' : '')} style={{backgroundImage: `url(${img})`}}>
        <div className="slide-content">
          <h1 className="slide-heading" dangerouslySetInnerHTML={{__html: title}}/>
          <p className="slide-date">{ date }</p>
        </div>
      </li>
    )
  }

  useEffect(() => {
    setShow(true);
  });

  return (
    <section className="slider">
      {
        show === true &&
        <>
          <ul className="slider-container">
            {
              slides.map(item => (
                <SlideItem
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  title={item.title}
                  date={item.date}
                />
              ))
            }
          </ul>
          
          <div className="slider-nav">
            <img 
            className="slide-prev"
            src={arrowLeft}
            onClick={() => handleSlide(-1)}
            alt="Arrow Left"
            />

            <img 
            className="slide-next"
            src={arrowRight}
            onClick={() => handleSlide(1)}
            alt="Arrow Right"
            />
          </div>
          <ul className="slide-indicators">
            {
              slides.map(item => (
                <li
                  key={item.id}
                  className={(item.id === current) ? 'active' : ''}
                  onClick={() => handleJump(item.id)}
                />
              ))
            }
          </ul>
        </>
      }
    </section>
  )
}

export default Slider;