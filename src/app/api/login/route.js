import connectToDB from "@/database";
import Class_data from "@/models/class_datas";
import User from "@/models/user";
import userLog from "@/models/userLog";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  let finalData; // Declare the variable outside the if-else block

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Account not found with this email",
      });
    }

    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Incorrect password. Please try again !",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );

    if (checkUser.class_name !== "") {
      const extractAllClasses = await Class_data.find({ _id: checkUser.class_name });
      finalData = {
        token,
        user: {
          email: checkUser.email,
          name: checkUser.name,
          _id: checkUser._id,
          role: checkUser.role,
          imageURL: checkUser.imageURL,
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
          profit:checkUser.profit,
          memberCount:checkUser.memberCount,
        },
      };
    } else {
      finalData = {
        token,
        user: {
          email: checkUser.email,
          name: checkUser.name,
          _id: checkUser._id,
          role: checkUser.role,
          imageURL: checkUser.imageURL,
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
          profit:checkUser.profit,
          memberCount:checkUser.memberCount,
        },
      };
    }
    const newLog = await userLog.create(
      {
        userId:checkUser._id,
        description:"You were logged in",
      }
    )
    return NextResponse.json({
      success: true,
      message: "Login successful!",
      finalData,
    });
  } catch (e) {
    console.error("Error while logging in. Please try again.", e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
