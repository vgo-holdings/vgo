import connectToDB from "@/database";
import User from "@/models/user";
import userLog from "@/models/userLog";
import Class_data from "@/models/class_datas";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
    let finalData;
    let updatedUser;
    try {
        await connectToDB();
        const extractData = await req1.json();
        console.log(extractData, "asdasdasdasdass");

        const {
            user_id,
            packname,
        } = extractData;
        console.log("🚀 ~ file: route.js:19 ~ PUT ~ packname:", packname);

        if (packname == "shoppingMallCount") {
            updatedUser = await User.findOneAndUpdate(
                { _id: user_id },
                {
                    shoppingMallCount: 1,
                },
                {
                    new: false,
                    timestamps: false
                }
            );
        } else {
            updatedUser = await User.findOneAndUpdate(
                { _id: user_id },
                {
                    totalShops: 1,
                },
                {
                    new: false,
                    timestamps: false
                }
            );
        }
        const checkUser = await User.findOne({ _id: user_id });

        if (updatedUser) {
            if (updatedUser.class_name !== "") {
                const extractAllClasses = await Class_data.find({ _id: updatedUser.class_name });
                finalData = {
                    user: {
                        email: checkUser.email,
                        name: checkUser.name,
                        _id: checkUser._id,
                        role: checkUser.role,
                        imageURL: checkUser.imageURL,
                        bannerURL: checkUser.bannerURL,
                        createdAt: checkUser.createdAt,
                        class_name: extractAllClasses[0]?.name,
                        first_name: checkUser.first_name,
                        last_name: checkUser.last_name,
                        phone: checkUser.phone,
                        whatsapp: checkUser.whatsapp,
                        district: checkUser.district,
                        city: checkUser.city,
                        facebookURL: checkUser.facebookURL,
                        youtubeURL: checkUser.youtubeURL,
                        aboutMe: checkUser.aboutMe,
                        profit: checkUser.profit,
                        memberCount: checkUser.memberCount,
                        shoppingMallCount: checkUser.shoppingMallCount,
                        totalShops: checkUser.totalShops
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
                        bannerURL: checkUser.bannerURL,
                        createdAt: checkUser.createdAt,
                        first_name: checkUser.first_name,
                        last_name: checkUser.last_name,
                        phone: checkUser.phone,
                        whatsapp: checkUser.whatsapp,
                        district: checkUser.district,
                        city: checkUser.city,
                        facebookURL: checkUser.facebookURL,
                        youtubeURL: checkUser.youtubeURL,
                        aboutMe: checkUser.aboutMe,
                        profit: checkUser.profit,
                        memberCount: checkUser.memberCount,
                        shoppingMallCount: checkUser.shoppingMallCount,
                        totalShops: checkUser.totalShops
                    },
                };
            }
            if (packname == "shoppingMallCount") {
                const newLog = await userLog.create(
                    {
                        userId: checkUser._id,
                        description: "You got Shopping Mall package",
                    }
                )
            }else{
                const newLog = await userLog.create(
                    {
                        userId: checkUser._id,
                        description: "You got Online Shop package",
                    }
                )
            }
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