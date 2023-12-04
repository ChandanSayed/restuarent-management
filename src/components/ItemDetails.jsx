import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../context/AppContext';
import Swal from 'sweetalert2';

const ItemDetails = () => {
  const { loading, setLoading, uId } = useContext(Context);
  const [itemDetails, setItemDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getItemDetails();
  }, []);
  async function getItemDetails() {
    const res = await axios.get(`https://restaurant-management-server.onrender.com/items/item-details/${id}`);
    setItemDetails(res.data);
    setLoading(false);
    console.log(res.data);
  }

  if (loading) {
    return <Loader />;
  }

  async function handleAddToOrder() {
    const { image, price, name } = itemDetails;
    const res = await axios.post('https://restaurant-management-server.onrender.com/orderItems', { uId, image, price, name });
    if (res.data.acknowledged) {
      Swal.fire({
        title: 'Congrats!',
        text: 'You added the Item to the Order List!',
        icon: 'success'
      });
    }
  }

  return (
    <div className="max-w-5xl mx-auto pt-24 px-[15px] pb-32 flex items-start flex-col lg:flex-row gap-5 lg:gap-10">
      <div className="img-container relative lg:w-1/3" data-aos="fade-up">
        <img src={itemDetails.image} alt={itemDetails.name} className="w-full rounded-lg h-[350px] lg:h-[250px] object-contain" />
        <div className="overlay bg-[#0B0B0B] bg-opacity-20 absolute bottom-0 left-0 right-0 top-0 rounded-lg p-[37px]"></div>
      </div>
      <div className="w-2/3" data-aos="fade-up">
        <h2 className="mb-6 text-4xl text-[#0b0b0b] font-bold">{itemDetails.name}</h2>
        <div className="flex gap-6 py-2">
          <p className="text-base text-[#0b0b0b] text-opacity-70">Category: {itemDetails.category}</p>
          <p className="text-base text-[#0b0b0b] text-opacity-70">Origin:{itemDetails.origin}</p>
        </div>
        <p className="text-base text-[#0b0b0b] text-opacity-70">Made By: {itemDetails.addedByName}</p>

        <p className="text-base text-[#0b0b0b] text-opacity-70 my-5">{itemDetails.shortDescription}</p>
        <p className={`inline-flex text-lg rounded-[4px] py-2 w-fit text-black my-2`}>Price: ${itemDetails.price}</p>
        <button onClick={handleAddToOrder} className="btn btn-primary text-white block">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
