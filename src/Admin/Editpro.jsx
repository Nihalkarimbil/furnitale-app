import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'


function Editpro() {
    const navigate=useNavigate()
   const {id}=useParams()
   console.log(id
   )
   const [product, setProduct] = useState({
    name: '',
    category: '',
    image: '',
    new_price: '',
    old_price: '',
    description: '',
    rating: '',
    reviews: '',
    topTrends: false,
    newCollections: false,
    detailOne: '',
  });

   useEffect(()=>{
    axios.get(`http://localhost:5000/products/${id}`)
    .then(res=>{
        setProduct(res.data)
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    })
   },[id])

   const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: type === "checkbox" ? checked : value,
    }));
    }
    
    const handlesubmit = async (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:5000/products/${id}`,product)
        .then(()=>{
           setTimeout(() => {
            alert('product updated')
            navigate(`/products/${id}`)
           }, 1000);          
        })

        .catch((error) => {
            console.error("There was an error adding the product!", error);
        });
    }
    
return (
   <div className='mt-24 pb-20 pl-11' >
        <form className='space-y-3' onSubmit={handlesubmit} >
            <input
                type='text'
                name='name'
                placeholder='product name'
                value={product.name}
                onChange={handlechange}
                className="border p-2 w-[800px]"
          
            />
            <input
                type='text'
                name='category'
                placeholder='product catogary'
                value={product.category}
                className="border p-2 w-[800px]"
                onChange={handlechange}
            />
            <input
                type='text'
                name='image'
                placeholder='image URL'
                value={product.image}
                className="border p-2 w-[800px]"
                onChange={handlechange}
            />
            <input
                type='number'
                name='new_price'
                placeholder='new price'
                value={product.new_price}
                className="border p-2 w-[800px]"
                onChange={handlechange}
            />
            <input
                type='number'
                name='old_price'
                placeholder='old price'
                value={product.old_price}
                className="border p-2 w-[800px]"
                onChange={handlechange}
            />
            <textarea
                name='description'
                placeholder='description of the product'
                value={product.description}
                className="border p-2 w-[800px]"
                onChange={handlechange}
            />
            <input
                type='number'
                name='rating'
                placeholder='rating of product'
                value={product.rating}
                className="border border-solid p-2 w-[800px]"
                onChange={handlechange}

            />
            <input
                type='number'
                name='reviews'
                placeholder='review of the product'
                value={product.reviews}
                className="border p-2 w-[800px]"
                onChange={handlechange}
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
                className="border p-2 w-[800px]"
                onChange={handlechange}
            />
            <br />
            <button type='submit' className="bg-blue-500 text-white p-2 rounded hover:bg-black">Update</button>
        </form>

    </div>
  )
}

export default Editpro