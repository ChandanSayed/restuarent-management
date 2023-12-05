import React from 'react';

const Testimonial = () => {
  const testimonial = {
    name: 'John Bhau',
    position: 'Food Critic',
    image: 'https://chandansayed.github.io/course-image-links/user.png',
    message: 'The food here is absolutely amazing! I highly recommend it to everyone.'
  };

  return (
    <div className="testimonials py-10">
      <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-center">Testimonial</h2>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6 mb-4">
        <div className="flex items-center mb-4">
          <img className="w-12 h-12 rounded-full object-cover mr-4" src={testimonial.image} alt={testimonial.name} />
          <div>
            <h2 className="text-lg font-semibold">{testimonial.name}</h2>
            <p className="text-gray-600">{testimonial.position}</p>
          </div>
        </div>
        <p className="text-gray-700">{testimonial.message}</p>
      </div>
    </div>
  );
};

export default Testimonial;
