import connectToDB from "@/database";
import { hash } from "bcryptjs";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
  try {
    await connectToDB();
    const extractData = await req1.json();
    console.log(extractData, "asdasdasdasdass");

    const {
      _id,
      imageURL,
      name,
      email,
      password,
      role,
      city,
      phone,
      whatsapp,
      facebookURL,
      youtubeURL,
      refkey,
    } = extractData;
    
    const lowercasedEmail = email.toLowerCase();
    const hashPassword = await hash(password, 12);
    let existsUser;

    console.log(extractData, "refkey");

    if (refkey !== undefined) {
      existsUser = await User.findOne({ _id: refkey });
      console.log(existsUser, "user exists");
    }

    console.log("id:", _id);
    console.log("refkey:", refkey);
    console.log("existsUser:", existsUser);

    let updatedUser;

    if (_id !== refkey && existsUser) {
      updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        {
          imageURL,
          name,
          email: lowercasedEmail,
          password: hashPassword,
          role,
          city,
          phone,
          whatsapp,
          facebookURL,
          youtubeURL,
          refkey,
        },
        { 
          new: false,
          timestamps:false
        }
      );
    } else if(_id !== refkey) {
      updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        {
          imageURL,
          name,
          email: lowercasedEmail,
          password: hashPassword,
          role,
          city,
          phone,
          whatsapp,
          facebookURL,
          youtubeURL,
        },
        { 
          new: false,
          timestamps:false
        }
      );
    }

    console.log(updatedUser, "why this");

    if (updatedUser) {
      return NextResponse.json({
        success: true,
        message: "Success",
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
