import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

      const extractAllusers = await User.find({});

      if (extractAllusers) {
        return NextResponse.json({
          success: true,
          data: extractAllusers,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No Users found",
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
