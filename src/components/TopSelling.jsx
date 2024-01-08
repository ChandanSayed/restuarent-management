import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import TopSectionCard from './TopSectionCard';
import { Link } from 'react-router-dom';

const TopSelling = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const res = await axios.get(`https://restaurant-management-server.onrender.com/top-items/`);
    console.log(res.data);
    setItems(res.data);
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="bg-base-200 py-12">
      <h2 data-aos="fade-up" className="text-xl lg:text-3xl font-bold text-center px-4 mb-8">
        Top Selling
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 max-w-[1440px] px-4 mx-auto">
        {items.map(item => {
          return <TopSectionCard key={item._id} item={item} />;
        })}
      </div>
      <div className="mt-8 text-center">
        <Link to={'/items'}>
          <button className="btn btn-secondary">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default TopSelling;
