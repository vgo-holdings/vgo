import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();

    const { nic, phoneNumber } = await req.json();

    try {
        const checkUser = await User.findOne({ $and: [{ "nic": nic }, { "phone": phoneNumber }] },{phone:1});
        console.log("🚀 ~ file: route.js:12 ~ POST ~ checkUser:", checkUser)
        if (checkUser){
            return NextResponse.json({
                success: true,
                message: "Verify",
                checkUser,
            });
        } else{
            return NextResponse.json({
                success: false,
                message: "error",
            });
        }
        

    } catch (error) {
        console.log("🚀 ~ file: route.js:20 ~ POST ~ error:", error)
        return NextResponse.json({
            success: false,
            message: "error",
        });
    }
        

    
}