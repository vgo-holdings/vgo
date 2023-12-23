import connectToDB from "@/database";
import User from "@/models/user";
import Class_data from "@/models/class_datas";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {

    let finalData;

    try {
        await connectToDB();
        const extractData = await req1.json();
        console.log("🚀 ~ file: route.js:14 ~ PUT ~ extractData:", extractData)

        const checkUser = await User.findOne({ _id: extractData.user_id }, {
            name: 1,
            imageURL: 1, role: 1, _id: 1, class_name: 1, memberCount: 1, productCount: 1, whatsapp: 1,
            facebookURL: 1,
            youtubeURL: 1,
            aboutMe: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
            phone: 1,
            district: 1,
            city: 1,
        });
        console.log("🚀 ~ file: route.js:30 ~ PUT ~ checkUser:", checkUser.email)
        if (checkUser.class_name) {
            const extractAllClasses = await Class_data.find({ _id: checkUser.class_name });
            finalData = {
                user: {
                    email: checkUser.email,
                    name: checkUser.name,
                    _id: checkUser._id,
                    role: checkUser.role,
                    imageURL: checkUser.imageURL,
                    // createdAt: checkUser.createdAt,
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
                    memberCount: checkUser.memberCount,
                    productCount: checkUser.productCount,
                },
            };
            console.log("🚀 ~ file: route.js:31 ~ PUT ~ finalData:", finalData)
            return NextResponse.json({
                success: true,
                message: "Success",
                finalData,
            });
        } else {

            finalData = {
                user: {
                    email: checkUser.email,
                    name: checkUser.name,
                    _id: checkUser._id,
                    role: checkUser.role,
                    imageURL: checkUser.imageURL,
                    // createdAt: checkUser.createdAt,
                    // class_name: extractAllClasses[0]?.name,
                    first_name: checkUser.first_name,
                    last_name: checkUser.last_name,
                    phone: checkUser.phone,
                    whatsapp: checkUser.whatsapp,
                    district: checkUser.district,
                    city: checkUser.city,
                    facebookURL: checkUser.facebookURL,
                    youtubeURL: checkUser.youtubeURL,
                    aboutMe: checkUser.aboutMe,
                    memberCount: checkUser.memberCount,
                    productCount: checkUser.productCount,
                },
            };
            console.log("🚀 ~ file: route.js:31 ~ PUT ~ finalData:", finalData)
            return NextResponse.json({
                success: true,
                message: "Success",
                finalData,
            });
        }
    } catch (error) {
        console.log("🚀 ~ file: route.js:17 ~ PUT ~ error:", error)
        return NextResponse.json({
            success: false,
            message: "error in route",

        });
    }
}