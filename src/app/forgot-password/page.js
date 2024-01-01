"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { forgotPasswordFormControls, loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword, msgTest, resetPassword } from "@/services/login";
import { Changa } from "next/font/google";

const initialFormdata = {
    phone: "",
    nic: "",
};

export default function ForgotPassword() {
    const [formData, setFormData] = useState(initialFormdata);
    const [showOtp, setShowOtp] = useState(false)
    const [showOtpCode, setShowOtpCode] = useState("")
    const [showReset, setShowReset] = useState(false)
    const [userEmail, setUserEmail] = useState("")
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
            formData.phone &&
            formData.phone.trim() !== "" &&
            formData.nic &&
            formData.nic.trim() !== ""
            ? true
            : false;
    }

    const [loading, setLoading] = useState(false);
    function generateOTP() {
        const otp = Math.floor(10000000 + Math.random() * 90000000);
        return otp.toString();
    }

    async function handleLogin() {
        console.log("🚀 ~ file: page.js:53 ~ handleLogin ~ formData:", formData)
        const validate = await forgotPassword(formData.nic, formData.phone);
        console.log("🚀 ~ file: page.js:57 ~ handleLogin ~ validate:", validate)
        if (validate.success) {
            setUserEmail(validate.checkUser.email);
            const convertedNumber = `94${formData.phone.slice(1)}`;
            const otpcode = generateOTP()
            console.log("🚀 ~ file: page.js:62 ~ handleLogin ~ otpcode:", otpcode)
            setShowOtpCode(otpcode);
            const msg = "your password reset OTP: " + otpcode
            const res = await msgTest(msg, convertedNumber);
            if (res.status != "success") {
                toast.error("OTP didnt send, Contact us", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                setShowOtp(!showOtp);
            }
            // setShowOtp(!showOtp);
        } else {
            console.log("🚀 ~ file: page.js:57 ~ handleLogin ~ validate:", validate)
            toast.error("Your NIC and Phone number didnt Match,", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }

    async function validateOTP() {
        if (formData.otp == showOtpCode) {
            console.log("🚀 ~ file: page.js:53 ~ handleLogin ~ formData:", formData)
            console.log("🚀 ~ file: page.js:57 ~ handleLogin ~ otpcode:", showOtpCode)
            setShowReset(true);
        } else {
            toast.error("OTP Validation Failed", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }

    async function changaPassword() {
        console.log("🚀 ~ file: page.js:53 ~ handleLogin ~ formData:", formData)
        const res = await resetPassword(formData.nic, formData.password)
        console.log("🚀 ~ file: page.js:97 ~ changaPassword ~ res:", res)
        // setShowOtp(false);
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            router.push("/login");
        } else {
            toast.error(res.message, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            router.push("/login");
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
                                <h1 className="text-4xl font-semibold text-black flex justify-center text-center">Forgot Password</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {!showOtp ? (
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        {forgotPasswordFormControls.map((controlItem, key) =>
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
                                        <div class="flex -mx-3">
                                            <div class="w-full px-3 mt-5">
                                                <button
                                                    style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                                                    class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
                                                    disabled={!isValidForm() || loading}
                                                    onClick={handleLogin}
                                                >
                                                    Reset Password
                                                </button>
                                            </div>
                                        </div>
                                        {/* <div class="text-center">
                                        <p class="text-sm">Didn't receive OTP code? <a href="" class="text-cyan-600">contact us</a></p>
                                    </div> */}
                                    </div>) :
                                    !showReset && showOtp ?
                                        (<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <InputComponent
                                                key={0}
                                                type={"text"}
                                                placeholder={"Enter OTP"}
                                                label={"OTP"}
                                                // value={formData[controlItem.id]}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        otp: event.target.value,
                                                    });
                                                }}
                                            />
                                            <div class="flex -mx-3">
                                                <div class="w-full px-3 mt-5">
                                                    <button
                                                        style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                                                        class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
                                                        // disabled={!isValidForm() || loading}
                                                        onClick={validateOTP}
                                                    >
                                                        Reset Password
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <p class="text-sm">Didn't receive OTP code? <a href="" class="text-cyan-600">contact us</a></p>
                                            </div>
                                        </div>) :
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            {loginFormControls.map((controlItem, key) =>
                                                controlItem.componentType === "input" ? (
                                                    <InputComponent
                                                        key={key}
                                                        type={controlItem.type}
                                                        placeholder={controlItem.label == "Email" ? userEmail : controlItem.placeholder}
                                                        label={controlItem.label}
                                                        value={formData[controlItem.id]}
                                                        disabled={controlItem.label == "Email" ? true : false}
                                                        onChange={(event) => {
                                                            setFormData({
                                                                ...formData,
                                                                [controlItem.id]: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                ) : null
                                            )}

                                            <div class="flex -mx-3">
                                                <div class="w-full px-3 mt-5">
                                                    <button
                                                        style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                                                        class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
                                                        // disabled={!isValidForm() || loading}
                                                        onClick={changaPassword}
                                                    >
                                                        Reset Password
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
}
