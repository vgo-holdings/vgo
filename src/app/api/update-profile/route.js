import connectToDB from "@/database";
import { hash } from "bcryptjs";
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
      _id,
      imageURL,
      name,
      first_name,
      last_name,
      email,
      password,
      role,
      district,
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

    if (_id !== refkey && existsUser && password != "") {
      updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        {
          imageURL,
          name,
          first_name:first_name,
          last_name:last_name,
          email: lowercasedEmail,
          password: hashPassword,
          role,
          district,
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
    } else if(_id !== refkey && password != "") {
      updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        {
          imageURL,
          name,
          first_name:first_name,
          last_name:last_name,
          email: lowercasedEmail,
          password: hashPassword,
          role,
          district,
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
    } else{
      updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        {
          imageURL,
          name,
          first_name:first_name,
          last_name:last_name,
          email: lowercasedEmail,
          role,
          district,
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
    }

    console.log(updatedUser, "why this");

    if (updatedUser) {
      const checkUser = await User.findOne({ email });
      if (checkUser.class_name !== "") {
        const extractAllClasses = await Class_data.find({ _id: checkUser.class_name });
        finalData = {
          user: {
            email: checkUser.email,
            name: checkUser.name,
            _id: checkUser._id,
            role: checkUser.role,
            imageURL: checkUser.imageURL,
            bannerURL:checkUser.bannerURL,
            createdAt: checkUser.createdAt,
            class_name: extractAllClasses[0]?.name,
            first_name: checkUser.first_name,
            last_name: checkUser.last_name,
            phone: checkUser.phone,
            whatsapp: checkUser.whatsapp,
            district:checkUser.district,
            city:checkUser.city,
            facebookURL:checkUser.facebookURL,
            youtubeURL:checkUser.youtubeURL,
            aboutMe:checkUser.aboutMe,
            profit: checkUser.profit,
            memberCount: checkUser.memberCount,
          },
        };
      } else {
        finalData = {
          user: {
            email: checkUser.email,
            name: checkUser.name,
            _id: checkUser._id,
            role: checkUser.role,
            imageURL: checkUser.imageURL,
            bannerURL:checkUser.bannerURL,
            createdAt: checkUser.createdAt,
            first_name: checkUser.first_name,
            last_name: checkUser.last_name,
            phone: checkUser.phone,
            whatsapp: checkUser.whatsapp,
            district:checkUser.district,
            city:checkUser.city,
            facebookURL:checkUser.facebookURL,
            youtubeURL:checkUser.youtubeURL,
            aboutMe:checkUser.aboutMe,
            profit: checkUser.profit,
            memberCount: checkUser.memberCount,
          },
        };
      }
      const newLog = await userLog.create(
        {
          userId:checkUser._id,
          description:"You updated the profile details.",
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
