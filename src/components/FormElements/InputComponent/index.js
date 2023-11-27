import { useState } from "react";

export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <p className=" pt-0 pr-2 pb-1 pl-2  mt-3 mr-0 mb-0  text-lg text-gray-600  ">
        {label}
      </p>
      {type == 'password' ? (
        <div className=" relative flex"> 
          <input
            placeholder={placeholder}
            type={showPassword? "text" : "password" }
            value={value}
            onChange={onChange}
            className="border transition duration-150 ease-in-out  placeholder-gray-400 focus:outline-none   w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
            style={{borderRight:'0px',borderTopRightRadius:'0px',borderBottomRightRadius:'0px'}}
         />
          <button className="px-6 bg-white transition duration-150 ease-in-out py-2 hover:bg-gray  " style={{border:'1px solid #d1d5db',borderTopRightRadius:'8px',borderBottomRightRadius:'8px', color: "#2F3640" }} onClick={() => setShowPassword(!showPassword)}> <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye color"} ></i></button>
      </div>
      ):(
        <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none   w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      />
      ) }
    </div>
  );
}
