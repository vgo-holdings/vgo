"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Notification from "../Notification";

export default function ApprovedListing({ data }) {
  const router = useRouter();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="bg-white">
      <div className="container mx-auto py-8 p-1 md:p-0  mt-0 md:mt-16">
        <table className="min-w-full bg-orange-600 bg-opacity-60 border border-gray-300">
          <thead className="h-20">
            <tr>
              <th className="py-2 px-4 border border-white">Name</th>
              <th className="py-2 px-4 border border-white">Refkey</th>
              <th className="py-2 px-4 border border-white">Created At</th>
              <th className="py-2 px-4 border border-white">Image</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length &&
              data.map((item) => (
                <tr key={item._id}>
                  {item.approved === true && (
                    <>
                      <td className="py-2 px-4 border border-white">{item.name}</td>
                      <td className="py-2 px-4 border border-white">{item.refkey}</td>
                      <td className="py-2 px-4 border border-white">{formatDate(item.createdAt)}</td>
                      <td className="py-2 px-4 border border-white">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Notification />
    </section>
  );
}