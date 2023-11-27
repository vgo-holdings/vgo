import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Shop from "@/models/shop";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewShopSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description1: Joi.string().required(),
  category: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req)

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();

      const {
        name,
        description1,
        description2,
        description3,
        description4,
        description5,
        description6,
        price,
        imageUrl,
        category,
      } = extractData;

      const { error } = AddNewShopSchema.validate({
        name,
        description1,
        price,
        category,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedShop = await Shop.create(extractData);

      if (newlyCreatedShop) {
        return NextResponse.json({
          success: true,
          message: "Shop added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the shop ! please try again",
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
