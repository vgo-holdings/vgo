'use client'
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import b2bImage from "./6918874.jpg"

export default function page() {
    return (
        <section class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 lg:h-screen">
            <div class="px-4 py-20 mx-auto max-w-7xl">
                <div class="flex flex-wrap">
                    <div class="relative w-full mb-10 lg:mb-0 lg:mr-20 lg:w-2/5">
                        <div class="absolute z-10 hidden w-full h-full bg-orange-400 rounded -top-6 left-6 lg:block">
                        </div>
                        <Image
                            src={b2bImage}
                            className="relative z-20 object-cover w-full h-full rounded"
                            alt="B2B"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div class="flex-1 pl-0 lg:pl-4">
                        <div class="mb-12">
                            <div class="relative">
                                <h1 class="absolute -top-14 -left-44 text-[120px] font-bold opacity-5"> Concept
                                </h1>
                                <h1 class="text-5xl font-bold dark:text-white"> Business Model <span class="text-orange-500">
                                    B2B
                                </span> </h1>
                                <div class="flex w-24 mt-1 mb-10 overflow-hidden rounded">
                                    <div class="flex-1 h-2 bg-orange-200">
                                    </div>
                                    <div class="flex-1 h-2 bg-orange-400">
                                    </div>
                                    <div class="flex-1 h-2 bg-orange-600">
                                    </div>
                                </div>
                            </div>
                            <p class="mb-16 text-base text-gray-500">
                                Business-to-Business (B2B) refers to a business conducted between companies rather than between a company and an individual consumer.B2B companies create products and services for other businesses,organizations and charities.
                            </p>
                        </div>
                        <div class="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/ios/100/commercial--v1.png" alt="commercial--v1" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> Marketing </h3>
                            </div>
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/hatch/64/iron-ore.png" alt="iron-ore" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> Raw Materials </h3>
                            </div>
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/pastel-glyph/64/sales-growth.png" alt="sales-growth" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> Sales </h3>
                            </div>
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/ios/100/supply-chain.png" alt="supply-chain" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> supply chain </h3>
                            </div>
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/external-outline-lafs/64/external-ic_components-dao-and-tocenomics-outline-lafs.png" alt="external-ic_components-dao-and-tocenomics-outline-lafs" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> Sub components </h3>
                            </div>
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/ios-glyphs/30/refund-2.png" alt="refund-2" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> Transaction </h3>
                            </div>
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/pastel-glyph/64/market--v2.png" alt="market--v2" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> Market </h3>
                            </div>
                            <div
                                class="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                                <div class="inline-block p-4 mb-4 bg-orange-400 rounded-full">
                                    <img width="32" height="32" src="https://img.icons8.com/glyph-neue/64/customer-insight.png" alt="customer-insight" />
                                </div>
                                <h3 class="text-lg font-semibold text-black dark:text-white"> Business </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};