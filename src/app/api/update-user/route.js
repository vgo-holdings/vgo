import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
  try {
    await connectToDB();
      const extractData = await req1.json();
      const {
        id,
        freelancerCount,
        shopCount,
        role,
      } = extractData;

const updatedUser = await User.findOneAndUpdate(
          { _id: id },
          {
            freelancerCount,
            shopCount,
            role,
          },
          { new: true }
        );

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
    console.error(error); // Corrected variable name
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
