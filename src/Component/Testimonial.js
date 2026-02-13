import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Testimonial.css'; // Your CSS file with styles

const testimonials = [
  {
    quote:
      "Campus Express made my transition from college to home so much easier. They offered fast delivery, and my packages were handled with great care—no damage at all! Plus, the service was very affordable compared to other options I considered. A big thumbs up!",
    author: "Ankit, ISB Hyderabad"
  },
  {
    quote:
      "I couldn't have asked for a better courier service when moving out of college. The delivery was super fast, and the customer support team was friendly and efficient, making the whole process hassle-free. My items were delivered to my doorstep on time. It's a great choice for anyone looking for quality service at a good price.",
    author: "Harshita, IIM Bangalore"
  },
  {
    quote:
      "Campus Express exceeded my expectations with their service. They delivered my belongings with impressive speed and handled everything with great care. The entire process was smooth and easy, making it an excellent choice for students. I would definitely use their services again.",
    author: "Harsh, IIM Kozhikode"
  },
  {
    quote:
      "I recently used Campus Express to send my boxes from college to my hometown, and then again from Alwar to Bangalore for my job. I was very impressed with their service. The team was efficient, picking up the goods from my home in Alwar and ensuring they arrived in Bangalore safely and on time. The entire process was smooth and hassle-free, I highly recommend Campus Express for anyone looking for reliable and timely delivery.",
    author: "Rajesh, IIT Madras"
  },
  {
    quote:
      "We’ve been using Campus Express for a while, and their service has consistently impressed us. They handle all our shipments with care and reliability, meeting deadlines whether the delivery is local or long-distance. Their professionalism and attention to detail make them a valuable partner for our business. I highly recommend Campus Express for any business needing a dependable courier service.",
    author: "Aniket , JMT Group"
  }
];

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Assuming the initial middle slide is the third one

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '1px', // Adjust as needed
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <div className="testimonial-container">
      <h2>Hear From Our Customers</h2>
      
      <Slider {...settings}>
      
        {testimonials.map((testimonial, index) => (
          <div className="sizea">
          <div key={index} className={index === currentSlide ? "testimonial-card testimonial-card--middle" : "testimonial-card"}>
            <p className="testimonial-text">{testimonial.quote}</p>
            <p className="testimonial-author">- by {testimonial.author}</p>
          </div>
          </div>
        ))}
        
      </Slider>
      
    </div>
  );
};

export default Testimonial; 