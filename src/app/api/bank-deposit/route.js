import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Bankdeposit from "@/models/bankdeposit";
import Joi from "joi";
import { NextResponse } from "next/server";

const BankDepositschema = Joi.object({
  name: Joi.string().required(),
  user_id: Joi.string().required(),
  refkey: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (
      isAuthUser?.role === "freelancer" ||
      isAuthUser?.role === "member" ||
      isAuthUser?.role === "rookie"
    ) {
      const extractData = await req.json();

      const {
        name,
        user_id,
        refkey,
        imageUrl
      } = extractData;

      const { error } = BankDepositschema.validate({
        name,
        user_id,
        refkey,
        imageUrl,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedDeposit = await Bankdeposit.create(extractData);

      if (newlyCreatedDeposit) {
        return NextResponse.json({
          success: true,
          message: "Deposit added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the deposit ! please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not autorized !",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
