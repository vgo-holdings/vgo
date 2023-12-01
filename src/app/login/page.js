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
    <div className="login-section"> 
            <div className="login-formContainer ">
              <p className="w-full text-4xl font-medium text-center font-arial login_formheader">
                Sign In
              </p>
              <div className="w-full mt-4 mr-0 mb-0 ml-0 relative space-y-8">
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
                <div className="w-full flex items-center justify-center pt-6">
                  <button
                    className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-lg w-1/2 border mr-10 border-transparent shadow-sm hover:bg-white hover:text-white focus:outline-none"
                    style={{ backgroundColor: "#e84118" }}
                    disabled={!isValidForm()}
                    onClick={handleLogin} 
                  >
                    {componentLevelLoader && componentLevelLoader.loading ? (
                     <>
                     <ComponentLevelLoader 
                        text={"Signing In"}
                        color={"#ffffff"}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                     
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                   
                  <button
                    className="inline-flex items-center justify-center bg-white px-6 py-4 text-lg  rounded-lg w-1/2 border
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                    onClick={() => router.push("/register/customer-register")}
                    style={{ color: "#e84118", borderColor: "#e84118" }}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="flex flex-col ">
                  {/* <p className="text-xm text-gray-800  font-bold font-arial">New to website ?</p> */}
                  <div className="w-full flex items-center justify-center">
                  
                  </div>
                </div>
              </div>
            </div> 
      <Notification />
    </div>
  );
}
