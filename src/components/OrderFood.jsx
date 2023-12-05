import React, { useContext, useState } from 'react';
import { Context } from '../context/AppContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderFood = () => {
  const { loggedUser, itemDetails } = useContext(Context);
  console.log(loggedUser);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ ...itemDetails, buyerName: loggedUser.name, buyerEmail: loggedUser.email, buyingQuantity: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let formErrors = {};

    if (formData.buyingQuantity.trim() === '' || isNaN(parseFloat(formData.buyingQuantity))) {
      formErrors.buyingQuantity = 'BuyingQuantity must be a number';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({ buyingQuantity: false });
      if (formData.buyerEmail === formData.addedByEmail) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Owner can not buy his own product!'
        });
        return;
      }
      if (formData.quantity < formData.buyingQuantity) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Don't have available products to purchase!"
        });
        return;
      }
      const count = parseInt(formData.orderCount) + parseInt(formData.buyingQuantity);
      formData.orderCount = count;
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const buyingTime = `${hours}:${minutes}:${seconds}`;

      const res = await axios.post('https://restaurant-management-server.onrender.com/order-food', { ...formData, buyingTime });
      console.log(res.data);
      if (res.data.acknowledged) {
        Swal.fire({
          title: 'Congrats!',
          text: 'Order Successful!',
          icon: 'success'
        });
        return <Navigate to={`/items/item-details/${formData._id}`}></Navigate>;
      }
      // console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="bg-base-200 py-20">
      <Helmet>
        <title>Orders || MM Restaurant</title>
      </Helmet>
      <div className="shadow-2xl max-w-2xl bg-white mx-auto px-4 py-10 rounded-lg">
        <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-center">Order Item</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p>Food Name</p>
              <p>{formData.name}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p>Item Price</p>
              <p>{formData.price}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p>Buyer Name</p>
              <p>{formData.BuyerName}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p>Buyer Email</p>
              <p>{formData.BuyerEmail}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p>Available Quantity</p>
              <p>{formData.quantity}</p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              Quantity to buy
            </label>
            <input type="number" id="buyingQuantity" name="buyingQuantity" value={formData.buyingQuantity} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />
            {errors.buyingQuantity && <p className="text-red-500 text-xs mt-1">{errors.buyingQuantity}</p>}
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Order Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFood;
