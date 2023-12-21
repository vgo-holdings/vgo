"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import './page-style.css';

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });

    // Convert email to lowercase
    const lowercaseEmail = formData.email.toLowerCase();

    // Use the lowercase email in the login function
    const res = await login({ ...formData, email: lowercaseEmail });

    console.log(res);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center ">
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center w-full">
        <div className="relative py-3 sm:max-w-10 mx-auto ">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl rounded-2xl rounded border-2 border-white">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl rounded-2xl sm:p-20" >
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-4xl font-semibold text-black flex justify-center">Sign In</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {loginFormControls.map((controlItem, key) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        key={key}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={formData[controlItem.id]}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                      />
                    ) : null
                  )}
                  {/* <div className="relative">
                    <button className="text-white rounded-md px-2 py-2" style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}>Submit</button>
                  </div> */}
                  <div class="flex -mx-3">
                    <div class="w-full px-3 mt-5">
                      <button
                        style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                        class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
                        disabled={!isValidForm()}
                        onClick={handleLogin}
                      >
                        SIGN IN
                      </button>
                    </div>
                  </div>
                  <div class="text-center">
                    <p class="text-sm">Don't have an account? <a href="/register/customer-register" class="text-cyan-600">Sign Up</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>

    // <div className="login-section"> 
    //         <div className="login-formContainer ">
    //           <p className="w-full text-4xl font-medium text-center font-arial login_formheader">
    //             Sign In
    //           </p>
    //           <div className="w-full mt-4 mr-0 mb-0 ml-0 relative space-y-8">
    //             {loginFormControls.map((controlItem, key) =>
    //               controlItem.componentType === "input" ? (
    //                 <InputComponent
    //                   key={key}
    //                   type={controlItem.type}
    //                   placeholder={controlItem.placeholder}
    //                   label={controlItem.label}
    //                   value={formData[controlItem.id]}
    //                   onChange={(event) => {
    //                     setFormData({
    //                       ...formData,
    //                       [controlItem.id]: event.target.value,
    //                     });
    //                   }}
    //                 />
    //               ) : null
    //             )}
    //             <div className="w-full flex items-center justify-center pt-6">
    //               <button
    //                 className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-4 text-lg 
    //                  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-lg w-1/2 border mr-10 border-transparent shadow-sm hover:bg-white hover:text-white focus:outline-none"
    //                 style={{ backgroundColor: "#e84118" }}
    //                 disabled={!isValidForm()}
    //                 onClick={handleLogin} 
    //               >
    //                 {componentLevelLoader && componentLevelLoader.loading ? (
    //                  <>
    //                  <ComponentLevelLoader 
    //                     text={"Signing In"}
    //                     color={"#ffffff"}
    //                     loading={
    //                       componentLevelLoader && componentLevelLoader.loading
    //                     }
    //                   />

    //                   </>
    //                 ) : (
    //                   "Sign In"
    //                 )}
    //               </button>

    //               <button
    //                 className="inline-flex items-center justify-center bg-white px-6 py-4 text-lg  rounded-lg w-1/2 border
    //                  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
    //                  "
    //                 onClick={() => router.push("/register/customer-register")}
    //                 style={{ color: "#e84118", borderColor: "#e84118" }}
    //               >
    //                 Sign Up
    //               </button>
    //             </div>
    //             <div className="flex flex-col ">
    //               {/* <p className="text-xm text-gray-800  font-bold font-arial">New to website ?</p> */}
    //               <div className="w-full flex items-center justify-center">

    //               </div>
    //             </div>
    //           </div>
    //         </div> 
    //   <Notification />
    // </div>
  );
}
