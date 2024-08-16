import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Procontext } from '../context/Productcontext';

function UserDetails() {
  const { id } = useParams();
  const { Costomers } = useContext(Procontext);
  const [use, setUse] = useState([]);

  useEffect(() => {
    setUse(Costomers.filter((items) => items.id == id));
  }, [Costomers, id]);

  return (
    <div>
      <section className="mt-20 w-full ">
        <div className="container h-full pb-7">
          <div className="flex justify-center items-center h-full w-[1000px]">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <div className="bg-white shadow-md rounded-lg">
                {use.map((user) => (
                  <div className="flex" key={user.id} >
                    <div className="w-1/3 bg-gradient-to-r from-indigo-500 to-purple-500 text-center text-white rounded-l-lg">
                      <img
                        src={user.avatar || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                        alt="Avatar"
                        className="w-20 mx-auto my-5 rounded-full"
                      />
                      <h5 className="text-lg font-semibold">{user?.input?.username}</h5>
                      <p className="text-sm">Registered user</p>
                      <i className="far fa-edit mb-5 text-xl"></i>
                    </div>
                    <div className="w-2/3 p-4">
                      <h6 className="text-lg font-serif text-gray-400">Information</h6>
                      <hr className="mt-0 mb-4" />
                      
                      <div className="flex flex-wrap">
                        <div className="w-1/2 mb-3">
                          <h6 className="text-sm font-semibold">Email</h6>
                          <p className="text-gray-500">{user?.input?.email}</p>
                        </div>
                        <div className="w-1/2 mb-3">
                          <h6 className="text-sm font-semibold">ID</h6>
                          <p className="text-gray-500">{user?.id}</p>
                        </div>
                      </div>
                      <h6 className="text-lg font-mono text-gray-400">Cart</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="flex flex-wrap">
                        {user?.input?.cart?.map((item) => (
                          <div className="w-full mb-3" key={item.id}>
                            <h6 className="text-sm font-semibold">{item.name}</h6>
                            <p className="text-gray-500">Quantity: {item.qty}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDetails;
