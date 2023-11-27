"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
    return (
        <footer className="bg-gray-700 text-white p-4 md:py-8">
          <div className="container mx-auto space-y-4 flex flex-col md:flex-row justify-between gap-4 md:gap-8">
            <div className="md:w-1/4 mb-4 md:mb-0 space-y-2">
                <div className="flex justify-center">
                  <div onClick={() => router.push("/")} className="items-center cursor-pointer">
                    <div className="text-3xl font-medium text-orange-600" >VGO</div>
                    <span className="self-center text-md font-semibold whitespace-nowrap" style={{ color: "#8B8989"}}>
                      Holdings
                    </span>
                  </div>
                </div>
                <p className="sm:text-center" style={{ color: "#8B8989"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
                </p>
            </div>
            <div className="md:w-1/4 md:text-center">
              <h4 className="text-xl text-orange-600 font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Home</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>About Us</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Shop</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Manufacturing</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Reviews</a>
                </li>
              </ul>
            </div>
            <div className="md:w-1/4 md:text-center">
              <h4 className="text-xl font-semibold mb-2 text-orange-600">Our Partners</h4>
              <ul className="space-y-2">
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Login</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Register</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>My Account</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Terms and Conditions</a>
                </li>
                <li>
                    <a className="hover:text-green-500" style={{ color: "#8B8989"}}>Privacy & Policy</a>
                </li>
              </ul>
            </div>
            <div className="md:w-1/4 md:text-center">
              <h4 className="text-xl font-semibold mb-2 text-orange-600">Contact Us</h4>
              <div className="space-y-2" style={{ color: "#8B8989"}}>
                <p>123 Main Street</p>
                <p>City, Country</p>
                <p>Email: contact@example.com</p>
                <p>Phone: +123 456 789</p>
                <p>Working Time: 8.00 A.M - 6.00 P.M</p>
              </div>
            </div>
          </div>
        </footer>
      );
}