"use client";

import { useRouter } from "next/navigation";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";

export default function CommonListing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="bg-white  ">
      <div className=" "> 
        <div className="  grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-9">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification/>
    </section>
  );
}
