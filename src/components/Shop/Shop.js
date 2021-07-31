import React, { useEffect } from 'react';
import Product from '../Product/Product';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Cart from '../Cart/Cart';
//import Product from '../Product/Product';
import {addToDatabaseCart ,getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
     const first10 = fakeData.slice(0,10);
     const[products,setProducts]=useState(first10);
     const [cart,setCart]=useState([]);
     useEffect(()=>{
         const savedCart = getDatabaseCart();
         const productKeys = Object.keys(savedCart);
         const previousCart = productKeys.map (existingKey =>{
             const product = fakeData.find(pd => pd.key === existingKey);
             product.quantity = savedCart[existingKey];
             return product; 
         }) 
         setCart(previousCart);            

     },[])
    const handleAddProduct = (product) => {
        //console.log('clciked',product);
        const toBEAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBEAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct) {
             count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter (pd => pd.key !== toBEAddedKey);
            newCart= [...others , sameProduct];
            
        }
        else{
            product.quantity =1;
            newCart = [...cart,product];

        }
        
        setCart(newCart);
        addToDatabaseCart(product.key, count);
        
     

       

    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} handleAddProduct={handleAddProduct} showAddToCart={true} product={pd}></Product>)
                }
               
                
                
                   
                
                

            </div>
            <div className="cart-container">
               <Cart cart={cart}>
               <Link to="/review">
             <button className="main-btn">Review Order</button>
              </Link>
               </Cart>
            </div>
        
         

            
        </div>
    )

};

export default Shop;