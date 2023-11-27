import connectToDB from "@/database";
import Pendinguser from "@/models/pending-user";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  imageUrl: Joi.string(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  refkey: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const {_id, imageUrl, name,  phone, email, password, role, refkey } = await req.json();
  //validate the schema

  const { error } = schema.validate({ name, phone, email, password, refkey });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    //check if the admin is exists or not

    const isHrAlreadyExists = await Pendinguser.findOne({ email });
    const isAlreadyRegisteredHr = await User.findOne({ email });

    if (isHrAlreadyExists && isAlreadyRegisteredHr) {
      return NextResponse.json({
        success: false,
        message: "Hr is already exists. Please try with different email.",
      });
    } else{

      const newlyCreatedHr = await User.create({
        imageUrl,
        name,
        phone,
        email,
        password,
        role: "hr",
        refkey,
      });

      const deleteHrFromWaitingList = await Pendinguser.findByIdAndDelete(_id);
      if (newlyCreatedHr && deleteHrFromWaitingList) {
        return NextResponse.json({
          success: true,
          message: "Hr added successfully",
        });
      }
    }
  } catch (error) {
    console.log("Error while adding new hr. Please try again");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
