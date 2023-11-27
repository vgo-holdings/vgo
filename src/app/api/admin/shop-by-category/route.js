import connectToDB from "@/database";
import Shop from "@/models/shop";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const getData = await Shop.find({ category: id });

    if (getData) {
      return NextResponse.json({
        success: true,
        data: getData,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Shops found !",
      });
    }
  } catch (e) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
