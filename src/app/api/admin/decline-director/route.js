import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Pendinguser from "@/models/pending-user";
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
          message: "Director ID is required",
        });

      const deletedDirector = await Pendinguser.findByIdAndDelete(id);

      if (deletedDirector) {
        return NextResponse.json({
          success: true,
          message: "Director deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete the director! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated as an admin",
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