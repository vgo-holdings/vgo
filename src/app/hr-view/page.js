"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { useState } from "react";
import { GlobalContext } from "@/context";
import { getAllClassDatas } from "@/services/class";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function AdminView() {

  const [classData, setClassData] = useState([]);

  const {
    allOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllClassDatas() {
    setPageLevelLoader(true);
    const res = await getAllClassDatas();

    console.log(res);

    if (res.success) {
      setClassData(res.data);
      setPageLevelLoader(false);
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllClassDatas();
  }, [user]);

  console.log(allOrdersForAllUsers);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full mt-8 p-24">
      {classData.map((classItem, index) => (
      <>  
      <h1 className="text-center text-2xl font-bold mb-4">Table Id : {classItem._id}</h1>
      <h1 className="text-center text-2xl font-bold mb-4">Table type : {classItem.name}</h1>
      <table className="w-full table-auto border-collapse mb-20" key={index}>
        <tbody className="text-center border border-black">
          <tr className="border border-black h-20">
            {[1].map((column) => (
              <td colSpan="8" key={column} className="bg-yellow-500 py-2 h-full border border-black">
                Column {column}
              </td>
            ))}
          </tr>
          <tr className="border border-black h-20">
          {Array.from({ length: classItem?.lvl2_count || 0 }).map((_, columnIndex) => (
              <td
                key={columnIndex}
                colSpan={4}
                className="bg-red-500 py-2 h-full border border-black"
              >
                {classItem?.lvl2_count}
              </td>
            ))}
          </tr>
          <tr className="border border-black h-20">
          {Array.from({ length: classItem?.lvl3_count || 0 }).map((_, columnIndex) => (
              <td
                key={columnIndex}
                colSpan={2}
                className="bg-purple-500 py-2 h-full border border-black"
              >
                {classItem?.lvl3_count}
              </td>
            ))}
          </tr>
          <tr className="border border-black h-20">
          {Array.from({ length: classItem?.lvl4_count || 0 }).map((_, columnIndex) => (
              <td
                key={columnIndex}
                colSpan={1}
                className="bg-blue-500 py-2 h-full border border-black"
              >
                {classItem?.lvl4_count}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      </>
      ))}
    </div>
  );
}
