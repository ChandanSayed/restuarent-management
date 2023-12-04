import React, { useContext } from 'react';
import { Context } from '../context/AppContext';

const Profile = () => {
  const { loggedUser } = useContext(Context);
  return (
    <div className="max-w-lg mx-auto shadow-lg my-16 p-5 rounded-lg">
      <h2 className="my-5 text-xl lg:text-4xl text-center">Profile Details</h2>
      <div className="flex items-center gap-3">
        <div>Username:</div>
        <div>
          <h3 className="text-xl lg:text-4xl">{loggedUser.name}</h3>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div>User Email:</div>
        <div>
          <h3 className="text-xl lg:text-4xl">{loggedUser.email}</h3>
        </div>
      </div>
      <img className="max-w-[200px] py-6 mx-auto block" src={loggedUser.profilePicture} alt="profilePicture" />
    </div>
  );
};

export default Profile;
