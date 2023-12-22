import connectToDB from "@/database";
import Class_data from "@/models/class_datas";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    console.log("hh");
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀 ~ file: route.js:15 ~ GET ~ userId:", extractData)
    // const { _id } = await req.json();

    try {
        const checkUser = await User.find({ refkey: extractData.user_id }, { name: 1, imageURL: 1, role: 1, _id: 1 });
        console.log("🚀 ~ file: route.js:18 ~ POST ~ checkUser:", checkUser)

        return NextResponse.json({
            success: true,
            message: "Got Connection data",
            checkUser,
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error",
        });
    }
}