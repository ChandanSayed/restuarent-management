import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const { addedByEmail, addedById, addedByName, category, image, name, orderCount, origin, price, quantity, shortDescription, _id } = item;

  return (
    <div data-aos="fade-up" className="max-w-sm rounded overflow-hidden shadow-2xl bg-white pt-5 flex flex-col justify-between">
      <img src={image} alt={name} className="w-full h-64 object-contain" />
      <div className="px-6 py-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base mb-2">
            Price: <span className="font-bold text-xl">{price}$</span>
          </p>
        </div>

        <p className="text-gray-700 text-base mb-2">Added by:</p>
        <p className="text-gray-700 text-base mb-2">{addedByName}</p>
        <p className="text-gray-700 text-base mb-2">{addedByEmail}</p>

        <div className="flex justify-between items-center">
          <p className="text-gray-700 text-base mb-2">Origin: {origin}</p>
          <p className="text-gray-700 text-base mb-2">Category: {category}</p>
        </div>
        <p className="text-gray-700 text-base mb-2">Quantity: {quantity}</p>
        <p className="text-gray-700 text-base mb-2">{shortDescription}</p>
        <div className="flex justify-between">
          <Link to={`/items/item-update/${_id}`} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            Update
          </Link>
          <Link to={`/items/item-details/${_id}`} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
