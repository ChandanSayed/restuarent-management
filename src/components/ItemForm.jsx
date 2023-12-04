import React, { useState } from 'react';

const ItemForm = ({ productHandler, formData, setFormData, btnText }) => {
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let formErrors = {};
    if (formData.image.trim() === '') {
      formErrors.image = 'Image url is required';
    }
    if (formData.name.trim() === '') {
      formErrors.name = 'Name is required';
    }
    if (formData.category.trim() === '') {
      formErrors.category = 'Category Name is required';
    }
    if (formData.shortDescription.trim() === '') {
      formErrors.shortDescription = 'Write a short description';
    }
    if (formData.price.trim() === '' || isNaN(parseFloat(formData.price))) {
      formErrors.price = 'Price must be a number';
    }
    if (formData.quantity.trim() === '' || isNaN(parseFloat(formData.quantity))) {
      formErrors.quantity = 'Quantity must be a number';
    }
    if (formData.origin.trim() === '') {
      formErrors.origin = 'Origin Name is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log('Form submitted:', formData);
      productHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Food Name
        </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />

        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Image Link
        </label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2 capitalize">
          quantity
        </label>
        <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="origin" className="block text-gray-700 text-sm font-bold mb-2">
          Food Origin/Country
        </label>
        <input type="text" id="origin" name="origin" value={formData.origin} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="shortDescription" className="block text-gray-700 text-sm font-bold mb-2">
          Short Description
        </label>
        <textarea id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" />
        {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription}</p>}
      </div>

      <div className="mb-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {btnText}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
