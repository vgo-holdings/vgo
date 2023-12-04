import connectToDB from "@/database";
import Bankdeposit from "@/models/bankdeposit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
  try {
    await connectToDB();
    const extractData = await req1.json();

    const {
      _id,
    } = extractData;

    // Find the deposit with the specified _id
    const depositToUpdate = await Bankdeposit.findOneAndUpdate(
      { _id: _id },
      {
        approved: true,
      },
      { new: true }
    );

    if (depositToUpdate) {
      return NextResponse.json({
        success: true,
        message: "Deposit Approved",
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No deposit found with the specified _id",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
