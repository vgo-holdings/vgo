import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Bankdeposit from "@/models/bankdeposit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "hr") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Director ID is required",
        });

      const deletedDeposit = await Bankdeposit.findByIdAndDelete(id);

      if (deletedDeposit) {
        // handel log delete
        return NextResponse.json({
          success: true,
          message: "Deposit decline successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to decline the deposit! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated as an hr",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}