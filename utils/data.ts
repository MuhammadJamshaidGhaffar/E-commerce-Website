import bycrypt from "bcryptjs";

export type ProductType = {
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

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  image: string;
};

export const products: ProductType[] = [
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
  {
    name: "Casual Red Shirt",
    id: "6",
    category: "shirt",
    image: "/images/red_shirt.jpg",
    price: 10,
    brand: "Polo Assn",
    rating: 4.1,
    numReviews: 100,
    countInStock: 20,
    description: "A popular shirt, cool and gracious",
  },
];

export const users: UserType[] = [
  {
    name: "Muhammad Jamshaid Ghaffar",
    password: bycrypt.hashSync("123456"),
    email: "muhammadjamshaid89@gmail.com",
    isAdmin: true,
    image:
      "https://scontent-mct1-1.xx.fbcdn.net/v/t39.30808-1/320631754_462787592677275_3400737354263707890_n.jpg?stp=c0.33.320.320a_dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeH9BDdglkKMswDhUEgORU0PLU7nrewH13gtTuet7AfXeFB3QqPNWF4EQlCTAQ5tqndi45wOTvImToa7s5fLjGQS&_nc_ohc=6_4AnLMh7zMAX8q5XYg&_nc_ht=scontent-mct1-1.xx&oh=00_AfBqF8KsXSkv-8SU0onZVz005NcGn6tyZrR-ltXUxOvYeg&oe=63F457C8",
  },
  {
    name: "test user",
    password: bycrypt.hashSync("123456"),
    email: "test@gmail.com",
    isAdmin: true,
    image: "https://mui.com/static/images/avatar/1.jpg",
  },
];
