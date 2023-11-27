import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51MVHj2HaRX1qSYJH1DniyuyDcSQAi286YlTriwPB4BlU8Lx3nYZOUVnwRY4z1peegI5KiTNRJdOqXNZx1sHX1rBT00oUlwjYPD"
);

export const dynamic = "force-dynamic";

export async function POST(req1) {
  try {
    const isAuthUser = await AuthUser(req1);
    if (isAuthUser) {
        console.log(req1)
      const res = await req1.json();
      console.log(isAuthUser)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "http://localhost:3000/register/freelancer-register" + "?status=success",
        cancel_url: "http://localhost:3000/register/freelancer-register" + "?status=cancel",
      });
      if (session.payment_status === "unpaid") {
        // Payment was successful, perform actions on the user
        // For example, update user's profile or send a confirmation email
        const userId = isAuthUser.id; // Assuming isAuthUser has the user information
        // Perform actions on the user here
        console.log(`Payment successful for user with ID: ${userId}`, "hello s");
        // You can add more actions here based on your requirements
      }

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
