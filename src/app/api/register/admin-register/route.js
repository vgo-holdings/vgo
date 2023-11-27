import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10).required(),
  refkey: Joi.string().min(10).required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();
  console.log(req, "hi")
  const { imageURL, name, email, password, phone, whatsapp, refkey } = await req.json();
  //validate the schema

  const { error } = schema.validate({ name, email, password, phone, refkey });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    //check if the user is exists or not

    const isUserAlreadyExists = await User.findOne({ email });
    const secretKey = process.env.ADMIN_SECRET;

    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User is already exists. Please try with different email.",
      });
    } else if(secretKey !== refkey){
      return NextResponse.json({
        success: false,
        message: "Invalid Secret key",
      });
    } else{
      const hashPassword = await hash(password, 12);
      const hashRefkey = await hash(refkey, 12)

      const newlyCreatedUser = await User.create({
        imageURL,
        name,
        email,
        password: hashPassword,
        role: "admin",
        phone,
        whatsapp,
        facebookURL: "",
        youtubeURL: "",
        talents: [],
        totalShops: 0,
        shoppingMallCount: 0,
        shopCount: 0,
        productCount: 0,
        refkey: hashRefkey,
        freelancerCount: 0,
        memberCount: 0,
        rookieCount: 0,
        veteranCount: 0,
        masterCount: 0,
        legendCount: 0,
        disable: false,
        profit: 0,
        holdProfit: 0,
      });

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully.",
        });
      }
    }
  } catch (error) {
    console.log("Error while new user registration. Please try again");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
