import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyCart = () => {
  const { id } = useParams();
  const [orderedItems, setOrderedItems] = useState([]);
  const [refreshList, setRefreshList] = useState(0);
  console.log(id);

  useEffect(() => {
    myOrderedItems();
  }, []);

  useEffect(() => {
    myOrderedItems();
  }, [refreshList]);

  async function myOrderedItems() {
    const res = await axios.get(`https://restaurant-management-server.onrender.com/ordered-foods/${id}`);
    setOrderedItems(res.data);
  }

  async function handleDelete(id) {
    const res = await axios.delete(`https://restaurant-management-server.onrender.com/ordered-foods/${id}`);
    console.log(res.data);
    console.log(id);
    if (res.data.deletedCount) {
      setRefreshList(prev => prev + 1);
      Swal.fire({
        title: 'Congrats!',
        text: 'You deleted the Item!',
        icon: 'success'
      });
    }
  }

  return (
    <div className="max-w-[1040px] mx-auto py-10 min-h-[80vh]">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Made By</th>
              <th>Price</th>
              <th>Order Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.length > 0 ? (
              orderedItems.map((item, i) => {
                return (
                  <tr key={item._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.addedByName}</td>
                    <td>$ {item.price}</td>
                    <td> {item.buyingTime}</td>
                    <th>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs">
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={'5'}>
                  <p className="text-center">You have no orders to show</p>
                </td>
              </tr>
            )}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
