import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { admincontext } from '../context/Admincontext';
import axiosinstance from '../axiosinstance';

function UserDetails() {
  const { id } = useParams();
  const { Costomers, fetchuser, finduserOrder, userOrders } = useContext(admincontext);
  const [use, setUse] = useState([]);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    fetchuser();
    finduserOrder(id);
  }, []);

  useEffect(() => {
    const User = Costomers.find((items) => items._id == id);
    if (User) {
      setUse([User]);
      setBlocked(User?.blocked);
    } 
  }, [Costomers, id]);

  const Block = async () => {
    const blockupdate = !blocked;
    try {
      await axiosinstance.put(`/admin/isblock/${id}`);
      setBlocked(blockupdate);
    } catch (error) {
      console.error('Error updating block status:', error);
      alert('Failed to update block status');
    }
  };

  return (
    <div>
      <section className="mt-20  w-full ">
        <div className="container h-full pb-7">
          <div className="flex items-center pl-5 h-full w-[1700px]">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <div className="bg-white shadow-md rounded-lg">
                {use.map((user) => (
                  <div className="flex" key={user._id}>
                    <div className="w-1/3 bg-gradient-to-r from-indigo-500 to-purple-500 text-center text-white rounded-l-lg">
                      <img
                        src={user.avatar || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                        alt="Avatar"
                        className="w-20 mx-auto my-5 rounded-full"
                      />
                      <h5 className="text-lg font-semibold">{user?.username}</h5>
                      <p className="text-sm">Registered user</p>
                    </div>
                    <div className="w-2/3 p-4">
                      <h6 className="text-lg font-serif text-gray-400">Information</h6>
                      <hr className="mt-0 mb-4" />
                      
                      <div className="flex flex-wrap">
                        <div className="w-1/2 mb-3">
                          <h6 className="text-sm font-semibold">Email</h6>
                          <p className="text-gray-500">{user?.email}</p>
                        </div>
                        <div className="w-1/2 mb-3">
                          <h6 className="text-sm font-semibold">ID</h6>
                          <p className="text-gray-500">{user?._id}</p>
                        </div>
                      </div>
                      <h6 className="text-lg font-mono text-gray-400">Order Details</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="flex flex-wrap">
                        {userOrders.map((order) => (
                          <div className="w-full mb-3" key={order._id}>
                            <h6 className="text-sm font-semibold">Order ID: {order._id}</h6>
                            <h6 className="text-sm font-bold">products </h6>

                            {order.products && Array.isArray(order.products) ? (
                              order.products.map((product, index) => (
                                <div key={index}>
                                  <p className="text-gray-500"> {product.productId?.name || "Unnamed Product"}</p>
                                
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No products found</p>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        className='bg-blue-950 text-white rounded-md py-2 px-4 hover:bg-black ml-4'
                        onClick={Block}
                      >
                        {blocked ? 'Unblock' : 'Block'}
                      </button>
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
