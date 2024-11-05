import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosinstance from '../axiosinstance';

function Newpro() {
    const navigate = useNavigate();
    const [product, setProducts] = useState({
        name: "",
        category: "",
        image: null,  
        new_price: "",
        old_price: "",
        description: "",
        rating: "",
        reviews: "",
        topTrends: false,
        newCollections: false,
        detailOne: ""
    });

    const handlechange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setProducts((prevProduct) => ({
            ...prevProduct,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            formData.append(key, product[key]);
        });

        try {
            const res = await axiosinstance.post("/admin/addproduct", formData);

            if (res.status === 200) {
                toast.success("Product added successfully");
                navigate('/products');
            }
        } catch (error) {
            console.error("There was an error adding the product!", error);
            toast.error("Error adding product. Please try again.");
        }
    };

    return (
        <div className="mt-24 pb-20 pl-11">
            <form className="space-y-3" onSubmit={handlesubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    value={product.name}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Product category"
                    value={product.category}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <input
                    type="number"
                    name="new_price"
                    placeholder="New price"
                    value={product.new_price}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <input
                    type="number"
                    name="old_price"
                    placeholder="Old price"
                    value={product.old_price}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description of the product"
                    value={product.description}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating of product"
                    value={product.rating}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <input
                    type="number"
                    name="reviews"
                    placeholder="Reviews of the product"
                    value={product.reviews}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <br />
                <label className="mr-3 font-semibold">
                    <input
                        type="checkbox"
                        name="topTrends"
                        checked={product.topTrends}
                        onChange={handlechange}
                    />
                    Top trends
                </label>
                <label className="font-semibold">
                    <input
                        type="checkbox"
                        name="newCollections"
                        checked={product.newCollections}
                        onChange={handlechange}
                    />
                    New collection
                </label>
                <br />
                <textarea
                    name="detailOne"
                    placeholder="Details of the product"
                    value={product.detailOne}
                    onChange={handlechange}
                    className="border p-2 w-[800px]"
                    required
                />
                <br />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-black">
                    Add product
                </button>
            </form>
        </div>
    );
}

export default Newpro;
