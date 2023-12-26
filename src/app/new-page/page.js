'use client'
import React, { useContext, useEffect, useState } from "react";
import {userLog } from "@/services/user";
import { getAllDeposits } from "@/services/bank-deposit";
// Person.watch().on('change', data => console.log(new Date(), data));
export const dynamic = "force-dynamic";

// import mongoose from "mongoose";

// const userLogSchema = new mongoose.Schema(
//   {
//     userId: String,
//     description: String,
//   },
//   { timestamps: true }
// );
// const userLog1 = mongoose.model('userLog1', userLogSchema, 'userLog1');


export default function page () {
  
  // userLog.watch().on('change', data => console.log(new Date(), data));
  // const [logData, setlogData] = useState([]);
  // let allSellerDeposits;

  async function getActivityLogUpdate() {
    console.log("🚀 ~ 🚀 ~ 🚀 ~ 🚀 ~ 🚀 ~")
    // userLog.watch().on('change', data => console.log(new Date(), data));
  }
  
  // async function getActivityLogUpdate() {
  //   console.log("ddddddddddddddd")
  //   const test = userLog.watch().on('change', data => getActivityLog());
  //   console.log("🚀 ~ file: page.js:14 ~ getActivityLogUpdate ~ test:", test)
  // }

  // getActivityLogUpdate();

  // console.log("🚀 ~ 🚀 ~ 🚀 ~ 🚀 ~ 🚀 ~")
  // async function getActivityLog() {
  //   console.log("658455013e4effa61aeb71bf", "user?._id");
  //   const activitylog = await userLog("658455013e4effa61aeb71bf");
  //   console.log("🚀 ~ file: page.js:152 ~ getActivityLog ~ activitylog:", activitylog)
  //   return activitylog?.extractApprovedDeposits
  //   allSellerDeposits = activitylog?.extractApprovedDeposits
  // }

  // allSellerDeposits = await getActivityLog();

  // console.log("🚀 ~ file: page.js:24 ~ page ~ allSellerDeposits:", allSellerDeposits)
  // console.log("🚀 ~ 🚀 ~ 🚀 ~ 🚀 ~ 🚀 ~")

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const Logdata = await getActivityLog();
  //     console.log("🚀 ~ file: page.js:160 ~ fetchData ~ Logdata:", Logdata)
  //     setlogData(Logdata);
  //   };

  //   fetchData();

  //   // Fetch data every 2 minutes
  // const fetchDataInterval = setInterval(fetchData, 2 * 60 * 1000);

  // // Cleanup the interval when the component unmounts
  // return () => clearInterval(fetchDataInterval);

  // }, [setlogData]);

  return (
    <div>
      <button className="mt-20 text-black" >Click Me 1</button>
      <ul>
        <li className="text-black">hh</li>
        {/* <li className="text-black">{allSellerDeposits.description}</li> */}
      </ul>
    </div>
  );
};
