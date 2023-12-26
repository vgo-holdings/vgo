import connectToDB from "@/database";
import User from "@/models/user";
import userLog from "@/models/userLog";
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
    console.log("🚀 ~ file: route.js:19 ~ PUT ~ imageURL:", imageURL)

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        imageURL,
      },
      {
        new: false,
        timestamps: false
      }
    );

    console.log(updatedUser.imageURL, "why this");
    const checkUser = await User.findOne({ _id:user_id });
    console.log("🚀 ~ file: route.js:34 ~ PUT ~ checkUser:", checkUser)
    // console.log(checkUser.imageURL, "why this");

    if (updatedUser) {
      if (updatedUser.class_name !== "") {
        const extractAllClasses = await Class_data.find({ _id: updatedUser.class_name });
        finalData = {
          user: {
            email: updatedUser.email,
            name: updatedUser.name,
            _id: updatedUser._id,
            role: updatedUser.role,
            imageURL: checkUser.imageURL,
            createdAt: updatedUser.createdAt,
            class_name: extractAllClasses[0]?.name,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            phone: updatedUser.phone,
            whatsapp: updatedUser.whatsapp,
            district: updatedUser.district,
            city: updatedUser.city,
            facebookURL: updatedUser.facebookURL,
            youtubeURL: updatedUser.youtubeURL,
            aboutMe: updatedUser.aboutMe,
            profit: updatedUser.profit,
            memberCount: updatedUser.memberCount,
          },
        };
      } else {
        finalData = {
          user: {
            email: updatedUser.email,
            name: updatedUser.name,
            _id: updatedUser._id,
            role: updatedUser.role,
            imageURL: checkUser.imageURL,
            createdAt: updatedUser.createdAt,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            phone: updatedUser.phone,
            whatsapp: updatedUser.whatsapp,
            district: updatedUser.district,
            city: updatedUser.city,
            facebookURL: updatedUser.facebookURL,
            youtubeURL: updatedUser.youtubeURL,
            aboutMe: updatedUser.aboutMe,
            profit: updatedUser.profit,
            memberCount: updatedUser.memberCount,
          },
        };
      }
      const newLog = await userLog.create(
        {
          userId:updatedUser._id,
          description:"You changed the profile image",
        }
      )
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
