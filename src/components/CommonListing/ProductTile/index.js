"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./../ProductButtons";
import StarRatings from "react-star-ratings";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <div
    className="cursor-pointer relative  "
    style={{ backgroundColor: "#F2F0F0",  
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(12.7px)',
    borderRadius: "5px"
    }}
    key={item._id}
  >
    {item.onSale === "yes" ? (
      <div
        className="absolute top-30 m-2 rounded-lg"
        style={{ backgroundColor: "#e84118" }}
      >
        <p className="rounded-full p-1 text-md uppercase tracking-wide text-white sm:py-1 sm:px-3">
          {item.priceDrop}% Off
        </p>
      </div>
    ) : null}
    <div className="p-4">
      <img
        src={item.imageUrl}
        alt="Sale Product Item"
        className="object-cover w-full rounded aspect-square"
      />
    </div>
    <div className="px-8 pb-4">
      <h3
        className="text-left text-md font-bold"
        style={{ color: "#2F3640" }}
      >
        {item.name}
      </h3>
      <div className="flex flex-row space-x-4">
        <h1
          className="mt-1 text-lg font-bold"
          style={{ color: "#e84118" }}
        >
          LKR
          {item.price -
            (item.price * item.priceDrop) /
              100}
        </h1>
        <p
          className={`mr-3 mt-2 text-sm font-semibold text-gray-500  ${
            item.onSale === "yes"
              ? "line-through"
              : ""
          }`}
        >{`LKR ${item.price}`}</p>
        
      </div>
      <StarRatings
            rating={2.403}
            starDimension="20px"
            starSpacing="1px"
            starRatedColor="#e84118"
          />
      <ProductButton item={item} />
      </div>
    </div>
  );
}
