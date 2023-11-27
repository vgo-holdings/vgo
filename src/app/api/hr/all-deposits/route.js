import connectToDB from "@/database";
import Bankdeposit from "@/models/bankdeposit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

      const extractAlldeposits = await Bankdeposit.find({});

      if (extractAlldeposits) {
        return NextResponse.json({
          success: true,
          data: extractAlldeposits,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No Products found",
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
