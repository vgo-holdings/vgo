"use client";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";

export default function TimerProfile() {
    const {
        user,
      } = useContext(GlobalContext);

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });


    const calculateTimeLeft = () => {
        const createdAt = new Date(user?.createdAt);

        // Calculate expiration date based on user role
        let expireDate;
        if (user?.role === "freelancer") {
            // Freelancer countdown expires after 15 days
            expireDate = new Date(createdAt);
            expireDate.setDate(createdAt.getDate() + 15);
        } else if (user?.role === "member") {
            // Member countdown expires after 365 days
            expireDate = new Date(createdAt);
            expireDate.setDate(createdAt.getDate() + 365);
        } else {
            // No countdown for other roles
            return;
        }

        const currentDate = new Date();
        const timeLeft = expireDate.getTime() - currentDate.getTime();

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }
    };

    useEffect(() => {
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="relative px-4" >
            <div className="flex flex-row space-x-4 my-4">
                <div className="flex flex-col w-20   ">
                    <h1
                        className="text-md text-center text-white"
                        style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                        Days
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                        <div className="flex items-center justify-center h-full">
                            <div
                                className="text-center text-3xl font-semibold"
                                style={{ color: "#e84118" }}
                            >
                                {countdown.days < 10
                                    ? `0${countdown.days}`
                                    : countdown.days}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-20  ">
                    <h1
                        className="text-md text-center text-white"
                        style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                        Hours
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                        <div className="flex items-center justify-center h-full">
                            <div
                                className="text-center text-3xl font-semibold"
                                style={{ color: "#e84118" }}
                            >
                                {countdown.hours < 10
                                    ? `0${countdown.hours}`
                                    : countdown.hours}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-20">
                    <h1
                        className="text-md text-center text-white"
                        style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                        Mins.
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                        <div className="flex items-center justify-center h-full">
                            <div
                                className="text-center text-3xl font-semibold"
                                style={{ color: "#e84118" }}
                            >
                                {countdown.minutes < 10
                                    ? `0${countdown.minutes}`
                                    : countdown.minutes}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-20">
                    <h1
                        className="text-md text-center text-white"
                        style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                        Secs.
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                        <div className="flex items-center justify-center h-full">
                            <div
                                className="text-center text-3xl font-semibold"
                                style={{ color: "#e84118" }}
                            >
                                {countdown.seconds < 10
                                    ? `0${countdown.seconds}`
                                    : countdown.seconds}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}