import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loader from './Loader';

const Items = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [constantItems, setConstantItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const res = await axios.get(`https://restaurant-management-server.onrender.com/items/`);
    console.log(res.data);
    setItems(res.data);
    setConstantItems(res.data);
    setIsLoading(false);
  }

  function handleForm(e) {
    e.preventDefault();
  }

  function handleSearch(e) {
    const searchText = e.target.value.toLowerCase();
    if (e.target.value === '') {
      return setItems(constantItems);
    } else {
      const filteredList = constantItems.filter(item => item.name.toLowerCase().includes(searchText));
      setItems(filteredList);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-base-200">
      <Helmet>
        <title>All items || MM Restaurant</title>
      </Helmet>
      <div className="max-w-[1440px] px-4 mx-auto pt-12">
        <form action="/" onSubmit={handleForm} className="text-center">
          <input onChange={handleSearch} type="text" placeholder="Search Item" className="input input-bordered input-success w-full max-w-xs" />
          {/* <input type="button" value={'Search'} /> */}
        </form>
      </div>
      {constantItems.length > 0 ? (
        <div className="max-w-[1440px] px-4 mx-auto py-12 flex flex-wrap gap-6 justify-center">
          {items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-2xl lg:text-4xl font-bold mb-6">No items available right now!</h2>
            <p>We are trying out best to add items. Thank you for visiting!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
