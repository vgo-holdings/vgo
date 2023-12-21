import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
    let finalData;
    try {
        await connectToDB();
        const extractData = await req1.json();

        const {
            _id,
            email,
            aboutMe,
        } = extractData;
        console.log("🚀 ~ file: route.js:18 ~ PUT ~ extractData:", extractData)

        let updatedUser;
        if (_id != "") {
            updatedUser = await User.updateOne(
                { _id: _id },
                { $set: { aboutMe: aboutMe } },
                {
                    new: false,
                    timestamps: false
                }
            );
            console.log("🚀 ~ file: route.js:30 ~ PUT ~ updatedUser:", updatedUser)
            
        }

        if (updatedUser) {
            const checkUser = await User.findOne({ email });
            if (checkUser.class_name !== "") {
                const extractAllClasses = await Class_data.find({ _id: checkUser.class_name });
                finalData = {
                    user: {
                        email: checkUser.email,
                        name: checkUser.name,
                        _id: checkUser._id,
                        role: checkUser.role,
                        imageURL: checkUser.imageURL,
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
                    },
                };
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