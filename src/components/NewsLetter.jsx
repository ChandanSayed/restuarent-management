import React from 'react';

const NewsLetter = () => {
  return (
    <div className="py-12 bg-base-200">
      <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-center">To get offer updates!</h2>
      <div className="join bg-white flex justify-center max-w-[500px] py-10 mx-auto">
        <input className="input input-bordered join-item" placeholder="Email" />
        <button className="btn join-item rounded-r-full">Join Now</button>
      </div>
    </div>
  );
};

export default NewsLetter;
