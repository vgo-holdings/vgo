import connectToDB from "@/database";
import userLog from "@/models/userLog";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
    console.log("im in user log");
    try {
        await connectToDB();
        const extractData = await req1.json();
        console.log("🚀 ~ file: route.js:11 ~ PUT ~ extractData:", extractData)

        const {
            user_id,
        } = extractData;
        console.log("🚀 ~ file: route.js:15 ~ PUT ~ _id:", user_id)

        const extractApprovedDeposits = await userLog.find({
            userId: user_id,
        },{});
        console.log("🚀 ~ file: route.js:19 ~ PUT ~ extractApprovedDeposits:", extractApprovedDeposits)
        if (extractApprovedDeposits) {
            return NextResponse.json({
                success: true,
                message: "Success",
                extractApprovedDeposits,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again later",
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later",
        });
    }
}