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

  return (
    <div className="shop-mainContainer">
      <div className="shop-banner">
        <p style={{ marginBottom: "auto", marginTop: "auto" }}>
          <span style={{ color: "#e84118" }}>Shopping</span> the way you like it
        </p>
        <Image
          src={bannerIMage}
          className=""
          alt="shop-banner"
          width={500}
          height={500}
        />
      </div>
      <div className="shop-searchContainer">
        <input
          className="shop-searchInput"
          type="text"
          placeholder="Search for products...."
          onChange={(e) => setproductName(e.target.value)}
        />
        <button className="shop-searchBtn" onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="shop-categoryContainer"></div>
      <div className="shop-container">
        <div className="shop-filterContainer">
          <h1 className="text-2xl lg:text-2xl font-bold h-300 leading-7 lg:leading-9 text-gray-900">
            Filter menu
          </h1>
          <div className="shop-filterMenu">
            <div className="shop-filterMenuHeader">
              <p>Price</p>
            </div>
            <div className="shop-filterMenuBody">
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="price1"
                />
                <label for="price1" className="shop-filterLabel">
                  LKR 0 - LKR 10,000
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="price2"
                />
                <label for="price2" className="shop-filterLabel">
                  LKR 10,000 - LKR 20,000
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="price3"
                />
                <label for="price3" className="shop-filterLabel">
                  LKR 20,000 - LKR 50,000
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="price4"
                />
                <label for="price4" className="shop-filterLabel">
                  LKR 50,000 +
                </label>
              </div>
            </div>
          </div>

          <div className="shop-filterMenu">
            <div className="shop-filterMenuHeader">
              <p>Location</p>
            </div>
            <div className="shop-filterMenuBody">
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location1"/* 
                  checked={isChecked}
                  onChange={setIsChecked(!isChecked)} */
                />
                <label for="location1" className="shop-filterLabel">
                  Colombo
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location2"
                />
                <label for="location2" className="shop-filterLabel">
                  Kandy
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location3"
                />
                <label for="location3" className="shop-filterLabel">
                  Galle
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location4"
                />
                <label for="location4" className="shop-filterLabel">
                  Matara
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location1"
                />
                <label for="location1" className="shop-filterLabel">
                  Anuradhapura
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location2"
                />
                <label for="location2" className="shop-filterLabel">
                  Polonnaruwa
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location3"
                />
                <label for="location3" className="shop-filterLabel">
                  Badulla
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location4"
                />
                <label for="location4" className="shop-filterLabel">
                  Ratnapura
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location1"
                />
                <label for="location1" className="shop-filterLabel">
                  Kegale
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location2"
                />
                <label for="location2" className="shop-filterLabel">
                  Kurunegala
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location3"
                />
                <label for="location3" className="shop-filterLabel">
                  Puttalam
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location4"
                />
                <label for="location4" className="shop-filterLabel">
                  Trincomalee
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location1"
                />
                <label for="location1" className="shop-filterLabel">
                  Jaffna
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location2"
                />
                <label for="location2" className="shop-filterLabel">
                  Kilinochchi
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location3"
                />
                <label for="location3" className="shop-filterLabel">
                  Mannar
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location4"
                />
                <label for="location4" className="shop-filterLabel">
                  Mullaitivu
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location1"
                />
                <label for="location1" className="shop-filterLabel">
                  Vavuniya
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location2"
                />
                <label for="location2" className="shop-filterLabel">
                  Gampaha
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location3"
                />
                <label for="location3" className="shop-filterLabel">
                  Kalutara
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location4"
                />
                <label for="location4" className="shop-filterLabel">
                  Matale
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location1"
                />
                <label for="location1" className="shop-filterLabel">
                  Nuwara Eliya
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location2"
                />
                <label for="location2" className="shop-filterLabel">
                  Monaragala
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location3"
                />
                <label for="location3" className="shop-filterLabel">
                  Hambanthota
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location4"
                />
                <label for="location4" className="shop-filterLabel">
                  Rathnapura
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="location4"
                />
                <label for="location4" className="shop-filterLabel">
                  Batticaloa
                </label>
              </div>
            </div>
          </div>

          <div className="shop-filterMenu">
            <div className="shop-filterMenuHeader">
              <p>Service</p>
            </div>
            <div className="shop-filterMenuBody">
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="service1"
                />
                <label for="service1" className="shop-filterLabel">
                  Installment
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="service2"
                />
                <label for="service2" className="shop-filterLabel">
                  Cash on Delivery
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="service3"
                />
                <label for="service3" className="shop-filterLabel">
                  Verified Dealers
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="service4"
                />
                <label for="service4" className="shop-filterLabel">
                  Free Shipping
                </label>
              </div>
            </div>
          </div>

          <div className="shop-filterMenu">
            <div className="shop-filterMenuHeader">
              <p>Warranty</p>
            </div>
            <div className="shop-filterMenuBody">
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="warranty1"
                />
                <label for="warranty1" className="shop-filterLabel">
                  Brand Warranty
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="warranty2"
                />
                <label for="warranty2" className="shop-filterLabel">
                  Local Warranty
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="warranty3"
                />
                <label for="warranty3" className="shop-filterLabel">
                  Seller Warranty
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="service4"
                />
                <label for="warranty4" className="shop-filterLabel">
                  Agent Warranty
                </label>
              </div>
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="service5"
                />
                <label for="service5" className="shop-filterLabel">
                  No Warranty
                </label>
              </div>
            </div>
          </div>

          <div className="shop-filterMenu">
            <div className="shop-filterMenuHeader">
              <p>Brand</p>
            </div>
            <div className="shop-filterMenuBody">
              <div className="shop-filterMenuBodyItem">
                <input
                  type="checkbox"
                  className="shop-filterCheckbox"
                  id="brand1"
                />
                <label for="brand1" className="shop-filterLabel">
                  Brand name
                </label>
              </div>
            </div>
          </div>
        </div>{/* 
        {isChecked && (
          <div className="shop-productContainer">
            <CommonListing data={getFiveProduct && getFiveProduct.data} />
          </div>
        )} */}
        <div className="shop-productContainer">
          <section className="bg-white  ">
            <div className=" ">
              <div className="  grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-9">
                {/* {data && data.length
                  ? data.map((item) => (
                    <article
                      className="relative flex flex-col overflow-hidden border cursor-pointer"
                      key={item._id}
                    >
                      <ProductTile item={item} />
                    </article>
                  ))
                  : null} */}
                {filteredData && filteredData.length
                  ? filteredData.map((item) => (
                    <article
                      className="relative flex flex-col overflow-hidden border cursor-pointer"
                      key={item._id}
                    >
                      <ProductTile item={item} />
                    </article>
                  ))
                  : <p>No matching products found</p>
                }
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
