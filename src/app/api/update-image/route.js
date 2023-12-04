import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
  try {
    await connectToDB();
    const extractData = await req1.json();
    console.log(extractData, "asdasdasdasdass");

    const {
      user_id,
      imageURL,
    } = extractData;

     const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        {
          imageURL,
        },
        { new: true }
      );

    console.log(updatedUser, "why this");

    if (updatedUser) {
      return NextResponse.json({
        success: true,
        message: "Success",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update! Please try again later",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}