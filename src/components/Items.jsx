import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Items = () => {
  const { id } = useParams();
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
  }

  function handleForm(e) {
    e.preventDefault();
  }

  function handleSearch(e) {
    console.log(e.target.value);
    if (e.target.value === '') {
      return setItems(constantItems);
    }
    const list = items.filter(item => item.id);
    console.log(list);
    // setItems(items.filter(item => item.name.toLowerCase() != e.target.value.toLowerCase()));
  }

  return (
    <div className="bg-base-200">
      <div className="max-w-[1440px] px-4 mx-auto pt-12">
        <form action="/" onSubmit={handleForm} className="text-center">
          <input onChange={handleSearch} type="text" placeholder="Search Item" className="input input-bordered input-success w-full max-w-xs" />
          {/* <input type="button" value={'Search'} /> */}
        </form>
      </div>
      {items.length > 0 ? (
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
