'use client'

import React, { useState, useEffect } from "react";
import { userConnection, userDataByNic } from "@/services/user";
import { getClassDataById } from "@/services/class";

function moreDetailsView(UserClassdata, userName) {
  console.log("🚀 ~ file: page.js:8 ~ moreDetailsView ~ UserClassdata:", UserClassdata)

  const renderNames = (level) => {
    return UserClassdata?.map((user) => (
      user.class_lvl === level && (
        <div key={user._id} className={`rounded-lg items-center flex justify-center w-[214px] py-1 m-2 ${userName === user.name ? 'bg-green-500' : 'bg-gray-400'}`}>
          <h1 className="text-gray-900 text-sm p-2">{user.name}</h1>
        </div>
      )
    ));
  };

  return (
    <div className="z-10  bg-gray-200 p-5">
      <h1 className="items-center flex justify-center">Class Details</h1>
      <div>
        {[1, 2, 3, 4].map((level) => (
          <div key={level} className="flex flex-auto mt-8 items-center">
            <h1 className="text-gray-900 text-sm  ">Lvl:{level}</h1>
            <div>{renderNames(level)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function userDetails(userConnectionData, showclassDetails, detailsid, moreDetailsView, viewMore, UserClassdata) {
  return (
    <div>
      <div className="flex flex-auto mt-4 items-center ">
        <div className="relative rounded-xl overflow-auto py-4 px-8 w-full">
          <div className="overflow-visible relative w-full mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5">
            <img className="absolute -left-6 w-24 h-24 rounded-full shadow-lg"
              src={userConnectionData?.imageURL} />
            <div className="flex flex-col py-4 pl-24 w-60">
              <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">{userConnectionData?.name}</strong>
              <span className="text-slate-500 text-sm font-medium dark:text-slate-400">{userConnectionData?.role}</span>
              <span className="text-slate-500 text-sm font-medium dark:text-slate-400">{userConnectionData?.class_name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="items-center py-2 w-full justify-center flex bg-slate-600 border-dashed rounded-lg">
        <button
          onClick={() => viewMore(userConnectionData?._id, userConnectionData?.class_id)}
          className="text-slate-900 text-sm font-medium dark:text-slate-200">
          {
            showclassDetails && detailsid == userConnectionData?._id ? "View less className Details" : "View More className Details"
          }
        </button>
      </div>
      {
        showclassDetails && detailsid == userConnectionData?._id &&
        moreDetailsView(UserClassdata, userConnectionData?.name)
      }
    </div>
  );
}

export default function page() {
  const [showclassDetails, setClassDetails] = useState(false);
  const [detailsid, setDetailsid] = useState("");
  const [userData, setUserData] = useState([]);
  const [UserClassdata, setUserClassdata] = useState([]);
  const [Nic, setNic] = useState("");

  async function handleUserConnection() {
    const testVal = await userConnection("655e4e8186ae651684506a53");
    console.log("🚀 ~ file: page.js:80 ~ handleUserConnection ~ testVal:", testVal)
    return testVal.classDataWithUsers
  }

  useEffect(() => {

    const fetchData = async () => {
      const data = await handleUserConnection();
      setUserData(data);
    };

    fetchData();
  }, []);

  async function viewMore(id, classId) {
    setDetailsid(id)
    const res = await getClassDataById(classId)
    setUserClassdata(res.data)
    console.log("🚀 ~ file: page.js:119 ~ viewMore ~ res:", res);
    setClassDetails(!showclassDetails);
  }

  async function handleSearch(){
    const res = await userDataByNic(Nic);
    console.log("🚀 ~ file: page.js:104 ~ handleSearch ~ res:", res)
    setUserData(res.classDataWithUsers);
  }

  return (
    <div className="bg-white flex flex-row justify-center w-full h-full">
      <div className="bg-white m-4 w-full p-8">
        <div className="flex">
          <input
            type="text"
            placeholder="Search users By NIC"
            className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          onChange={(e) => setNic(e.target.value)}
          />
          <button className="bg-orange-500 p-3 border rounded"
          onClick={handleSearch}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between p-2">
            <h4 className="text-xl text-gray-900 font-bold">Connections</h4>
          </div>
          <div className="items-center flex justify-center flex-col">
            <div className="grid lg:grid-flow-col gap-8 mt-2">
              {userData.map((user) => userDetails(user, showclassDetails, detailsid, moreDetailsView, viewMore, UserClassdata))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// import React, { useContext, useEffect, useState } from "react";
// import {forgotPassword } from "@/services/login";

// export const dynamic = "force-dynamic";

// export default function page() {

//   function generateOTP() {
//     const otp = Math.floor(10000000 + Math.random() * 90000000);
//     return otp.toString();
//   }

//   async function getActivityLogUpdate() {
//     console.log("ddddddddddddddd")
//     const test = await forgotPassword("982480477", "0767158801");
//     if (test.success) {
//       console.log("🚀 ~ 🚀 ~", test.success)
//       const convertedNumber = `94${test.checkUser.phone.slice(1)}`;
//       console.log("🚀 ~ file: page.js:14 ~ getActivityLogUpdate ~ test:", test)
//       // const otp = generateOTP()
//       // const msg = "your password reset OTP: " + otp
//       // const res = await msgTest(msg, convertedNumber);
//     } else {
//       console.log("🚀 ~ ")
//     }
//     //
//     // console.log("🚀 ~ file: page.js:19 ~ getActivityLogUpdate ~ convertedNumber:", convertedNumber)

//     // const otp = generateOTP()
//     // const msg = "your password reset OTP: " +otp
//     // const res = await msgTest(msg,convertedNumber);

//   }

//   return (
//     <div>
//       <button className="mt-20 text-black" onClick={getActivityLogUpdate}>Click Me 1</button>
//       <ul>
//         <li className="text-black">hh</li>
//       </ul>
//     </div>
//   );
// };
