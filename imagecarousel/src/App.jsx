import { useState, useEffect } from 'react';
import './App.css';

const ImageCarousel = ({ images, autoPlayInterval = 3000, showControls = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoPlayInterval);
    }
    return () => interval && clearInterval(interval);
  }, [isPlaying, images.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => setCurrentIndex(index);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image.src} alt={image.alt || `Slide ${index + 1}`} />
            {image.caption && <div className="carousel-caption">{image.caption}</div>}
          </div>
        ))}
      </div>

      {showControls && (
        <div className="carousel-controls">
          <button className="carousel-control prev" onClick={goToPrevious}>&lt;</button>
          <button className={`carousel-control play-pause ${!isPlaying ? 'show' : ''}`} onClick={togglePlayPause}>
          {isPlaying ? '❚❚' : '▶'}</button>
          <button className="carousel-control next" onClick={goToNext}>&gt;</button>
        </div>
      )}

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const images = [
    { src: "/images/Mr.Fool.png", caption: "Mr.Fool" },
    { src: "/images/Ryomen Sukuna.jpeg", caption: "Ryomen Sukuna" },
    { src: "/images/Solo leveling.jpeg", caption: "Solo Leveling" },
    { src: "/images/Satoru Gojo.jpg", caption: "Satoru Gojo" },

  ];

  return (
    <div className="page-container">
      <h1>Anime Image Carousel</h1>
      <div className="carousel-wrapper">
        <ImageCarousel
          images={images}
          autoPlayInterval={2500}
          showControls={true}
        />
      </div>
    </div>
  );

}
