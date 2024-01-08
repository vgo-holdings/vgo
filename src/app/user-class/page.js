'use client'

import React, { useState } from "react";

function moreDetailsView() {
    console.log("test");
    return (
        <div className="absolute  h-[833px] bg-[#2e0f0f] p-5">
            <h1 className="items-center flex justify-center">className</h1>
            <div className="flex flex-auto mt-4 items-center">
                <h1>Lvl 1</h1>
                <div className=" w-[214px] h-[34px] m-2 bg-black" />
            </div>
            <div className="flex flex-auto mt-8 items-center">
                <h1>Lvl 2</h1>
                <div>
                    <div className=" w-[214px] h-[34px] m-2 bg-black" />
                    <div className=" w-[214px] h-[34px] m-2  bg-black" />
                </div>
            </div>
            <div className="flex flex-auto mt-8 items-center">
                <h1>Lvl 3</h1>
                <div>
                    <div className=" w-[214px] h-[34px] m-2 bg-black" />
                    <div className=" w-[214px] h-[34px] m-2  bg-black" />
                    <div className=" w-[214px] h-[34px] m-2 bg-black" />
                    <div className=" w-[214px] h-[34px] m-2  bg-black" />
                </div>
            </div>
            <div className="flex flex-auto mt-8 items-center">
                <h1>Lvl 4</h1>
                <div>
                    <div className=" w-[214px] h-[34px] m-2 bg-black" />
                    <div className=" w-[214px] h-[34px] m-2  bg-black" />
                    <div className=" w-[214px] h-[34px] m-2 bg-black" />
                    <div className=" w-[214px] h-[34px] m-2  bg-black" />
                    <div className=" w-[214px] h-[34px] m-2 bg-black" />
                    <div className=" w-[214px] h-[34px] m-2  bg-black" />
                    <div className=" w-[214px] h-[34px] m-2 bg-black" />
                    <div className=" w-[214px] h-[34px] m-2  bg-black" />
                </div>
            </div>
        </div>
    );
}

export default function UserClass() {

    const [showclassDetails, setClassDetails] = useState(false);
    const [detailsid, setDetailsid] = useState("");

    async function viewMore(id) {
        setDetailsid(id)
        setClassDetails(!showclassDetails);

    }
    return (
        <div className="bg-red-700 flex flex-row justify-center w-full h-full border border-yellow-500">
            <h1>hi</h1>
        </div>
    );
}