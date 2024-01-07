import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("id");

        if (!userId) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "userId id is required",
            });
        }
        const getData = await User.find({ _id: userId },{name:1});

        if (getData && getData.length) {
            return NextResponse.json({ success: true, data: getData[0] });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No Product found",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}
