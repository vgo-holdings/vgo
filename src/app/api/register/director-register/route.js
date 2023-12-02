// import connectToDB from "@/database";
// import User from "@/models/user";
// import Pendinguser from "@/models/pending-user";
// import { hash } from "bcryptjs";
// import Joi from "joi";
// import { NextResponse } from "next/server";

// const schema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
//   phone: Joi.string().min(10).required(),
//   refkey: Joi.string().min(10).required(),
// });

// export const dynamic = "force-dynamic";

// const lowercasedEmail = email.toLowerCase();

// export async function POST(req) {
//   await connectToDB();
//   console.log(req, "hi")
//   const { imageURL, name, email, password, phone, whatsapp, refkey } = await req.json();
//   //validate the schema

//   const { error } = schema.validate({ name, email: lowercasedEmail, password, phone, refkey });

//   if (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: error.details[0].message,
//     });
//   }

//   try {
//     //check if the user is exists or not

//     const isUserAlreadyExists = await User.findOne({ email: lowercasedEmail });
//     const isPendinguserAlreadyExists = await Pendinguser.findOne({ email: lowercasedEmail });
//     const isAdminExits = await User.findOne({_id : refkey});
//     const isExsistingUserAdmin = isAdminExits.role === "admin";

//     console.log(isAdminExits, "asd")

//     if (isUserAlreadyExists || isPendinguserAlreadyExists) {
//       return NextResponse.json({
//         success: false,
//         message: "User is already exists. Please try with different email.",
//       });
//     } else if(!isAdminExits){
//       return NextResponse.json({
//         success: false,
//         message: "Invalid Reference Key",
//       });
//     } else if(isExsistingUserAdmin){
//       const hashPassword = await hash(password, 12);

//       const newlyCreatedUser = await Pendinguser.create({
//         imageURL,
//         name,
//         email: lowercasedEmail,
//         password: hashPassword,
//         role: "pending-director",
//         phone,
//         whatsapp,
//         facebookURL: "",
//         youtubeURL: "",
//         talents: [],
//         totalShops: 0,
//         shoppingMallCount: 0,
//         shopCount: 0,
//         productCount: 0,
//         refkey,
//         freelancerCount: 0,
//         memberCount: 0,
//         rookieCount: 0,
//         veteranCount: 0,
//         masterCount: 0,
//         legendCount: 0,
//         disable: false,
//         profit: 0,
//         holdProfit: 0,
//       });

//       if (newlyCreatedUser) {
//         return NextResponse.json({
//           success: true,
//           message: "Account created successfully.",
//         });
//       }
//     }
//   } catch (error) {
//     console.log("Error while new user registration. Please try again");

//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong ! Please try again later",
//     });
//   }
// }
