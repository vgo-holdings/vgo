"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./../ProductButtons";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <li
      className="w-full h-full rounded-lg"
      style={{ backgroundColor: "#F2F0F0", color: "#F2F0F0"}}
      key={item?._id}
    >
      <div className="p-4">
        <img
          src={item?.imageURL}
          alt="Sale Product Item"
          className="object-cover w-full rounded aspect-square"
        />
      </div>
      <div className="px-8 pb-4">
        <h3
          className="text-center text-md font-bold"
          style={{ color: "#2F3640" }}
        >
          {item?.name}
        </h3>
        <h3
          className="text-center text-md font-bold"
          style={{ color: "#2F3640" }}
        >
          {item?.role}
        </h3>
        {/* Star */}
      <ProductButton item={item} />
      </div>
    </li>
  );
}
