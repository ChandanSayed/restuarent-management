import React from 'react';
import Banner from './Banner';
import TopSelling from './TopSelling';
import Testimonial from './Testimonial';
import NewsLetter from './NewsLetter';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home || MM Restaurant</title>
      </Helmet>
      <Banner />
      <TopSelling />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
