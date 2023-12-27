'use client'
import React, { useContext, useEffect, useState } from "react";
import {forgotPassword } from "@/services/login";

export const dynamic = "force-dynamic";

export default function page() {

  function generateOTP() {
    const otp = Math.floor(10000000 + Math.random() * 90000000);
    return otp.toString();
  }

  async function getActivityLogUpdate() {
    console.log("ddddddddddddddd")
    const test = await forgotPassword("982480477", "0767158801");
    if (test.success) {
      console.log("🚀 ~ 🚀 ~", test.success)
      const convertedNumber = `94${test.checkUser.phone.slice(1)}`;
      console.log("🚀 ~ file: page.js:14 ~ getActivityLogUpdate ~ test:", test)
      // const otp = generateOTP()
      // const msg = "your password reset OTP: " + otp
      // const res = await msgTest(msg, convertedNumber);
    } else {
      console.log("🚀 ~ ")
    }
    // 
    // console.log("🚀 ~ file: page.js:19 ~ getActivityLogUpdate ~ convertedNumber:", convertedNumber)

    // const otp = generateOTP()
    // const msg = "your password reset OTP: " +otp
    // const res = await msgTest(msg,convertedNumber);

  }

  return (
    <div>
      <button className="mt-20 text-black" onClick={getActivityLogUpdate}>Click Me 1</button>
      <ul>
        <li className="text-black">hh</li>
        {/* <li className="text-black">{allSellerDeposits.description}</li> */}
      </ul>
    </div>
  );
};
