"use client";

import { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import './page-style.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can implement form submission logic here, e.g., send data to an API or handle it in your Next.js backend.
    };
    return (
        <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-semibold mb-2">Your Name</label>
        <input type="text" id="name" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-semibold mb-2">Email Address</label>
        <input type="email" id="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-lg font-semibold mb-2">Message</label>
        <textarea id="message" className="w-full p-2 border rounded" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <button type="submit" className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex sm:w-full contact-mailBtn items-center justify-center px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-lg w-1/5 border mr-10 border-transparent shadow-sm hover:bg-white hover:text-white " style={{backgroundColor: "#e84118"}}>Send Message</button>
    </form>
    );
  };

  const GoogleMapComponent = ({ center, zoom }) => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    return (
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap center={center} zoom={zoom} mapContainerStyle={{ width: '100%', height: '400px' }}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    );
  };
  

export default function ContactUs() {
    const mapCenter = {lat :7.3018 , lng:81.6747 };
    const mapZoom = 13;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between   md:p-12 text-black">
        <div className=" w-full"> 

        <div className='contact-detailsContainer'>
          <div className='contact-dataContainer'>
            <div className='contact-mapContainer relative'>  
            <h1
                className=" font-bold  text-4xl mb-8 "
                style={{zIndex:'5', color: "#2F3640",  fontSize:'2.5rem',textAlign:'left'}}
              >
                Contact <span style={{ color: "#e84118" }}>Details </span>
              </h1>
                <GoogleMapComponent center={mapCenter} zoom={mapZoom} /> 
                <div className='contact-contactDataContainer'>
                <div div className="container mx-auto">
              
                <div className="contact-contactDataGride">
                  <div className=' mb-4'>
                    <h3 className="text-lg font-semibold">Address</h3>
                    <p style={{ color: "#e84118" }}>Your Company Address</p>
                  </div>
                  <div className='mb-4 '>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p style={{ color: "#e84118" }}>vigouerholdings@gmail.com</p>
                  </div>
                  <div className=' mb-4'>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p style={{ color: "#e84118" }}>+94777034524</p>
                  </div>
                  <div className=' mb-4'>
                    <h3 className="text-lg font-semibold">Hours</h3>
                    <p style={{ color: "#e84118" }}>Mon-Fri: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                
              </div>
          
            </div>
             </div>
             <div className="container  contact-emailContainer" >
                <h1 className=" font-bold  text-4xl mb-8 "
                style={{zIndex:'5', color: "#2F3640",  fontSize:'2.5rem',textAlign:'left'}}>Send Us <span style={{ color: "#e84118" }}>a Message </span></h1>
                <div className='p-2 md:p-8'>
                <ContactForm />
                </div>
                <div className="contact-socialContainer">
                  <a href="https://www.facebook.com/profile.php?id=61552658554263&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className=" socialIcon">
                     <i className='fab fa-facebook socialIconFont'></i>
                  </a>
                  <a href="https://www.instagram.com/vgoholdings/" target="_blank" rel="noopener noreferrer" className="  socialIcon">
                     <i className='fab fa-instagram socialIconFont'></i>
                  </a>
                  <a href="https://www.youtube.com/channel/UCP0Xr5X-AbJnb0Kjk8B26vw" target="_blank" rel="noopener noreferrer" className="socialIcon">
                     <i className='fab fa-twitter socialIconFont'></i>
                  </a>
                  <a href="https://www.tiktok.com/@vgoonlinestore?_t=8gq3Qcer1ak&_r=1" target="_blank" rel="noopener noreferrer" className="socialIcon">
                    <i className='fab fa-tiktok socialIconFont'></i>
                  </a>
                  <a href="https://wa.me/+94777034524" target="_blank" rel="noopener noreferrer" className="socialIcon">
                    <i className='fab fa-whatsapp socialIconFont'></i>
                  </a>
                </div>
              </div>
            </div>
          <div>
        </div>
      </div> 
    </div>
  </main>
  );
}
