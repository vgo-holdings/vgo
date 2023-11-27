import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Shop from "@/models/shop";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();
      const {
        _id,
        name,
        price,
        description1,
        description2,
        description3,
        description4,
        description5,
        description6,
        category,
        imageUrl,
      } = extractData;

      const updatedShop = await Shop.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
          price,
          description1,
          description2,
          description3,
          description4,
          description5,
          description6,
          category,
          imageUrl,
        },
        { new: true }
      );

      if (updatedShop) {
        return NextResponse.json({
          success: true,
          message: "Shop updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update the shop ! Please try again later",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
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
