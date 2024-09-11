import React, { useState,useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import Cart, { addItem } from './CartSlice';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch from react-redux





function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [addedToCart, setAddedToCart] = useState(false);

    const cartItems = useSelector(state => state.cart.items); // Access the cart items from the Redux store
    const dispatch = useDispatch(); // Initialize dispatch

    // Calculate the total number of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                },
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating scent, often used in cooking.",
                    cost: "$15"
                },
                {
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: "$12"
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Citrusy scent, relieves stress and promotes sleep.",
                    cost: "$14"
                },
            ]
        }
    ];
    const styleObj={
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl={
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleA={
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        setShowCart(false);
    };

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name] : true,  // Set the product name as key and value as true to indicate it's added to cart
        }))

    };




    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" style={{textDecoration:'none'}}>
                            <div>
                                <h3 style={{color:'white'}}>Paradise Nursery</h3>
                                <i style={{color:'white'}}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e)=>handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'>
                        <div className='cart_quantity_count'>{totalQuantity}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" id="mainIconPathAttribute"></path></svg></h1></a></div>
                </div>
            </div>
            {!showCart? (
                <div className="product-grid">

                    {plantsArray.map((CartItem, index) => (
                        console.log(CartItem)
                    ))}

                    <table>
                        <tbody>
                        {plantsArray.map((category, index) => (
                            <div key={index}>
                                <h1><div>{category.category}</div></h1>
                                <div class="product-list">
                                    {category.plants.map((plant, plantIndex) => (
                                        <div className='product-card' key = {plantIndex}>
                                            <img className = 'product-image' src = {plant.image} alt={plant.name}/>
                                            <div className = 'product-title'>{plant.name}</div>
                                            <div className = 'product-title'>{plant.description}</div>
                                            <div className=  'product-title'>{plant.cost}</div>
                                            <button className='product-button' onClick={() =>  handleAddToCart(plant)}> Add to cart </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        </tbody>
                    </table>

                </div>
            ) :  (
                <CartItem onContinueShopping={handleContinueShopping}/>
            )}
        </div>
    );
}

export default ProductList;