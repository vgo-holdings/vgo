import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Class_data from "@/models/class_datas";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "hr") {
      const getAllClasses = await Class_data.find({})

      if (getAllClasses) {
        return NextResponse.json({
          success: true,
          data: getAllClasses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "failed to fetch the classes ! Please try again after some time.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not autorized !",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
