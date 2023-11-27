"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./../ProductButtons";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <div
    className="relative  "
    style={{ backgroundColor: "#F2F0F0",  
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(12.7px)',
    borderRadius: "5px"
    }}
    key={item._id}
  >
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
      <ProductButton item={item} />
      </div>
    </div>
  );
}
