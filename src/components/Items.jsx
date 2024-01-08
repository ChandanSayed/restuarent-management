import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import { Helmet } from 'react-helmet-async';

const Items = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [constantItems, setConstantItems] = useState([]);
  const [firstDisabled, setFirstDisabled] = useState(true);
  const [LastDisabled, setLastDisabled] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(9);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getItems();
  }, [pageNumber]);

  async function getItems() {
    const res = await axios.get(`https://restaurant-management-server.onrender.com/items?itemPerPage=${itemPerPage}&pageNumber=${pageNumber}`);

    setItems(res.data);
    setConstantItems(res.data);
    setIsLoading(false);
    if (res.data.length < 9) {
      setLastDisabled(true);
    } else {
      setLastDisabled(false);
    }
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

  function handlePrev() {
    if (pageNumber <= 1) {
      setFirstDisabled(true);
      setPageNumber(0);
      return;
    }
    setPageNumber(prev => prev - 1);
  }

  function handleNext() {
    setFirstDisabled(false);
    setPageNumber(prev => prev + 1);
  }

  console.log(pageNumber);

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
      <div className="py-12 max-w-[300px] mx-auto">
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-outline" disabled={firstDisabled} onClick={handlePrev}>
            Previous page
          </button>
          <button className="join-item btn btn-outline" disabled={LastDisabled} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;
