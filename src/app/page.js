"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import user1 from "../../public/user 1.jpg";
import user2 from "../../public/user 2.jpg";
import user3 from "../../public/user 3.jpg";
import user4 from "../../public/user 4.jpg";
import user5 from "../../public/user 5.jpg";
import vgo from "../../public/vgo.jpg";
import i1 from "../assets/images/assets/i1.png";
import i2 from "../assets/images/assets/i2.png";
import i3 from "../assets/images/assets/i3.png";
import i4 from "../assets/images/assets/i4.png";
import i5 from "../assets/images/assets/i5.png";
import i6 from "../assets/images/assets/i6.png";
import i7 from "../assets/images/assets/i7.png";
import i8 from "../assets/images/assets/i8.png";
import i9 from "../assets/images/assets/i9.png";
import i10 from "../assets/images/assets/i10.png";
import i11 from "../assets/images/assets/i11.png";
import i12 from "../assets/images/assets/i12.png";
import ScrollAnimation from 'react-animate-on-scroll';
import logo from "../assets/images/logo/VGO 4.png";

import  './page-style.css';
import { imagesData } from "@/utils";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import StarRatings from "react-star-ratings";

export default function Home() {
  const { isAuthUser, user } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const maxStars = 5;
  const ref = useRef();  
  const { events } = useDraggable(ref);  

  const iArray = [
    { id: 1, image: i1 ,title:"Electronics"}, 
    { id: 2, image: i2 ,title:"Properties"}, 
    { id: 3, image: i3 ,title:"Furniture"},
    { id: 4, image: i4 ,title:"Appliance"},
    { id: 5, image: i5 ,title:"Vehicles"},
    { id: 6, image: i8 ,title:"Household"},
    { id: 7, image: i1 ,title:"Electronics"},
    { id: 8, image: i10 ,title:"Properties"},
    { id: 9, image: i3 ,title:"Furniture"},
    { id: 10, image: i4 ,title:"Appliance"},
    { id: 11, image: i5 ,title:"Vehicles"},
    { id: 12, image: i8 ,title:"Household"},

  ]
  const getStarType = (index) => {
    if (index < rating) {
      return "star-filled";
    } else {
      return "star-empty";
    }
  };

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const saleDate = new Date("2023-12-31T23:59:59").getTime(); // Replace with your sale end date
    const currentDate = new Date().getTime();
    const timeLeft = saleDate - currentDate;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }
  };

  const handlefreelancerRegister = () => {
    if (isAuthUser && user.role == "director" || user.role == "admin") {
      router.push('/');
    } else if (isAuthUser) {
      router.push('/register/freelancer-register');
    }
      else {
      router.push('/register/customer-register')
    }
  };

  const handleMemberRegister = () => {
    if (isAuthUser && user.role == "director" || user.role == "admin") {
      router.push('/');
    } else if (isAuthUser) {
      router.push('/register/member-register');
    }
      else {
      router.push('/register/customer-register')
    }
  };

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []); */

  useEffect(() => {

    getListOfProducts();
  }, []);
 

  return (
    <main className="home-container">
      <section className="home-heroSection">
        <ScrollAnimation duration={5} animateIn="fadeIn" className="home-heroContainer">
          <div className="home-heroTextContainer">
          <h1
              className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none mt-5 md:text-5xl xl:text-7xl"
              style={{ color: "#2F3640" }}
            >
              Shop <span style={{ color: "#e84118" }}>Smart ,</span>
            </h1>
            <h1
              className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-7xl"
              style={{ color: "#2F3640" }}
            >
              Shop <span style={{ color: "#e84118" }}>Easy</span>
            </h1>
            <p
              className="max-w-2xl mb-6 font-light lg:mb-6 md:text-lg lg:text-xl xl:text-2xl text-gray-600 pt-4 pb-4"
              style={{ color: "#2F3640" }}
            >
              Sri lanka's largest e-commerce platform which offers greate online
              shoping expericence!
            </p>
            <div>
              <div className="home-heroButtonRow">
                <button
                  type="button"
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1 inline-block rounded-lg px-3 py-4 text-xm font-medium uppercase tracking-wide text-white"
                  style={{ backgroundColor: "#e84118" }}
                >
                  Shop Now
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1 inline-block border border-black text-black rounded-lg px-3 py-4 text-xm mb-2 font-medium uppercase tracking-wide"
                >
                  Learn Now
                </button>
                <button
                  type="button"
                  onClick={scrollToPackages}
                  className="mt-1 inline-block border border-black text-black rounded-lg px-3 py-4 text-xm mb-2 font-medium uppercase tracking-wide"
                >
                  Packages
                </button>
              </div>
              <div className="flex flex-row mt-4 mb-8">
                <div className="flex space-x-[-15px] ml-0">
                  <Image
                    src={user1}
                    alt="User 1"
                    className="w-11 h-11 rounded-full border-2 border-white"
                    style={{ marginLeft: "-15px" }}
                  />
                  <Image
                    src={user2}
                    alt="User 2"
                    className="w-11 h-11 rounded-full border-2 border-white"
                    style={{ marginLeft: "-15px" }}
                  />
                  <Image
                    src={user3}
                    alt="User 3"
                    className="w-11 h-11 rounded-full border-2 border-white"
                    style={{ marginLeft: "-15px" }}
                  />
                  <Image
                    src={user4}
                    alt="User 4"
                    className="w-11 h-11 rounded-full border-2 border-white"
                    style={{ marginLeft: "-15px" }}
                  />
                  <Image
                    src={user5}
                    alt="User 5"
                    className="w-11 h-11 rounded-full border-2 border-white"
                  />
                </div>

                <div className="flex flex-col justify-center text-start">
                  <span className="text-black text-xl font-extrabold">
                    10000+
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#2F3640" }}
                  >
                    Trusted Sellers
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="home-heroImage">
            <Image src={vgo} alt="vgo Model" />
          </div>
        </ScrollAnimation>
      </section>
      <div className="w-full" style={{ backgroundColor: "#e84118" }}>
        <section
          style={{ backgroundColor: "#e84118" }}
          className="max-w-screen-xl mx-auto flex flex-row text-white w-full md:py-10 text-center justify-between"
        >
          <div className="m-auto w-full border-r-4 border-white home-heroTextContainer">
            <h2 className="text-lg md:text-5xl  font-bold">250+</h2>
            <h2 className="text-md md:text-4xl">Brands</h2>
          </div>
          <div className="m-auto w-full border-r-4 border-white home-heroTextContainer">
            <h2 className="text-lg md:text-5xl font-bold">1000+</h2>
            <h2 className="text-md md:text-4xl">Products</h2>
          </div>
          <div className="m-auto w-full border-r-4 border-white home-heroTextContainer">
            <h2 className="text-lg md:text-5xl font-bold">20+</h2>
            <h2 className="text-md md:text-4xl">Categories</h2>
          </div>
          <div className="m-auto w-full home-heroTextContainer">
            <h2 className="text-lg md:text-5xl font-bold">10000+</h2>
            <h2 className="text-md md:text-4xl">Trusted Sellers</h2>
          </div>
        </section>
      </div> 
      <section  className="w-full"> 
        <div   className="flex   space-x-3 overflow-x-scroll scrollbar-hide home-scroolContainer"
        {...events}
        ref={ref}>
          <div  className="home-scroolContainerGride">
            {iArray.map((item, index) => (
              <div key={index} className="home-scroolItem">
                <div className="home-scroolItemImageContainer">
                <Image
                  src={item.image} // Replace with your image paths
                  alt="Image"
                  className=""
                />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
          
          
        </div> 
      </section>  
      <section className="w-full ">
        <div className="px-5 py-5 md:px-20 md:py-20 mx-auto sm:px-4 sm:py-6 lg:px-8 w-full   " >
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3 w-full">
            <li>
              <div className="relative block group w-full aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-500 aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6 ">
                  <h3 className="text-xl font-medium text-white">KIDS</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group w-full">
                <img
                  src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">WOMEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">MEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/men")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="w-full flex item-center ">
        <div className="home-flashSaleContainer  ">
          <h1 className="text-3xl font-bold space-x-8 mr-10 mb-3" style={{ color: "#e84118" }}>
            Flash
            <span className="text-3xl font-normal space-x-8" style={{ color: "#e84118" }}>
              Sale
            </span>
          </h1>
          <div className="flex flex-row space-x-4 ">
            <div className="flex flex-col w-20   ">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Days
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.days < 10
                      ? `0${countdown.days}`
                      : countdown.days}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20  ">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Hours
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.hours < 10
                      ? `0${countdown.hours}`
                      : countdown.hours}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Mins.
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.minutes < 10
                      ? `0${countdown.minutes}`
                      : countdown.minutes}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Secs.
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.seconds < 10
                      ? `0${countdown.seconds}`
                      : countdown.seconds}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="  px-4 py-4 mx-auto sm:py-6 sm:px-6 lg:px-8">
          <h2
            className="text-xl font-bold sm:text-3xl relative"
            style={{ color: "#2F3640" }}
          >
            Best Sellings
            <span
              className="block border-b-4"
              style={{ borderColor: "#e84118", width: "8%" }}
            ></span>
          </h2>
          <div   className="flex space-x-3 overflow-x-scroll scrollbar-hide home-productContainer" {...events} ref={ref}>
            
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 4)
                      .map((productItem) => (
                        <div
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer relative home-productItem"
                          style={{ backgroundColor: "#F2F0F0" }}
                          key={productItem._id}
                        >
                          {productItem.onSale === "yes" ? (
                            <div
                              className="absolute top-30 m-2 rounded-lg"
                              style={{ backgroundColor: "#e84118" }}
                            >
                              <p className="rounded-full p-1 text-md uppercase tracking-wide text-white sm:py-1 sm:px-3">
                                {productItem.priceDrop}% Off
                              </p>
                            </div>
                          ) : null}
                          <div className="p-4">
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full rounded aspect-square"
                            />
                          </div>
                          <div className="px-8 pb-4">
                            <h3
                              className="text-left text-md font-bold"
                              style={{ color: "#2F3640" }}
                            >
                              {productItem.name}
                            </h3>
                            <div className="flex flex-row space-x-4">
                              <h1
                                className="mt-1 text-lg font-bold"
                                style={{ color: "#e84118" }}
                              >
                                LKR
                                {productItem.price -
                                  (productItem.price * productItem.priceDrop) /
                                    100}
                              </h1>
                              <p
                                className={`mr-3 mt-2 text-sm font-semibold text-gray-500  ${
                                  productItem.onSale === "yes"
                                    ? "line-through"
                                    : ""
                                }`}
                              >{`LKR ${productItem.price}`}</p>
                              
                            </div>
                            <StarRatings
                                  rating={2.403}
                                  starDimension="20px"
                                  starSpacing="1px"
                                  starRatedColor="#e84118"
                                />

                            <button
                              className="text-white text-sm font-semibold px-4 py-2 rounded-md mt-4 w-full"
                              style={{ backgroundColor: "#e84118" }}
                              onClick={() => {
                                // Add your button click functionality here
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))
                  : null} 
            </div> 
        </div>
        <div className="   px-4 py-4 mx-auto sm:py-6 sm:px-6 lg:px-8">
          <h2
            className="text-xl font-bold text-left sm:text-3xl relative"
            style={{ color: "#2F3640" }}
          >
            New Arraivals
            <span
              className="block border-b-4"
              style={{ borderColor: "#e84118", width: "8%" }}
            ></span>
          </h2>
          <div   className="flex space-x-3 overflow-x-scroll scrollbar-hide home-productContainer" {...events} ref={ref}>
            
                {products && products.length
                  ? products
                      .filter((item) => item.newArrivals === "yes")
                      .splice(0, 6)
                      .map((productItem) => (
                        <div
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer relative home-productItem"
                          style={{ backgroundColor: "#F2F0F0" }}
                          key={productItem._id}
                        >
                          {productItem.onSale === "yes" ? (
                            <div
                              className="absolute top-30 m-2 rounded-lg"
                              style={{ backgroundColor: "#e84118" }}
                            >
                              <p className="rounded-full p-1 text-md uppercase tracking-wide text-white sm:py-1 sm:px-3">
                                {productItem.priceDrop}% Off
                              </p>
                            </div>
                          ) : null}
                          <div className="p-4">
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full rounded aspect-square"
                            />
                          </div>
                          <div className="px-8 pb-4">
                            <h3
                              className="text-left text-md font-bold"
                              style={{ color: "#2F3640" }}
                            >
                              {productItem.name}
                            </h3>
                            <div className="flex flex-row space-x-4">
                              <h1
                                className="mt-1 text-lg font-bold"
                                style={{ color: "#e84118" }}
                              >
                                LKR
                                {productItem.onSale=== "yes" ? productItem.price -
                                  (productItem.price * productItem.priceDrop) /
                                    100 :productItem.price }
                              </h1>
                              <p
                                className={`mr-3 mt-2 text-sm font-semibold text-gray-500  ${
                                  productItem.onSale === "yes"
                                    ? "line-through"
                                    : ""
                                }`}
                              >{ productItem.onSale === "yes" && `LKR ${productItem.price}`}</p>
                              
                            </div>
                            <StarRatings
                                  rating={2.403}
                                  starDimension="20px"
                                  starSpacing="1px"
                                  starRatedColor="#e84118"
                                />

                            <button
                              className="text-white text-sm font-semibold px-4 py-2 rounded-md mt-4 w-full"
                              style={{ backgroundColor: "#e84118" }}
                              onClick={() => {
                                // Add your button click functionality here
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))
                  : null} 
            </div> 
        </div>
        <div className="  w-full px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 " style={{backgroundColor:'#f7bfb0'}} id="packages">
          <div className="mb-20   ">
            <div className="text-start py-8">
              <h2
                className="text-xl font-bold  text-center"
                style={{ color: "#2F3640",fontSize:'2.8rem'  }} 
              >
                Want To <span style={{ color: "#e84118" }}>Join Us</span>
              </h2>
            </div> 
            <div className="text-center py-8">
              <h2
                className="text-xl font-extrabold "
                style={{ color: "#2F3640",fontSize:'2.5rem' }}
              >
                Pricing <span className="font-semibold">Plans</span>
              </h2>
            </div>
          </div>

          <div className="home-pricingContainer"> 
          <div
              className=" rounded-xl shadow-md   lg:mr-10 sm:mb-50   relative  lg:w-1/5   cursor-pointer"
              style={{ backgroundColor: "#EFEFEF" }}
              onClick={handlefreelancerRegister}
            > 
              <div className="home-pricingItemHeaderContainer rounded-full  w-full " >
              <Image
                src={user1}
                alt="Package Image"
                className="w-24 h-24 rounded-full   z-10 absolute  transform -translate-y-1/2  "
              />
                <div className="flex flex-col text-center w-full" >
                  <div className="pt-16 w-full " style={{ backgroundColor: "#e84118",borderRadius:'8px 8px 0px 0px' }}>
                    <div className="uppercase tracking-wide text-3xl text-white font-bold">
                      FREELANCER
                    </div>
                    <div className="uppercase tracking-wide text-2xl text-white">
                      LKR 5000
                    </div>
                    <h2 className="mt-2 text-xl font-bold"></h2>
                    <p className="mt-2 text-gray-500"></p>
                  </div>
                  <div
                    className="p-8 text-start space-y-4"
                  >
                    <div className="flex flex-row">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd"/></svg>
                    <p className="ml-2 text-gray-500">3 Photos</p>
                    </div>
                    <div className="flex flex-row">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd"/></svg>
                    <p className="ml-2 text-gray-500">5 Videos</p>
                    </div>
                    <div className="flex flex-row">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd"/></svg>
                    <p className="ml-2 text-gray-500">Account valid for 01 month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className=" rounded-xl shadow-md    relative  lg:w-1/5  md:h-150     cursor-pointer"
              style={{ backgroundColor: "#EFEFEF" }}
              onClick={handleMemberRegister}
            > 
              <div className="home-pricingItemHeaderContainer rounded-full  w-full " >
              <Image
                src={user1}
                alt="Package Image"
                className="w-24 h-24 rounded-full   z-10 absolute  transform -translate-y-1/2  "
              />
                <div className="flex flex-col text-center w-full" >
                  <div className="pt-16 w-full " style={{ backgroundColor: "#e84118",borderRadius:'8px 8px 0px 0px' }}>
                    <div className="uppercase tracking-wide text-3xl text-white font-bold">
                    MEMBER
                    </div>
                    <div className="uppercase tracking-wide text-2xl text-white">
                    LKR 15,000
                    </div>
                    <h2 className="mt-2 text-xl font-bold"></h2>
                    <p className="mt-2 text-gray-500"></p>
                  </div>
                  <div
                    className="p-8 text-start space-y-4"
                  >
                    <div className="flex flex-row">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd"/></svg>
                    <p className="ml-2 text-gray-500">40 Photos</p>
                    </div>
                    <div className="flex flex-row">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd"/></svg>
                    <p className="ml-2 text-gray-500">20 Videos</p>
                    </div>
                    <div className="flex flex-row">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd"/></svg>
                    <p className="ml-2 text-gray-500">Account valid for 01 year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
 
          </div>
        </div>
      </section>
    </main>
  );
}
