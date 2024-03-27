import React from 'react';
import { Link } from 'react-router-dom';
export default function Home(){
    return (
            <main>
                <div className="container">
                    <div className="product">
                        <h2>Product Name 1</h2>
                        <p>Description of the product goes here.</p>
                        <button >Add to Cart</button>
                    </div>
                </div>
            </main>
    );
}