"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./../ProductButtons";
import StarRatings from "react-star-ratings";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/product/${item._id}`)
      }
      className="cursor-pointer relative"
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
        <h3 class="px-5 mb-1 text-lg font-bold dark:text-white"> {item.name} </h3>
      </a>
      <div class="px-5 p-2">
        <p class="mt-1 text-sm text-slate-400">Colombo</p>
        <StarRatings
          rating={2.403}
          starDimension="20px"
          starSpacing="1px"
          starRatedColor="#e84118"
        />
        {/* <div class="flex gap-1 text-orange-400 mt-1">
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
        </div> */}
      </div>
      <div class="flex">
        <div class="w-1/2 px-5 pb-3">
          <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
            LKR {item.price -
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
    // <div
    //   onClick={() =>
    //     router.push(`/product/${item._id}`)
    //   }
    //   className="cursor-pointer relative  "
    //   style={{
    //     backgroundColor: "#F2F0F0",
    //     boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    //     backdropFilter: 'blur(12.7px)',
    //     borderRadius: "5px"
    //   }}
    //   key={item._id}
    // >
    //   {item.onSale === "yes" ? (
    //     <div
    //       className="absolute top-30 m-2 rounded-lg"
    //       style={{ backgroundColor: "#e84118" }}
    //     >
    //       <p className="rounded-full p-1 text-md uppercase tracking-wide text-white sm:py-1 sm:px-3">
    //         {item.priceDrop}% Off
    //       </p>
    //     </div>
    //   ) : null}
    //   <div className="p-4">
    //     <img
    //       src={item.imageUrl}
    //       alt="Sale Product Item"
    //       className="object-cover w-full rounded aspect-square"
    //     />
    //   </div>
    //   <div className="px-8 pb-4">
    //     <h3
    //       className="text-left text-md font-bold"
    //       style={{ color: "#2F3640" }}
    //     >
    //       {item.name}
    //     </h3>
    //     <div className="flex flex-row space-x-4">
    //       <h1
    //         className="mt-1 text-lg font-bold"
    //         style={{ color: "#e84118" }}
    //       >
    //         LKR
    //         {item.price -
    //           (item.price * item.priceDrop) /
    //           100}
    //       </h1>
    //       <p
    //         className={`mr-3 mt-2 text-sm font-semibold text-gray-500  ${item.onSale === "yes"
    //             ? "line-through"
    //             : ""
    //           }`}
    //       >{`LKR ${item.price}`}</p>

    //     </div>
    //     <StarRatings
    //       rating={2.403}
    //       starDimension="20px"
    //       starSpacing="1px"
    //       starRatedColor="#e84118"
    //     />
    //     <ProductButton item={item} />
    //   </div>
    // </div>
  );
}
