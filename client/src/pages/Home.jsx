import React from 'react'

const Home = () => {
  return (
    <>
     <section className="banner">
        <h2>Welcome to My E-commerce Store</h2>
        <p>Discover our latest products and deals!</p>
        <button>Shop Now</button>
      </section>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product">
          <img src="" alt="Product 1"/>
          <h3>Product 1</h3>
          <p>$19.99</p>
          <button>Add to Cart</button>
        </div>
        <div className="product">
          <img src="" alt="Product 2"/>
          <h3>Product 2</h3>
          <p>$29.99</p>
          <button>Add to Cart</button>
        </div>
        <div className="product">
          <img src="../public/images/product3.jpg" alt="Product 3"/>
          <h3>Product 3</h3>
          <p>$39.99</p>
          <button>Add to Cart</button>
        </div>
      </section>
    </>
  )
}

export default Home