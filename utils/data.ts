export type Data = {
  name: string;
  id: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
};

const data: Data[] = [
  {
    name: "Polo Shirt For Men",
    id: "1",
    category: "shirt",
    image: "/images/polo_shirt_1.jpg",
    price: 20,
    brand: "Polo Assn",
    rating: 4.1,
    numReviews: 200,
    countInStock: 20,
    description: "A popular shirt, cool and gracious",
  },
  {
    name: "Polo Shirt For Men",
    id: "2",
    category: "shirt",
    image: "/images/polo_shirt.webp",
    price: 20,
    brand: "Polo Assn",
    rating: 4.1,
    numReviews: 200,
    countInStock: 20,
    description: "A popular shirt, cool and gracious",
  },
  {
    name: "Plain Dress Shirt",
    id: "3",
    category: "shirt",
    image: "/images/plain_shirt.webp",
    price: 15,
    brand: "Polo Assn",
    rating: 4.5,
    numReviews: 500,
    countInStock: 20,
    description: "A popular shirt, cool and gracious",
  },
  {
    name: "Plain Dress Shirt",
    id: "4",
    category: "shirt",
    image: "/images/white_shirt.jpg",
    price: 15,
    brand: "Polo Assn",
    rating: 4.5,
    numReviews: 500,
    countInStock: 20,
    description: "A popular shirt, cool and gracious",
  },
  {
    name: "Men Shirt",
    id: "5",
    category: "shirt",
    image: "/images/men_shirt.jpg",
    price: 25,
    brand: "Polo Assn",
    rating: 4.3,
    numReviews: 100,
    countInStock: 20,
    description: "A popular shirt, cool and gracious",
  },
];

export default data;
