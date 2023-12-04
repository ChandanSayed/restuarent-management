import React, { useContext, useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Context } from '../context/AppContext';
import Loader from './Loader';
import { useParams } from 'react-router-dom';

const ItemUpdate = () => {
  const { id } = useParams();
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

  const updateItemHandler = async () => {
    const res = await axios.put('https://restaurant-management-server.onrender.com/update-item', formData);
    console.log(res.data);
    console.log(formData);
    if (res.data) {
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

  useEffect(() => {
    getItemDetails();
  }, []);
  async function getItemDetails() {
    const res = await axios.get(`https://restaurant-management-server.onrender.com/items/item-details/${id}`);
    console.log(res.data);
    setFormData(res.data);
  }

  return (
    <div className="bg-base-200 py-20">
      <div className="shadow-2xl max-w-2xl bg-white mx-auto px-4 py-10 rounded-lg">
        <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-center">Update Item</h2>
        <ItemForm itemHandler={updateItemHandler} formData={formData} setFormData={setFormData} btnText={'Update Item'} />
      </div>
    </div>
  );
};

export default ItemUpdate;
