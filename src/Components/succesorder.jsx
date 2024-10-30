import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4 *:">
            <div className="bg-white p-8 rounded shadow-md max-w-md text-center">
                <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-lg mb-6">Thank you for your order. Your payment has been processed successfully!</p>
                <p className="text-gray-700 mb-4">We are preparing your order for shipment. A confirmation email with the order details will be sent shortly.</p>
                <button
                    onClick={handleGoHome}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
