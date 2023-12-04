import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const MyProductList = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const res = await axios.get(`https://restaurant-management-server.onrender.com/items/${id}`);
    console.log(res.data);
    setItems(res.data);
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-base-200">
      {items.length > 0 ? (
        <div className="max-w-[1440px] px-4 mx-auto py-12 flex flex-wrap gap-6 justify-center">
          {items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-2xl lg:text-4xl font-bold mb-6">No items available in this category right now!</h2>
            <p>We are trying out best to add items to this category. Thank you for visiting!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProductList;
