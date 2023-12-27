import connectToDB from "@/database";
import User from "@/models/user";
import userLog from "@/models/userLog";
import Class_data from "@/models/class_datas";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
    let finalData;

    try {
        await connectToDB();
        const extractData = await req1.json();
        console.log(extractData, "asdasdasdasdass");

        const {
            user_id,
            bannerURL,
        } = extractData;
        console.log("🚀 ~ file: route.js:19 ~ PUT ~ BannerURL:", bannerURL)

        const updatedUser = await User.findOneAndUpdate(
            { _id: user_id },
            { 
                bannerURL:bannerURL, 
            },
            {
                new: false,
                timestamps: false
            }
        );

        console.log(updatedUser, "why this");
        const checkUser = await User.findOne({ _id: user_id });
        console.log("🚀 ~ file: route.js:34 ~ PUT ~ checkUser:", checkUser)
        // console.log(checkUser.imageURL, "why this");

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
                        bannerURL:checkUser.bannerURL,
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
                        bannerURL:checkUser.bannerURL,
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
                    },
                };
            }
            const newLog = await userLog.create(
                {
                    userId: checkUser._id,
                    description: "You changed the banner image",
                }
            )
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
