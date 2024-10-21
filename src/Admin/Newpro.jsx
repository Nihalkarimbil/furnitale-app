import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Newpro() {
    const navigate=useNavigate()
    const [product, setProducts] = useState({
        name: "",
        category: "",
        image: "",
        new_price: "",
        old_price: "",
        description: "",
        rating: "",
        reviews: "",
        topTrends: false,
        newCollections: false,
        detailOne: ""
    })
    const handlechange = (e) => {
        const { name, value, type, checked } = e.target;
        setProducts((prevProduct) => ({
            ...prevProduct,
            [name]: type === "checkbox" ? checked : value,
        }));
    }
    
 

    const handlesubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/products",product)
        .then((res)=>{
            console.log(res)
            setTimeout(() => {
                toast.success('product added')
                navigate('/products')
            }, 1000);
            
        })
       

        .catch((error) => {
            console.error("There was an error adding the product!", error);
        });
    }

return (
    <div className='mt-24 pb-20 pl-11' >
        <form className='space-y-3' onSubmit={handlesubmit}>
            <input
                type='text'
                name='name'
                placeholder='product name'
                value={product.name}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required
            />
            <input
                type='text'
                name='category'
                placeholder='product catogary'
                value={product.category}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required
            />
            <input
                type='text'
                name='image'
                placeholder='image URL'
                value={product.image}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required
            />
            <input
                type='number'
                name='new_price'
                placeholder='new price'
                value={product.new_price}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required
            />
            <input
                type='number'
                name='old_price'
                placeholder='old price'
                value={product.old_price}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required
            />
            <textarea
                name='description'
                placeholder='description of the product'
                value={product.description}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required
            />
            <input
                type='number'
                name='rating'
                placeholder='rating of product'
                value={product.rating}
                onChange={handlechange}
                className="border border-solid p-2 w-[800px]"
                required

            />
            <input
                type='number'
                name='reviews'
                placeholder='review of the product'
                value={product.reviews}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required
            />
            <br />
            <label className='mr-3 font-semibold'>
                <input
                    type="checkbox"
                    name='topTrends'
                    checked={product.topTrends}
                    onChange={handlechange}
                    
                />
                Top trends
            </label>
            <label className='font-semibold'>
                <input
                    type='checkbox'
                    name='newCollections'
                    checked={product.newCollections}
                    onChange={handlechange}
                    
                />
                New collection
            </label>
            <br />
            <textarea
                name='detailOne'
                placeholder='details of the product'
                value={product.detailOne}
                onChange={handlechange}
                className="border p-2 w-[800px]"
                required

            />
            <br />
            <button type='submit' className="bg-blue-500 text-white p-2 rounded hover:bg-black">Add product</button>
        </form>

    </div>
)
}

export default Newpro