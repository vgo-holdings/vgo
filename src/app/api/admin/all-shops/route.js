import connectToDB from "@/database";
import Shop from "@/models/shop";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

      const extractAllshops = await Shop.find({});

      if (extractAllshops) {
        return NextResponse.json({
          success: true,
          data: extractAllshops,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No Shops found",
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
