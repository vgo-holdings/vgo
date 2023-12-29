import connectToDB from "@/database";
// import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
// import Joi from "joi";
import { NextResponse } from "next/server";

export async function POST(request) {

  try {
    await connectToDB();
    const extractData = await request.json();
    const {
      user,
      name,
      description,
      price,
      imageUrl,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      imageUrl5,
      category,
      sizes,
      deliveryInfo,
      onSale,
      bestSelling,
      newArrivals,
      priceDrop,
      location,
    } = extractData;

    console.log(extractData,"extractData")
    const newlyCreatedProduct = await Product.create(extractData);

    if (newlyCreatedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to add the product ! please try again",
      });
    }
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }

}
