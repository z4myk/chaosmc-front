import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useProductsContext } from "../../context/ProductsContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Product } from "./Product";
export const MostPurchasedPackages = () => {
  useEffect(() => {
    getRandomProducts();
  }, []);

  const { randomProducts, getRandomProducts, isLoading } = useProductsContext();


  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

 const product = randomProducts.map((item) => <Product name={item.name} image={item.image} price={item.price} server={item.servers[0].name} category={item.category.name} id={item.id} />)
  return (
    <section  data-aos="fade-up"
    data-aos-duration="1500" className="mostPurchaseItemsMobile">
      <div className="">
        <h1 className="text-light text-center">PAQUETES MÁS COMPRADOS </h1>
        <hr />
        <div className="mt-5">
{isLoading ? (
    <div className="text-center">
     <div className="loader"></div>
    </div>
): 
    <span></span>
}
<Carousel responsive={responsive} className="">{product}</Carousel>
         
        </div>
      </div>
    </section>
  );
};
