import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-[url(/images/restaurant.jpg)] ">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
          <p className="mb-5">We provide the possible best foot here.</p>
          <Link to={'/items'}>
            <button className="btn btn-primary">See More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
