"use client";

import { useRouter } from "next/navigation";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";

export default function DirectorListing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const filteredData = data

  return (
    <section className="bg-white">
      <div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-9">
          {filteredData?.length
            ? filteredData.map((item) => (
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
      <Notification />
    </section>
  );
}
