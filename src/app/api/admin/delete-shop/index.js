import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Shop from "@/models/shop";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Shop ID is required",
        });

      const deletedShop = await Shop.findByIdAndDelete(id);

      if (deletedShop) {
        return NextResponse.json({
          success: true,
          message: "Shop deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete the shop ! Please try again",
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
