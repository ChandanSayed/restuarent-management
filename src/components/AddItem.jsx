import React, { useContext, useState } from 'react';
import ItemForm from './ItemForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Context } from '../context/AppContext';
import { Helmet } from 'react-helmet';

const AddItem = () => {
  const { loggedUser } = useContext(Context);
  console.log(loggedUser.email);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    category: '',
    quantity: '',
    price: '',
    shortDescription: '',
    origin: '',
    addedByEmail: loggedUser.email,
    addedByName: loggedUser.name,
    orderCount: 0,
    addedById: loggedUser._id
  });

  const addItemHandler = async () => {
    const res = await axios.post('https://restaurant-management-server.onrender.com/add-item', formData);
    console.log(res);
    if (res.data.acknowledged) {
      Swal.fire({
        title: 'Congrats!',
        text: 'You added the Item!',
        icon: 'success'
      });
      setFormData({
        image: '',
        name: '',
        category: '',
        quantity: '',
        price: '',
        shortDescription: '',
        origin: '',
        addedBy: loggedUser.email,
        addedByName: loggedUser.name,
        orderCount: 0,
        addedById: loggedUser._id
      });
    }
  };
  return (
    <div className="bg-base-200 py-20">
      <Helmet>
        <title>My Items || MM Restaurant</title>
      </Helmet>
      <div className="shadow-2xl max-w-2xl bg-white mx-auto px-4 py-10 rounded-lg">
        <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-center">Add Item</h2>
        <ItemForm itemHandler={addItemHandler} formData={formData} setFormData={setFormData} btnText={'Add Product'} />
      </div>
    </div>
  );
};

export default AddItem;
