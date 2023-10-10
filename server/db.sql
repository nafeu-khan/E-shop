CREATE DATABASES; 

TABLE  users  product_categories products  product_cart orders order_products

    
CREATE TABLE users(
    id varchar (255)   PRIMARY KEY,
    username varchar(20) ,
    email varchar (20),
    password varchar(20),
    address varchar(50),
    phone varchar (15)
);

CREATE TABLE products(
    id	varchar (255)   PRIMARY KEY,
    product_name	varchar (255),
    product_slug	varchar (255),
    product_category	varchar (255),
    product_status	varchar (255),
    product_left numeric(10, 2),
    product_description	TEXT,
    product_price	numeric(10, 2),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE product_categories(
    id	varchar (255)   PRIMARY KEY,
    category_name	varchar (255),
    category_slug	varchar (255),
    created_at	timestamp DEFAULT current_timestamp,
    updated_at	timestamp DEFAULT current_timestamp
);

CREATE TABLE orders(
   	id	varchar(255) PRIMARY KEY,
    customer_name	varchar (255),
    customer_email	varchar (255),
    customer_address	varchar (255),
    customer_phone	varchar (255),
    user_id	varchar (255),
    created_at	timestamp DEFAULT current_timestamp,
    updated_at	timestamp DEFAULT current_timestamp
);

CREATE TABLE order_products(
    id	varchar (255)  PRIMARY KEY,
    order_id	varchar (255),
    product_id	varchar (255),
    quantity int ,
    product_price	numeric(10, 2),
    created_at	timestamp DEFAULT current_timestamp,
    updated_at	timestamp DEFAULT current_timestamp
);

CREATE TABLE product_cart(
 	id	varchar (255) PRIMARY KEY,
    product_id	varchar (255),
    user_id	varchar (255),
    created_at	timestamp DEFAULT current_timestamp,
    updated_at	timestamp DEFAULT current_timestamp
);
