import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
  let finalData;
  
  try {
    await connectToDB();
    const extractData = await req1.json();
    console.log(extractData, "asdasdasdasdass");

    const {
      user_id,
      imageURL,
    } = extractData;

     const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        {
          imageURL,
        },
        { 
            new: false,
            timestamps:false
        }
      );

    console.log(updatedUser, "why this");

    if (updatedUser) {
      if (updatedUser.class_name !== "") {
        const extractAllClasses = await Class_data.find({ _id: updatedUser.class_name });
        finalData = {
          user: {
            email: updatedUser.email,
            name: updatedUser.name,
            _id: updatedUser._id,
            role: updatedUser.role,
            imageURL: updatedUser.imageURL,
            createdAt: updatedUser.createdAt,
            class_name: extractAllClasses[0]?.name,
          },
        };
      } else {
        finalData = {
          user: {
            email: updatedUser.email,
            name: updatedUser.name,
            _id: updatedUser._id, 
            role: updatedUser.role,
            imageURL: updatedUser.imageURL,
            createdAt: updatedUser.createdAt,
          },
        };
      }

      return NextResponse.json({
        success: true,
        message: "Success",
        finalData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update! Please try again later",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
