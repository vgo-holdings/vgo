"use client";

import { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import './page-style.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [nic, setNIC] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement form submission logic here, e.g., send data to an API or handle it in your Next.js backend.
  };

  const handleFormChange = () => {
    setIsFormFilled(name.trim() !== '' && nic.trim() !== '' && email.trim() !== '' && message.trim() !== '');
  };


  return (
    <form onSubmit={handleSubmit} onChange={handleFormChange}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-semibold mb-2">Your Name</label>
        <input type="text" id="name" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="nic" className="block text-lg font-semibold mb-2">Your NIC</label>
        <input type="text" id="name" className="w-full p-2 border rounded" value={nic} onChange={(e) => setNIC(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-semibold mb-2">Email Address</label>
        <input type="email" id="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-lg font-semibold mb-2">Message</label>
        <textarea id="message" className="w-full p-2 border rounded" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <button type="submit"
        className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex sm:w-full contact-mailBtn items-center justify-center px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-lg w-1/5 border mr-10 border-transparent shadow-sm hover:bg-white hover:text-white "
        style={{ backgroundColor: "#e84118" }}
        disabled={!isFormFilled} >
        Send Message
      </button>
    </form>
  );
};



export default function ContactUs() {
  return (

    <div>
      <section class="py-16 bg-gray-100 font-poppins dark:bg-gray-900">
        <div class="justify-center flex-1 max-w-5xl px-4 py-4 mx-auto lg:py-10 md:px-7">
          <div class="max-w-xl mx-auto">
            <div class="text-center ">
              <div class="relative flex flex-col items-center">
                <div
                  class="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-400 font-bold opacity-10">
                  Contact
                </div>
                <h1 class="text-5xl font-bold dark:text-white"> Our <span class="text-orange-500"> Contact
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
              <p class="mb-16 text-base text-center text-gray-500">
                <p class="mb-16 text-base text-center text-gray-500">
                  Elevate your experience with VGO. 
                  We believe in creating seamless connections. 
                  Contact us today to embark on a journey of innovation and excellence with VGO.
                </p>

              </p>
            </div>
          </div>
          <div class="flex flex-wrap mb-8 -mx-4">
            <div class="w-full px-4 mb-4 lg:w-1/3 lg:mb-0">
              <div
                class="h-full py-12 text-center transition-all rounded-lg shadow dark:bg-gray-800 bg-gray-50 hover:shadow-lg">
                <div
                  class="inline-flex items-center justify-center w-12 h-12 mb-6 text-gray-100 bg-orange-500 rounded-full dark:bg-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-envelope" viewBox="0 0 16 16">
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z">
                    </path>
                  </svg>
                </div>
                <h2 class="mb-4 text-xl font-bold leading-9 text-gray-700 md:text-2xl dark:text-gray-400">
                  Email</h2>
                <a href="#"
                  class="text-base font-medium text-gray-500 md:text-lg dark:text-gray-400">vigouerholdings@gmail.com</a>
              </div>
            </div>
            <div class="w-full px-4 mb-4 lg:w-1/3 lg:mb-0">
              <div
                class="h-full py-12 text-center transition-all rounded-lg shadow dark:bg-gray-800 bg-gray-50 hover:shadow-lg">
                <div
                  class="inline-flex items-center justify-center w-12 h-12 mb-6 text-gray-100 bg-orange-500 rounded-full dark:bg-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-telephone" viewBox="0 0 16 16">
                    <path
                      d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z">
                    </path>
                  </svg>
                </div>
                <h2 class="mb-4 text-xl font-bold leading-9 text-gray-700 md:text-2xl dark:text-gray-400">
                  Phone</h2>
                <a href="#"
                  class="text-base font-medium text-gray-500 md:text-lg dark:text-gray-400">+94777034524</a>
              </div>
            </div>
            <div class="w-full px-4 mb-4 lg:w-1/3 lg:mb-0">
              <div
                class="h-full py-12 text-center transition-all rounded-lg shadow dark:bg-gray-800 bg-gray-50 hover:shadow-lg">
                <div
                  class="inline-flex items-center justify-center w-12 h-12 mb-6 text-gray-100 bg-orange-500 rounded-full dark:bg-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-grid-3x3" viewBox="0 0 16 16">
                    <path
                      d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4h4V6H6v4zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5v-4zm1 0v4h4v-4H6zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11v4zm-1 0V1H6v4h4z">
                    </path>
                  </svg>
                </div>
                <h2 class="mb-4 text-xl font-bold leading-9 text-gray-700 md:text-2xl dark:text-gray-400">
                  Social</h2>
                <a href="https://www.facebook.com/profile.php?id=61552658554263&mibextid=LQQJ4d"
                  class="inline-block mr-4 text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 hover:text-orange-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="w-6 h-6 bi bi-facebook" viewBox="0 0 16 16">
                    <path
                      d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z">
                    </path>
                  </svg>
                </a>
                <a href="https://wa.me/+94777034524"
                  class="inline-block mr-4 text-orange-400 dark:text-orange-400 dark:hover:text-orange-300 hover:text-orange-600">
                  <i className='fab fa-whatsapp socialIconFont'></i>
                </a>
                <a href="https://www.instagram.com/vgoholdings/"
                  class="inline-block mr-4 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                  <i className='fab fa-instagram socialIconFont'></i>
                </a>
                <a href="https://www.youtube.com/channel/UCP0Xr5X-AbJnb0Kjk8B26vw"
                  class="inline-block mr-4 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                  <i className='fab fa-telegram socialIconFont'></i>
                </a>
                <a href="https://www.tiktok.com/@vgoonlinestore?_t=8gq3Qcer1ak&_r=1"
                  class="inline-block mr-4 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                  <i className='fab fa-tiktok socialIconFont'></i>
                </a>
              </div>
            </div>

          </div>
          <div class="px-8 py-8 bg-white border rounded-md shadow-md dark:border-gray-800 dark:bg-gray-800">
            <form action="">
              <div class="mb-6">
                <h2 class="text-xl font-bold text-gray-00 dark:text-gray-400">
                  Please send message for futher information! </h2>
              </div>
              <div class="flex flex-wrap mb-4 -mx-2">
                <div class="w-full px-2 mb-4 lg:mb-0 lg:w-1/2">
                  <input
                    class="w-full px-3 py-2 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                    type="text" placeholder="Name.." required="true" />
                </div>
                <div class="w-full px-2 lg:w-1/2">
                  <input
                    class="w-full px-3 py-2 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                    type="text" placeholder="NIC.." required="true" />
                </div>
              </div>
              <input
                class="w-full px-3 py-2 mb-4 leading-loose border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                type="email" placeholder="abc@gmail.com" required="true" />
              <textarea rows="4" type="message" placeholder="Write a message..." required="true"
                class="block w-full px-4 mb-4 leading-tight text-gray-700 border rounded bg-gray-50 dark:placeholder-gray-400 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-700 "></textarea>
              <button
                class="w-full py-4 text-sm font-bold leading-normal text-white transition-all duration-300 bg-orange-600 rounded-md dark:bg-orange-500 dark:hover:bg-orange-600 hover:bg-orange-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>

    // <main className="flex min-h-screen flex-col items-center justify-between   md:p-12 text-black">
    //   <div className=" w-full">

    //     <div className='contact-detailsContainer'>
    //       <div className='contact-dataContainer'>
    //         <div className='contact-mapContainer relative'>
    //           <h1
    //             className=" font-bold  text-4xl mb-8 "
    //             style={{ zIndex: '5', color: "#2F3640", fontSize: '2.5rem', textAlign: 'left' }}
    //           >
    //             Contact <span style={{ color: "#e84118" }}>Details </span>
    //           </h1>
    //           <GoogleMapComponent center={mapCenter} zoom={mapZoom} />
    //           <div className='contact-contactDataContainer'>
    //             <div div className="container mx-auto">

    //               <div className="contact-contactDataGride">
    //                 <div className=' mb-4'>
    //                   <h3 className="text-lg font-semibold">Address</h3>
    //                   <p style={{ color: "#e84118" }}>Your Company Address</p>
    //                 </div>
    //                 <div className='mb-4 '>
    //                   <h3 className="text-lg font-semibold">Email</h3>
    //                   <p style={{ color: "#e84118" }}>vigouerholdings@gmail.com</p>
    //                 </div>
    //                 <div className=' mb-4'>
    //                   <h3 className="text-lg font-semibold">Phone</h3>
    //                   <p style={{ color: "#e84118" }}>+94777034524</p>
    //                 </div>
    //                 <div className=' mb-4'>
    //                   <h3 className="text-lg font-semibold">Hours</h3>
    //                   <p style={{ color: "#e84118" }}>Mon-Fri: 9:00 AM - 5:00 PM</p>
    //                 </div>
    //               </div>

    //             </div>

    //           </div>
    //         </div>
    //         <div className="container  contact-emailContainer" >
    //           <h1 className=" font-bold  text-4xl mb-8 "
    //             style={{ zIndex: '5', color: "#2F3640", fontSize: '2.5rem', textAlign: 'left' }}>Send Us <span style={{ color: "#e84118" }}>a Message </span></h1>
    //           <div className='p-2 md:p-8'>
    //             <ContactForm />
    //           </div>
    //           <div className="contact-socialContainer">
    //             <a href="https://www.facebook.com/profile.php?id=61552658554263&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className=" socialIcon">
    //               <i className='fab fa-facebook socialIconFont'></i>
    //             </a>
    //             <a href="https://www.instagram.com/vgoholdings/" target="_blank" rel="noopener noreferrer" className="  socialIcon">
    //               <i className='fab fa-instagram socialIconFont'></i>
    //             </a>
    //             <a href="https://www.youtube.com/channel/UCP0Xr5X-AbJnb0Kjk8B26vw" target="_blank" rel="noopener noreferrer" className="socialIcon">
    //               <i className='fab fa-telegram socialIconFont'></i>
    //             </a>
    //             <a href="https://www.tiktok.com/@vgoonlinestore?_t=8gq3Qcer1ak&_r=1" target="_blank" rel="noopener noreferrer" className="socialIcon">
    //               <i className='fab fa-tiktok socialIconFont'></i>
    //             </a>
    //             <a href="https://wa.me/+94777034524" target="_blank" rel="noopener noreferrer" className="socialIcon">
    //               <i className='fab fa-whatsapp socialIconFont'></i>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
}
