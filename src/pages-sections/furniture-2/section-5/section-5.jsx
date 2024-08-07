import Content from "./content"; // API FUNCTIONS

import api from "../../../utils/__api__/furniture-2";
const items = [
  {id:1, title:'Shirts', thumbnail:'/assets/images/icons/shirt.svg', slug:'shirts'},
  {id:2, title:'Hoodies', thumbnail:'/assets/images/icons/hoodie.svg', slug:'hoodie'},
  {id:3, title:'Pants', thumbnail:'/assets/images/icons/pants.svg', slug:'pants'},
  {id:4, title:'Furniture', thumbnail:'/assets/images/icons/furniture.svg', slug:'furniture'},
  {id:5, title:'Shoes', thumbnail:'/assets/images/icons/shoe.svg', slug:'shoe'},
  {id:6, title:'Dresses', thumbnail:'/assets/images/icons/dress-2.svg', slug:'dress'},
  {id:6, title:'Earrings', thumbnail:'/assets/images/icons/earring.svg', slug:'earring'},
  {id:6, title:'Accessories', thumbnail:'/assets/images/icons/accessory.svg', slug:'accessory'},
  {id:6, title:'Bags', thumbnail:'/assets/images/icons/bag-2.svg', slug:'bag'},
  {id:6, title:'Hats', thumbnail:'/assets/images/icons/hat.svg', slug:'hat'},
  {id:6, title:'Watches', thumbnail:'/assets/images/icons/watch-2.svg', slug:'watch'},
  {id:6, title:'Eyewear', thumbnail:'/assets/images/icons/eyewear.svg', slug:'eyewear'},
  {id:6, title:'TVs', thumbnail:'/assets/images/icons/tv.svg', slug:'tv'},
];


export default async function Section4() {
  // const products = await api.getTrendingProducts();
  return <Content products={items} />;
}

