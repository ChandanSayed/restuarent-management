import React from 'react';
import { Link } from 'react-router-dom';

const TopSectionCard = ({ item }) => {
  const { addedByEmail, addedById, addedByName, category, image, name, orderCount, origin, price, quantity, shortDescription, _id } = item;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl bg-white pt-5 flex flex-col justify-between">
      <img src={image} alt={name} className="w-full h-64 object-contain" />
      <div className="px-6 py-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base mb-2">
            Price: <span className="font-bold text-xl">{price}$</span>
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700 text-base mb-2">Category: {category}</p>
        </div>
        <p className="text-gray-700 text-base mb-2">{shortDescription}</p>
        <div className="flex justify-center my-4">
          <Link to={`/items/item-details/${_id}`} className="bg-blue-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TopSectionCard;
