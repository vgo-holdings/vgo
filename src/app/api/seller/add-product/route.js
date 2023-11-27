import connectToDB from "@/database";
// import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
// import Joi from "joi";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export async function POST(request) {
=======
const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  bestSelling: Joi.string().required(),
  newArrivals: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});
>>>>>>> 8fface09e5e6d42c4cfc1216771e638d6bfb4271

  try {
    await connectToDB();
    const extractData = await request.json();
    const {
      user,
      name,
      description,
      price,
      imageUrl,
      category,
      sizes,
      deliveryInfo,
      onSale,
      bestSelling,
      newArrivals,
      priceDrop,
    } = extractData;

    console.log(extractData,"extractData")
    const newlyCreatedProduct = await Product.create(extractData);

<<<<<<< HEAD
    if (newlyCreatedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product added successfully",
=======
    if (
      isAuthUser?.role === "freelancer" ||
      isAuthUser?.role === "member" ||
      isAuthUser?.role === "rookie"
    ) {
      const extractData = await req.json();

      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        bestSelling,
        newArrivals,
        priceDrop,
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        bestSelling,
        newArrivals,
        priceDrop,
>>>>>>> 8fface09e5e6d42c4cfc1216771e638d6bfb4271
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