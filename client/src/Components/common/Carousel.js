import React from 'react';
import {
  CarouselProvider, Slider, Slide, ButtonBack, Dot, DotGroup, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Carousel = ({images}) => (
  <div className="image-slider">
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={images.length}
      interval={4000}
      isPlaying
      infinite
    >
      <Slider>
        {images.map((result, index) => (
          <Slide key={index}>
            <img src={result.url} />
          </Slide>
        ))}

      </Slider>
      <DotGroup
        disableActiveDots
        className="dot-group"
        dotNumbers={images.length}
      />
    </CarouselProvider>

  </div>

);
export default Carousel;
