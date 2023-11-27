import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Class_data from "@/models/class_datas";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      console.log(id, "wadada id")
      const extractAllClasses = await Class_data.find({ _id: id })

      if (extractAllClasses) {
        return NextResponse.json({
          success: true,
          data: extractAllClasses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get class by id ! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authticated",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
