import connectToDB from "@/database";
import Class_data from "@/models/class_datas";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    console.log("hh");
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀 ~ file: route.js:15 ~ GET ~ userId:", extractData)
    // const { _id } = await req.json();
    const classDataWithUsers = [];
    try {
        const checkUser = await User.find({ nic: extractData.nic }, { name: 1, imageURL: 1, role: 1, _id: 1, class_name: 1, nic: 1 });
        console.log("🚀 ~ file: route.js:18 ~ POST ~ checkUser:", checkUser)
        for (let i = 0; i < checkUser.length; i++) {
            const classId = checkUser[i].class_name;
            if (classId != ""){
                const extractedClassName = await Class_data.findOne({ _id: classId }, { name: 1 })

                const testTry = {
                    _id: checkUser[i]._id,
                    imageURL: checkUser[i].imageURL,
                    name: checkUser[i].name,
                    nic: checkUser[i].nic,
                    role: checkUser[i].role,
                    class_id: checkUser[i].class_name,
                    class_name: extractedClassName?.name,
                }
    
                classDataWithUsers.push(testTry);
            }else{
                const testTry = {
                    _id: checkUser[i]._id,
                    imageURL: checkUser[i].imageURL,
                    name: checkUser[i].name,
                    nic: checkUser[i].nic,
                    role: checkUser[i].role,
                    class_id: checkUser[i].class_name,
                    class_name: "",
                }
    
                classDataWithUsers.push(testTry);
            }
            
            
        }

        // const extractedClassName = await Class_data.find({ _id: checkUser.class_name })
        console.log("🚀 ~ file: route.js:21 ~ PUT ~ extractedClassName:", classDataWithUsers)


        return NextResponse.json({
            success: true,
            message: "Got Connection data",
            classDataWithUsers,
            checkUser,
        });

    } catch (error) {
        console.log("🚀 ~ file: route.js:51 ~ PUT ~ error:", error)
        return NextResponse.json({
            success: false,
            message: "Error",
        });
    }
}