import { useState } from "react";

export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <p className=" text-m font-semibold px-1">
        {label}
      </p>
      {type == 'password' ? (
        <div class="relative flex">
          <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
          {/* <div className=" relative flex"> */}
          <input
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            className="w-full -ml-8 lg:-ml-9 pl-5 lg:pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-orange-400 text-sm lg:text-lg"
            style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
          />
          <button className="px-4 bg-white transition duration-150 ease-in-out py-2 hover:bg-gray  " style={{ border: '1px solid #d1d5db', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', color: "#2F3640" }} onClick={() => setShowPassword(!showPassword)}> <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye color"} ></i></button>
          {/* </div> */}
        </div>
      ) : (
        <div class="flex">
          <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
          <input
            placeholder={placeholder}
            type={type || "text"}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full -ml-10 pl-5 lg:pl-10 pr-1 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-orange-400 text-sm lg:text-lg"
          />
        </div>
      )}
    </div>
  );
}
