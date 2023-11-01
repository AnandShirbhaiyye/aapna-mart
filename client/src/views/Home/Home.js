import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import './Home.css'
import ProductsCards from "../../components/ProductsCards/ProductsCards";


function Home() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await axios.get("/products");
      console.log(response);
      setProducts(response?.data?.data);
    } catch (err) {
      console.log(err);
      alert("error loading products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-center">products</h1>
      <div className="products-container">
      {products?.map((product, index) => {
        const { name, price, image, description } = product;
        return (
          <ProductsCards
            key={index}
            name={name}
            description={description}
            price={price}
            image={image}
          />
        );
      })}
      </div>
    </>
  );
}

export default Home;
