import connectToDB from "@/database";
import Shop from "@/models/shop";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get("id");

    if (!shopId) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Shop id is required",
      });
    }
    const getData = await Shop.find({ _id: shopId });

    if (getData && getData.length) {
      return NextResponse.json({ success: true, data: getData[0] });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Shop found",
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
