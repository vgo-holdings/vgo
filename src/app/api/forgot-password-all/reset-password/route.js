import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDB();

    const { nic, password } = await req.json();


    try {
        const hashPassword = await hash(password, 12);

        const updatedUser = await User.findOneAndUpdate(
            { nic: nic },
            {
                password: hashPassword,
            },
            {
                new: false,
                timestamps: false
            }
        );

        if (updatedUser) {
            return NextResponse.json({
                success: true,
                message: "Password changed successfully.",
            });
        }

    } catch (error) {
        console.log("Error while Password changed. Please try again");

        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}