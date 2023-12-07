import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Class_data from "@/models/class_datas";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "hr") {
      const getAllClasses = await Class_data.find({})
      // console.log("🚀 ~ file: route.js:16 ~ GET ~ getAllClasses:", getAllClasses)
      const classDataWithUsers = [];
      
      // const users1 = await User.find({ class_name: "655e4ae872b3f1641f0cb3fb" }, { name: 1 });
      // console.log("🚀 ~ file: route.js:21 ~ GET ~ users1:", users1)

      for (let i = 0; i < getAllClasses.length; i++) {
        const classId = getAllClasses[i]._id;
        const users = await User.find({ class_name: classId }, { name: 1, class_lvl: 1 }).sort({'updatedAt':1});
        console.log("🚀 ~ file: route.js:20 ~ GET ~ users:", users)
        
        const classWithUsers = {
          class: {
            _id: getAllClasses[i]._id,
            name: getAllClasses[i].name,
            lvl3_count: [],
            lvl4_count: [],
            lvl2_count: [],
            lvl1_count: [],
          },
          users: users,
        };

        users.forEach((user) => {
          classWithUsers.class[`lvl${user.class_lvl}_count`].push(user.name);
        });

        classDataWithUsers.push(classWithUsers);

      }

      console.log("🚀 ~ file: route.js:19 ~ GET ~ classDataWithUsers:", classDataWithUsers)

      if (getAllClasses) {
        return NextResponse.json({
          success: true,
          data: classDataWithUsers,
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "failed to fetch the classes ! Please try again after some time.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not autorized !",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
