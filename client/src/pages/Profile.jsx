import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { userData } = useContext(ShopContext);

  if (!userData) {
    return <div className="p-5 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="p-5 max-w-md mx-auto bg-white rounded shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">My Profile</h2>
      <div className="space-y-3 text-gray-700 text-sm">
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        {userData.createdAt && (
          <p>
            <strong>Account Created:</strong>{" "}
            {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
