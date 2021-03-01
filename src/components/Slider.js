import { useState, useEffect } from 'react';

const slideImage = require('../assets/images/hero.png').default;
const arrowLeft = require('../assets/images/arrow-left.svg').default;
const arrowRight = require('../assets/images/arrow-right.svg').default;

const slideWidth = 100;

const _items = [
    {
        slide: {
          title: '<span>サンプルテキスト</span><br/><span>サンプル ルテキスト</span><br/><span>サンプルテキスト</span>',
          date: '2019.06.19',
          image: slideImage
        }
    },
    {
      slide: {
        title: '<span>サンプルテキスト</span><br/><span>サンプル ルテキスト</span><br/><span>サンプルテキスト</span>',
        date: '2019.06.19',
        image: slideImage
      }
    },
    {
      slide: {
        title: '<span>サンプルテキスト</span><br/><span>サンプル ルテキスト</span><br/><span>サンプルテキスト</span>',
        date: '2019.06.19',
        image: slideImage
      }
    }
]

const length = _items.length
_items.push(..._items)


const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const createItem = (position, idx, activeIdx) => {
    const item = {
        styles: {
            transform: `translateX(${position * slideWidth}vw)`
        },
        slide: _items[idx].slide
    }

    switch (position) {
        case length - 1:
        case length + 1:
            item.styles = { ...item.styles, filter: '' }
            break
        case length:
            break
        default:
            item.styles = { ...item.styles, opacity: 0 }
            break
    }

    return item
}

const SliderSlideItem = ({ pos, idx, activeIdx }) => {
    const item = createItem(pos, idx, activeIdx)

    return (
        <li className='slider-slide-item' style={{...item.styles, backgroundImage: `url(${item.slide.image})`}}>
          <div className="slide-content">
            <h1 className="slide-heading" dangerouslySetInnerHTML={{__html: item.slide.title}}/>
            <p className="slide-date">{ item.slide.date }</p>
          </div>
        </li>
    )
}

const keys = Array.from(Array(_items.length).keys())

const Slider = () => {
    const [items, setItems] = useState(keys)
    const [isTicking, setIsTicking] = useState(false)
    const [activeIdx, setActiveIdx] = useState(0)
    const bigLength = items.length

    const handlePrevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => {
                return prev.map((_, i) => prev[(i + jump) % bigLength])
            })
        }
    }

    const handleNextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength]
                )
            })
        }
    }

    const handleDotClick = idx => {
        if (idx < activeIdx) handlePrevClick(activeIdx - idx)
        if (idx > activeIdx) handleNextClick(idx - activeIdx)
    }

    useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false))
    }, [isTicking])

    useEffect(() => {
        setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    }, [items])

    return (
        <div className='slider-wrap'>
            <div className='slider-inner'>
                <div className="slider-nav">
                    <img 
                    className="slide-prev"
                    src={arrowLeft}
                    onClick={() => handlePrevClick()}
                    alt="Arrow Left"
                    />

                    <img 
                    className="slide-next"
                    src={arrowRight}
                    onClick={() => handleNextClick()}
                    alt="Arrow Right"
                    />
                </div>
                <div className='slider-container'>
                    <ul className='slider-slide-list'>
                        {items.map((pos, i) => (
                            <SliderSlideItem
                                key={i}
                                idx={i}
                                pos={pos}
                                activeIdx={activeIdx}
                            />
                        ))}
                    </ul>
                </div>
                <button
                    className='slider-btn slider-btn--next'
                    onClick={() => handleNextClick()}>
                    <i className='slider-btn-arrow slider-btn-arrow--right' />
                </button>
                <div className='slider-dots'>
                    {items.slice(0, length).map((pos, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={i === activeIdx ? 'dot active' : 'dot'}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Slider;
