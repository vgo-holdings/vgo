"use client";

import { useRouter } from "next/navigation";
import ProductTile from "./ProductTile";
import React, { useEffect, useState } from "react";
import Notification from "../Notification";
import Image from "next/image";
import bannerIMage from "../../assets/images/assets/img2.png";
import "./page-style.css";
export default function CommonListing({ data }) {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(true);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    router.refresh();
  }, []);

  const [productName, setproductName] = useState('');

  async function handleSearch() {
    console.log("search and give relavent data")
    console.log(productName)

    const newFilteredData = data.filter(item =>
      item.name.toLowerCase().includes(productName.toLowerCase())
    );

    setFilteredData(newFilteredData);

    console.log(filteredData, "filteredData");

  }
  function filtermenu() {
    console.log("🚀 ~ file: page.js:15 ~ filtermenu ~ setShowFilters:", showFilters)
    setShowFilters(!showFilters);
  }

  async function handleSearchInstance(productNameBySearch) {
    console.log("search and give relavent data")
    console.log(productNameBySearch)

    const newFilteredData = data.filter(item =>
      item.name.toLowerCase().includes(productNameBySearch.toLowerCase())
    );

    setFilteredData(newFilteredData);

    console.log(filteredData, "filteredData");
  }

  return (
    <div className="shop-mainContainer">
      <div className="shop-banner">
        <p style={{ marginBottom: "auto", marginTop: "auto" }}>
          <span style={{ color: "#e84118" }}>Shopping</span> the way you like it
        </p>
        <Image
          src={bannerIMage}
          className="shop-bannerImage"
          alt="shop-banner"
          width={500}
          height={500}
        />
      </div>

      <div class="w-full lg:w-[92%] shadow p-5 rounded-lg bg-white">
        <div class="flex">
          {/* <div class="absolute flex items-center ml-2 h-full">
            <svg class="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
            </svg>
          </div> */}

          <input
            type="text"
            placeholder="Search for products...."
            class="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setproductName(e.target.value)}
          />
          <button className="bg-orange-500 p-3 border rounded"
            onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>

        <div class="flex items-center justify-between mt-4">
          <p class="font-medium">
            Filters
          </p>
          <div>
            <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
              Reset Filter
            </button>
            <button class="ml-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" onClick={filtermenu}>
              {
                showFilters ? ("Hide Filter") : ("Show Filter")
              }
            </button>
          </div>
        </div>
        {
          showFilters &&
          <div>
            <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                <option value="">Any Price</option>
                <option value="price1">LKR 0 - LKR 10,000</option>
                <option value="price2">LKR 10,000 - LKR 20,000</option>
                <option value="price3">LKR 20,000 - LKR 50,000</option>
                <option value="price4">LKR 50,000 +</option>
              </select>

              <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                <option value="">Location</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Badulla">Badulla</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Kegale">Kegale</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mannar">Mannar</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Vavuniya">Vavuniya</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Matale">Matale</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Hambanthota">Hambanthota</option>
                <option value="Rathnapura">Rathnapura</option>
                <option value="Batticaloa">Batticaloa</option>
              </select>

              <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                <option value="">Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing and Fashion">Clothing and Fashion</option>
                <option value="Home and Furniture">Home and Furniture</option>
                <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                <option value="Books, Movies, and Music">Books, Movies, and Music</option>
                <option value="Sports and Outdoors">Sports and Outdoors</option>
                <option value="Toys and Games">Toys and Games</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Automotive">Automotive</option>
                <option value="Jewelry and Watches">Jewelry and Watches</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Food and Beverages">Food and Beverages</option>
                <option value="Pets">Pets</option>
                <option value="Art and Crafts">Art and Crafts</option>
                <option value="Home Improvement and Tools">Home Improvement and Tools</option>
                <option value="Travel and Luggage">Travel and Luggage</option>
                <option value="Baby and Maternity">Baby and Maternity</option>
                <option value="Gifts and Occasions">Gifts and Occasions</option>
                <option value="Electrical and Lighting">Electrical and Lighting</option>
                <option value="Garden and Outdoor Living">Garden and Outdoor Living</option>
              </select>
            </div>
          </div>
        }
      </div>

      <section class="flex items-center py-20 bg-gray-100 dark:bg-gray-800 lg:w-[92%]">
        <div class="px-4 mx-auto max-w-7xl">
          <div class="grid grid-cols-1 gap-4 lg:gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredData && filteredData.length
              ? filteredData.map((item) => (
                <div class="relative overflow-hidden bg-white rounded-xl dark:bg-gray-700 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 cursor-pointer"
                  onClick={() =>
                    router.push(`/product/${item._id}`)
                  }
                  key={item._id}
                >
                  <div class="relative overflow-hidden p-5">
                    <div class="mb-5 overflow-hidden ">
                      <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src={item.imageUrl} alt="" />
                    </div>
                    {item.onSale === "yes" ? (
                      <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
                        <p className="rounded-full text-sm uppercase tracking-wide text-white sm:py-1 sm:px-3">
                          {item.priceDrop}% Off
                        </p>
                      </button>
                    ) : null}
                  </div>
                  <a>
                    <h3 class="px-5 mb-1 text-lg font-bold dark:text-white h-10"> {item.name} </h3>
                  </a>
                  <div class="px-5 p-2">
                    <p class="mt-1 text-sm text-slate-400">Colombo</p>
                    <div class="flex gap-1 text-orange-400 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star" viewBox="0 0 16 16">
                        <path
                          d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="w-1/2 px-5 pb-3">
                      <p class="text-md font-bold text-orange-500 dark:text-orange-300">
                        {item.price -
                          (item.price * item.priceDrop) /
                          100}
                      </p>
                      <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">{`LKR ${item.price}`}</span>
                    </div>
                    <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
              : <p>No matching products found</p>
            }
          </div>
        </div>
      </section>
      <div className="shop-container">
      </div>
    </div>
  );
}
