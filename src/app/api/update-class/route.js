import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import User from "@/models/user";
import classData from "@/models/classData";
import lvlTwoclassData from "@/models/lvlTwoclassData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req1) {
    try {
        await connectToDB();
        const ObjectId = require('mongodb').ObjectId;
        const extractData = await req1.json();

        console.log(extractData, "api req 1");
        const getUId = extractData.uId;
        const refGetId = extractData.rId;

        const UserData = await User.find(new ObjectId(getUId));
        let refData;
        let classDataId;
        let classDataInfo_byID;

        if (refGetId != '') {
            try {
                refData = await User.find(new ObjectId(refGetId));
                classDataId = refData[0].class_name;
                classDataInfo_byID = await classData.find(new ObjectId(classDataId));
            } catch {
                console.log("not ref key", "not ref key");
            }

        }

        console.log(refData, "refData");
        // console.log(refData[0], "refData");
        // console.log(refData[0].class_name, "classID");

        console.log(classDataInfo_byID, "classDataInfo_byID");

        const classDataSchema =
        {
            name: "A",
            lvl1_count: 0,
            lvl2_count: 0,
            lvl3_count: 0,
            lvl4_count: 0,
        };


        // const classID_eq = await User.find({ class_name: classDataId }, { name: 1, class_lvl: 1 });
        // console.log(classID_eq, "classID_eq")

        // const clusters_lvl4_rest_mem = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": "65521ba348b3cdc8b88681f6" }, { "memberCount": 0 }] });
        // console.log(clusters_lvl4_rest_mem[3],"clusters_lvl4_rest_mem")
        // console.log(clusters_lvl4_rest_mem.length,"clusters_lvl4_rest_mem")

        // check UserData[0].refkey != undefined

        // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": "65521ba348b3cdc8b88681f6" }] });
        // console.log(topLVL, "topLVL")
        // // check toplvl current class name first 
        // const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
        // if (topLVLClassName[0].name == 'c2') {
        //     //update lvl2
        //     // assume hema clz ekema top lvl kenk innawa
        //     if (topLVL[0].refkey == '') {
        //         const lvl2 = await classData.find({ $and: [{ "name": "lvl2" }, { "lvl4_count": { $ne: 8 } }] });
        //         console.log(lvl2, "lvl2")

        //         if (lvl2[0].lvl2_count != 2) {
        //             const updatedUser = await User.findOneAndUpdate(
        //                 { _id: topLVL[0]._id },
        //                 {
        //                     class_lvl: 2,
        //                     class_name: lvl2[0]._id,
        //                 },
        //                 { new: true }
        //             );

        //             const updatedClass = await classData.updateOne(
        //                 { _id: lvl2[0]._id },
        //                 { $set: { lvl2_count: lvl2[0].lvl2_count + 1 } }
        //             );

        //         } else if (lvl2[0].lvl3_count != 4) {

        //             const updatedUser = await User.findOneAndUpdate(
        //                 { _id: topLVL[0]._id },
        //                 {
        //                     class_lvl: 3,
        //                     class_name: lvl2[0]._id,
        //                 },
        //                 { new: true }
        //             );

        //             const updatedClass = await classData.updateOne(
        //                 { _id: lvl2[0]._id },
        //                 { $set: { lvl3_count: lvl2[0].lvl3_count + 1 } }
        //             );

        //         } else if (lvl2[0].lvl4_count != 8) {

        //             const updatedUser = await User.findOneAndUpdate(
        //                 { _id: topLVL[0]._id },
        //                 {
        //                     class_lvl: 4,
        //                     class_name: lvl2[0]._id,
        //                 },
        //                 { new: true }
        //             );

        //             const updatedClass = await classData.updateOne(
        //                 { _id: lvl2[0]._id },
        //                 { $set: { lvl4_count: lvl2[0].lvl4_count + 1 } }
        //             );
        //         }
        //     } else {
        //         const refSData = await User.find(new ObjectId(topLVL[0].refkey));
        //         const refclassDataInfo_byID = await classData.find(new ObjectId(refSData[0].class_name))

        //         if (refclassDataInfo_byID[0].name == "lvl2") {

        //             if (refclassDataInfo_byID[0].lvl2_count != 2) {
        //                 const updatedUser = await User.findOneAndUpdate(
        //                     { _id: topLVL[0]._id },
        //                     {
        //                         class_lvl: 2,
        //                         class_name: refclassDataInfo_byID[0]._id,
        //                     },
        //                     { new: true }
        //                 );

        //                 const updatedClass = await classData.updateOne(
        //                     { _id: refclassDataInfo_byID[0]._id },
        //                     { $set: { lvl2_count: refclassDataInfo_byID[0].lvl2_count + 1 } }
        //                 );
        //             }
        //             else if (refclassDataInfo_byID[0].lvl3_count != 4) {
        //                 const updatedUser = await User.findOneAndUpdate(
        //                     { _id: topLVL[0]._id },
        //                     {
        //                         class_lvl: 3,
        //                         class_name: refclassDataInfo_byID[0]._id,
        //                     },
        //                     { new: true }
        //                 );

        //                 const updatedClass = await classData.updateOne(
        //                     { _id: refclassDataInfo_byID[0]._id },
        //                     { $set: { lvl3_count: refclassDataInfo_byID[0].lvl3_count + 1 } }
        //                 );
        //             }
        //             else if (refclassDataInfo_byID[0].lvl4_count != 8) {
        //                 const updatedUser = await User.findOneAndUpdate(
        //                     { _id: topLVL[0]._id },
        //                     {
        //                         class_lvl: 4,
        //                         class_name: refclassDataInfo_byID[0]._id,
        //                     },
        //                     { new: true }
        //                 );

        //                 const updatedClass = await classData.updateOne(
        //                     { _id: refclassDataInfo_byID[0]._id },
        //                     { $set: { lvl4_count: refclassDataInfo_byID[0].lvl4_count + 1 } }
        //                 );
        //             }
        //         }
        //     }
        //     // assume hema clz ekema top lvl kenk innawa
        // } else if (topLVLClassName[0].name == 'lvl2') {
        //     //update lvl3
        // } else if (topLVLClassName[0].name == 'lvl3') {
        //     //update lvl4
        // }
        // add this to 8 fill logic break class

        // const newClass = await classData.create(classDataSchema);

        // const lvl2 = await classData.find({ $and: [{ "name": 1 }, { "class_name": classDataId }] });
        // console.log(lvl2,"lvl2")

        // did posiblity logics  : /
        // if (UserData[0].refkey != refGetId && getUId != refGetId && classDataInfo_byID != undefined) {
        //     console.log("FK", "FK")
        //     console.log(getUId, "uId")
        //     console.log(refGetId, "rId")

        // } else if (UserData[0].class_name == '') {
        //     console.log("no ref", "no ref");
        //     const DataClass = await classData.find({ lvl4_count: { $ne: 8 } });
        //     if (DataClass[0].lvl2_count != 2) {
        //         const updatedUser = await User.findOneAndUpdate(
        //             { _id: UserData[0]._id },
        //             {
        //                 class_lvl: 2,
        //                 class_name: DataClass[0]._id,
        //             },
        //             { new: true }
        //         );

        //         const updatedClass = await classData.updateOne(
        //             { _id: DataClass[0]._id },
        //             { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
        //         );
        //     }
        //     else if (DataClass[0].lvl3_count != 4) {
        //         const updatedUser = await User.findOneAndUpdate(
        //             { _id: UserData[0]._id },
        //             {
        //                 class_lvl: 3,
        //                 class_name: DataClass[0]._id,
        //             },
        //             { new: true }
        //         );

        //         const updatedClass = await classData.updateOne(
        //             { _id: DataClass[0]._id },
        //             { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
        //         );
        //     }
        //     else {
        //         const updatedUser = await User.findOneAndUpdate(
        //             { _id: UserData[0]._id },
        //             {
        //                 class_lvl: 4,
        //                 class_name: DataClass[0]._id,
        //             },
        //             { new: true }
        //         );
        //         const updatedClass = await classData.updateOne(
        //             { _id: DataClass[0]._id },
        //             { $set: { lvl4_count: DataClass[0].lvl4_count + 1 } }
        //         );
        //     }
        // } else {
        //     console.log("user in cls", "user in cls");
        // }

        // norml logic : works 
        // if (UserData[0].refkey != refGetId) {

        if (UserData[0].refkey != refGetId && getUId != refGetId && classDataInfo_byID != undefined) {
            const updatedRef = await User.findOneAndUpdate(
                { _id: refGetId },
                {
                    memberCount: refData[0].memberCount + 1,
                },
                { new: true }
            );
            if (classDataInfo_byID[0].lvl2_count != 2) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: getUId },
                    {
                        class_lvl: 2,
                        class_name: classDataId,
                        refkey: refGetId,
                    },
                    { new: true }
                );
                const updatedRefCls = await classData.findOneAndUpdate(
                    { _id: classDataId },
                    {
                        lvl2_count: classDataInfo_byID[0].lvl2_count + 1,
                    },
                    { new: true }
                );
            }
            else if (classDataInfo_byID[0].lvl3_count != 4) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: getUId },
                    {
                        class_lvl: 3,
                        class_name: classDataId,
                        refkey: refGetId,
                    },
                    { new: true }
                );
                const updatedRefCls = await classData.findOneAndUpdate(
                    { _id: classDataId },
                    {
                        lvl3_count: classDataInfo_byID[0].lvl3_count + 1,
                    },
                    { new: true }
                );
            }
            else if (classDataInfo_byID[0].lvl4_count != 8) {
                // Add user to lvl4 and update table lvl4 count
                console.log("im here");

                const updatedUser = await User.findOneAndUpdate(
                    { _id: getUId },
                    {
                        class_lvl: 4,
                        class_name: classDataId,
                        refkey: refGetId,
                    },
                    { new: true }
                );
                const updatedRefCls = await classData.findOneAndUpdate(
                    { _id: classDataId },
                    {
                        lvl4_count: classDataInfo_byID[0].lvl4_count + 1,
                    },
                    { new: true }
                );

                if (updatedRefCls.lvl4_count == 8) {

                    const clusters_lvl2 = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 2 }] });

                    const clusters_lvl3 = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classDataId }, { "memberCount": 2 }] });

                    const clusters_lvl4 = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classDataId }, { "memberCount": 2 }] });

                    console.log(clusters_lvl2.length, "clusters_lvl2")
                    console.log(clusters_lvl3.length, "clusters_lvl3")
                    console.log(clusters_lvl4.length, "clusters_lvl4")

                    // let ClassR;
                    // let ClassL;
                    const ClassR = "655e56fc86ae651684506a95";
                    const ClassL = "655e56fc86ae651684506a97";

                    if (clusters_lvl2.length + clusters_lvl3.length + clusters_lvl4.length >= 2) {
                        console.log("create two class");
                        // ClassR = await classData.create(classDataSchema);
                        // ClassL = await classData.create(classDataSchema);

                        const clasRdata = await classData.find(new ObjectId(ClassR));
                        const clasLdata = await classData.find(new ObjectId(ClassL));
                        let updatedClassL;

                        console.log(clasRdata[0]._id, "clasRdata");
                        if (clasRdata[0].lvl1_count != 1) {
                            console.log("clasRdata lvl")

                            if (clusters_lvl2[0] != undefined) {
                                if (clusters_lvl2.length >= 2) {
                                    console.log("clusters_lvl2 lvl")
                                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl2[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                                    const updatedClassR = await classData.updateOne(
                                        { _id: clasRdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );

                                    const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl2[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                                    updatedClassL = await classData.updateOne(
                                        { _id: clasLdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );

                                } else {
                                    console.log("clusters_lvl2 lvl 1")
                                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl2[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                                    const updatedClassR = await classData.updateOne(
                                        { _id: clasRdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );
                                }
                            } else if (clusters_lvl3[0] != undefined) {
                                if (clusters_lvl3.length >= 2) {
                                    console.log("clusters_lvl3 lvl")
                                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl3[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                                    const updatedClassR = await classData.updateOne(
                                        { _id: clasRdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );

                                    const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl3[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                                    updatedClassL = await classData.updateOne(
                                        { _id: clasLdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );
                                } else {
                                    console.log("clusters_lvl3 lvl 1")
                                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl3[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                                    const updatedClassR = await classData.updateOne(
                                        { _id: ClassR[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );
                                }
                            } else if (clusters_lvl4[0] != undefined) {
                                if (clusters_lvl4.length >= 2) {
                                    console.log("clusters_lvl4 lvl")
                                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl4[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                                    const updatedClassR = await classData.updateOne(
                                        { _id: clasRdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );

                                    const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl4[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                                    updatedClassL = await classData.updateOne(
                                        { _id: clasLdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );
                                } else {
                                    console.log("clusters_lvl4 lvl 1")
                                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl4[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                                    const updatedClassR = await classData.updateOne(
                                        { _id: clasRdata[0]._id },
                                        { $set: { lvl1_count: 1 } }
                                    );
                                }
                            }
                        }

                        if (updatedClassL == undefined) {
                            const clusters_lvl2 = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 2 }] });
                            const clusters_lvl3 = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classDataId }, { "memberCount": 2 }] });
                            const clusters_lvl4 = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classDataId }, { "memberCount": 2 }] });
                            if (clusters_lvl2[0] != undefined) {
                                console.log("clusters_lvl2 lvl LL")
                                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl2[0].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                                updatedClassL = await classData.updateOne(
                                    { _id: clasLdata[0]._id },
                                    { $set: { lvl1_count: 1 } }
                                );
                            }
                            else if (clusters_lvl3[0] != undefined) {
                                console.log("clusters_lvl3 lvl LL")
                                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl3[0].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                                updatedClassL = await classData.updateOne(
                                    { _id: clasLdata[0]._id },
                                    { $set: { lvl1_count: 1 } }
                                );
                            }
                            else if (clusters_lvl4[0] != undefined) {
                                console.log("clusters_lvl4 lvl LL")
                                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl4[0].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                                updatedClassL = await classData.updateOne(
                                    { _id: clasLdata[0]._id },
                                    { $set: { lvl1_count: 1 } }
                                );
                            }
                        }
                    }

                    const clusters_lvl2_ = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 2 }] });

                    const clusters_lvl3_ = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classDataId }, { "memberCount": 2 }] });

                    const clusters_lvl4_ = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classDataId }, { "memberCount": 2 }] });

                    if (clusters_lvl2_[0] != undefined) {
                        console.log("clusters_lvl2", "Has clusters");
                        console.log(clusters_lvl2.length, "length");

                        for (let i = 0; i < clusters_lvl2.length; i++) {
                            const refDataClass = await User.find(new ObjectId(clusters_lvl2_[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl2_[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            }
                            else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl2_[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            }
                            else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl2_[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl2_[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }
                    if (clusters_lvl3_[0] != undefined) {
                        console.log("clusters_lvl3", "Has data");
                        console.log(clusters_lvl3_.length, "length");
                        for (let i = 0; i < clusters_lvl3_.length; i++) {
                            const refDataClass = await User.find(new ObjectId(clusters_lvl3_[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl3_[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            }
                            else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl3_[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            }
                            else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl3_[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl3_[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }
                    if (clusters_lvl4_[0] != undefined) {
                        console.log("clusters_lvl4", "Has data");
                        console.log(clusters_lvl4_.length, "length");
                        for (let i = 0; i < clusters_lvl4_.length; i++) {
                            const refDataClass = await User.find(new ObjectId(clusters_lvl4_[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl4_[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            }
                            else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl4_[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            }
                            else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl4_[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl4_[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }

                    // Logic 2 check memberCount 1

                    const clusters_lvl2_rest = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 1 }] });
                    const clusters_lvl3_rest = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classDataId }, { "memberCount": 1 }] });
                    const clusters_lvl4_rest = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classDataId }, { "memberCount": 1 }] });
                    console.log(clusters_lvl2_rest.length, "clusters_lvl2")
                    console.log(clusters_lvl3_rest.length, "clusters_lvl3")
                    console.log(clusters_lvl4_rest.length, "clusters_lvl4")

                    if (clusters_lvl2_rest[0] != undefined) {
                        console.log("clusters_lvl2_rest", "Has clusters");
                        console.log(clusters_lvl2_rest.length, "length");

                        for (let i = 0; i < clusters_lvl2_rest.length; i++) {
                            console.log(clusters_lvl2_rest[i].refkey, "clusters_lvl2_rest_refkey");
                            console.log(clusters_lvl2_rest[i].memberCount, "memberCount");

                            const refDataClass = await User.find(new ObjectId(clusters_lvl2_rest[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");



                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl2_rest[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            } else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl2_rest[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            } else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl2_rest[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl2_rest[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }
                        }
                    }

                    if (clusters_lvl3_rest[0] != undefined) {
                        console.log("clusters_lvl3_rest", "Has clusters");
                        console.log(clusters_lvl3_rest.length, "length");

                        for (let i = 0; i < clusters_lvl3_rest.length; i++) {
                            console.log(clusters_lvl3_rest[i].refkey, "clusters_lvl3_rest_refkey");
                            console.log(clusters_lvl3_rest[i].memberCount, "memberCount");

                            const refDataClass = await User.find(new ObjectId(clusters_lvl3_rest[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl3_rest[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            } else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl3_rest[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            } else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl3_rest[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl3_rest[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }

                    if (clusters_lvl4_rest[0] != undefined) {
                        console.log("clusters_lvl4_rest", "Has clusters");
                        console.log(clusters_lvl4_rest.length, "length");

                        for (let i = 0; i < clusters_lvl4_rest.length; i++) {
                            console.log(clusters_lvl4_rest[i].refkey, "clusters_lvl4_rest_refkey");
                            console.log(clusters_lvl4_rest[i].memberCount, "memberCount");

                            const refDataClass = await User.find(new ObjectId(clusters_lvl4_rest[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl4_rest[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            } else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl4_rest[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            } else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl4_rest[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl4_rest[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }
                    // end of logic 2
                    console.log("logic 2", "Done")

                    // Logic 3 check memberCount 0
                    const clusters_lvl2_rest_mem = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 0 }] });
                    const clusters_lvl3_rest_mem = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classDataId }, { "memberCount": 0 }] });
                    const clusters_lvl4_rest_mem = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classDataId }, { "memberCount": 0 }] });
                    console.log(clusters_lvl2_rest_mem.length, "clusters_lvl2_rest_mem");
                    console.log(clusters_lvl3_rest_mem.length, "clusters_lvl3_rest_mem");
                    console.log(clusters_lvl4_rest_mem.length, "clusters_lvl4_rest_mem");

                    if (clusters_lvl2_rest_mem[0] != undefined) {
                        console.log("clusters_lvl2_rest_mem", "Has clusters");
                        console.log(clusters_lvl2_rest_mem.length, "length");

                        for (let i = 0; i < clusters_lvl2_rest_mem.length; i++) {
                            console.log(clusters_lvl2_rest_mem[i].refkey, "clusters_lvl2_rest_mem_refkey");
                            console.log(clusters_lvl2_rest_mem[i].memberCount, "memberCount");

                            const refDataClass = await User.find(new ObjectId(clusters_lvl2_rest_mem[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl2_rest_mem[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            } else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl2_rest_mem[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            } else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl2_rest_mem[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl2_rest_mem[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }

                    if (clusters_lvl3_rest_mem[0] != undefined) {
                        console.log("clusters_lvl3_rest_mem", "Has clusters");
                        console.log(clusters_lvl3_rest_mem.length, "length");

                        for (let i = 0; i < clusters_lvl3_rest_mem.length; i++) {
                            console.log(clusters_lvl3_rest_mem[i].refkey, "clusters_lvl3_rest_mem_refkey");
                            console.log(clusters_lvl3_rest_mem[i].memberCount, "memberCount");

                            const refDataClass = await User.find(new ObjectId(clusters_lvl3_rest_mem[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl3_rest_mem[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            } else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl3_rest_mem[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            } else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl3_rest_mem[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl3_rest_mem[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }
                    console.log("clusters_lvl3_rest_mem", "Done");

                    if (clusters_lvl4_rest_mem[0] != undefined) {
                        console.log("clusters_lvl4_rest_mem", "Has clusters");
                        console.log(clusters_lvl4_rest_mem.length, "length");

                        for (let i = 0; i < clusters_lvl4_rest_mem.length; i++) {
                            console.log(clusters_lvl4_rest_mem[i].refkey, "clusters_lvl4_rest_mem_refkey");
                            console.log(clusters_lvl4_rest_mem[i].memberCount, "memberCount");

                            const refDataClass = await User.find(new ObjectId(clusters_lvl4_rest_mem[i].refkey), { class_name: 1 });
                            console.log(refDataClass[0].class_name, "refDataClass");

                            const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
                            console.log(refMainClass, "refMainClass");

                            if (refMainClass[0].lvl2_count != 2) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl4_rest_mem[i]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
                                );

                            } else if (refMainClass[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: clusters_lvl4_rest_mem[i]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: refMainClass[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: refMainClass[0]._id },
                                    { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
                                );

                            } else {
                                const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                                if (DataClass[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl4_rest_mem[i]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (DataClass[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: clusters_lvl4_rest_mem[i]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: DataClass[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: DataClass[0]._id },
                                        { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
                                    );
                                }
                            }

                        }
                    }
                    // end of logic 3
                    console.log("logic 3", "Done")

                    // logic gold : to do put user to different lvl 
                    // const clusters_lvl1 = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classDataId }, { "memberCount": 2 }] });

                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classDataId }] });
                    console.log(topLVL, "topLVL")
                    // check toplvl current class name first 
                    const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                    if (topLVLClassName[0].name == 'A') {
                        //update lvl2
                        // assume hema clz ekema top lvl kenk innawa
                        if (topLVL[0].refkey == '') {
                            const lvl2 = await classData.find({ $and: [{ "name": "B" }, { "lvl4_count": { $ne: 8 } }] });
                            console.log(lvl2, "lvl2")

                            if (lvl2[0].lvl2_count != 2) {
                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: topLVL[0]._id },
                                    {
                                        class_lvl: 2,
                                        class_name: lvl2[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: lvl2[0]._id },
                                    { $set: { lvl2_count: lvl2[0].lvl2_count + 1 } }
                                );

                            } else if (lvl2[0].lvl3_count != 4) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: topLVL[0]._id },
                                    {
                                        class_lvl: 3,
                                        class_name: lvl2[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: lvl2[0]._id },
                                    { $set: { lvl3_count: lvl2[0].lvl3_count + 1 } }
                                );

                            } else if (lvl2[0].lvl4_count != 8) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: topLVL[0]._id },
                                    {
                                        class_lvl: 4,
                                        class_name: lvl2[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.updateOne(
                                    { _id: lvl2[0]._id },
                                    { $set: { lvl4_count: lvl2[0].lvl4_count + 1 } }
                                );
                            }
                        } else {
                            const refSData = await User.find(new ObjectId(topLVL[0].refkey));
                            const refclassDataInfo_byID = await classData.find(new ObjectId(refSData[0].class_name))

                            if (refclassDataInfo_byID[0].name == "lvl2") {

                                if (refclassDataInfo_byID[0].lvl2_count != 2) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: topLVL[0]._id },
                                        {
                                            class_lvl: 2,
                                            class_name: refclassDataInfo_byID[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: refclassDataInfo_byID[0]._id },
                                        { $set: { lvl2_count: refclassDataInfo_byID[0].lvl2_count + 1 } }
                                    );
                                }
                                else if (refclassDataInfo_byID[0].lvl3_count != 4) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: topLVL[0]._id },
                                        {
                                            class_lvl: 3,
                                            class_name: refclassDataInfo_byID[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: refclassDataInfo_byID[0]._id },
                                        { $set: { lvl3_count: refclassDataInfo_byID[0].lvl3_count + 1 } }
                                    );
                                }
                                else if (refclassDataInfo_byID[0].lvl4_count != 8) {
                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: topLVL[0]._id },
                                        {
                                            class_lvl: 4,
                                            class_name: refclassDataInfo_byID[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.updateOne(
                                        { _id: refclassDataInfo_byID[0]._id },
                                        { $set: { lvl4_count: refclassDataInfo_byID[0].lvl4_count + 1 } }
                                    );
                                }
                            }
                        }
                        // assume 7 top
                    } else if (topLVLClassName[0].name == 'lvl2') {
                        //update lvl3
                    } else if (topLVLClassName[0].name == 'lvl3') {
                        //update lvl4
                    }

                }

            }
        } else if (UserData[0].class_name == '') {
            console.log("no ref", "no ref");
            const DataClass = await classData.find({ lvl4_count: { $ne: 7 } });
            // if (DataClass[0].lvl2_count != 2) {
            //     const updatedUser = await User.findOneAndUpdate(
            //         { _id: UserData[0]._id },
            //         {
            //             class_lvl: 2,
            //             class_name: DataClass[0]._id,
            //         },
            //         { new: true }
            //     );

            //     const updatedClass = await classData.updateOne(
            //         { _id: DataClass[0]._id },
            //         { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
            //     );
            // }
            // else if (DataClass[0].lvl3_count != 4) {
            //     const updatedUser = await User.findOneAndUpdate(
            //         { _id: UserData[0]._id },
            //         {
            //             class_lvl: 3,
            //             class_name: DataClass[0]._id,
            //         },
            //         { new: true }
            //     );

            //     const updatedClass = await classData.updateOne(
            //         { _id: DataClass[0]._id },
            //         { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
            //     );
            // }
            // else {
            //     const updatedUser = await User.findOneAndUpdate(
            //         { _id: UserData[0]._id },
            //         {
            //             class_lvl: 4,
            //             class_name: DataClass[0]._id,
            //         },
            //         { new: true }
            //     );
            //     const updatedClass = await classData.updateOne(
            //         { _id: DataClass[0]._id },
            //         { $set: { lvl4_count: DataClass[0].lvl4_count + 1 } }
            //     );
            // }
        } else {
            console.log("user in cls", "user in cls");
        }


        const classID2_eq = await User.find({ class_name: classDataId });
        console.log(classID2_eq.length, "classID2_eq")
        return NextResponse.json({
            success: true,
            message: "Updated",
        });

    } catch (error) {
        console.error(error); // Corrected variable name
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later",
        });
    }
}

//         if (UserData[0].refkey != refGetId) {
//             if (refData[0].class_lvl == 4) {

//                 if (classDataInfo_byID[0].lvl4_count != 8) {

//                     console.log("put new member here lvl 4");

//                     const updatedUser = await User.findOneAndUpdate(
//                         { _id: getUId },
//                         {
//                             class_lvl: 4,
//                             class_name: classDataId,
//                             refkey: refGetId,
//                         },
//                         { new: true }
//                     );

//                     const updatedRef = await classData.findOneAndUpdate(
//                         { _id: classDataId },
//                         {
//                             lvl4_count: classDataInfo_byID[0].lvl4_count + 1,
//                         },
//                         { new: true }
//                     );

//                 } else {

//                     const classDataSchema =
//                     {
//                         name: "c2",
//                         lvl2_count: 0,
//                         lvl3_count: 0,
//                         lvl4_count: 0,
//                     };


//                     // Logic 1 check memberCount 2

//                     const clusters_lvl2 = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 2 }] });
//                     const clusters_lvl3 = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classDataId }, { "memberCount": 2 }] });
//                     const clusters_lvl4 = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classDataId }, { "memberCount": 2 }] });

//                     const totalClusters = clusters_lvl2.length + clusters_lvl3.length + clusters_lvl4.length
//                     console.log(totalClusters,"totalClusters");

//                     if (clusters_lvl2[0] != undefined) {
//                         console.log("clusters_lvl2", "Has data");
//                         console.log(clusters_lvl2.length, "length");

//                         for (let i = 0; i < clusters_lvl2.length; i++) {
//                             const newClass = await classData.create(classDataSchema);
//                             const updateLvl2Ref = await User.updateOne({$and:[{"class_lvl":2},{"class_name":classDataId},{"memberCount":2}]}, { $set: { class_lvl: 1 , class_name: newClass._id,} })
//                         }

//                     }

//                     if (clusters_lvl3[0] != undefined) {
//                         console.log("clusters_lvl3", "Has data");
//                         console.log(clusters_lvl3.length, "length");
//                         for (let i = 0; i < clusters_lvl2.length; i++) {
//                             const newClass = await classData.create(classDataSchema);
//                             const updateLvl2Ref = await User.updateOne({$and:[{"class_lvl":3},{"class_name":classDataId},{"memberCount":2}]}, { $set: { class_lvl: 1 , class_name: newClass._id,} })
//                         }
//                     }
//                     if (clusters_lvl4[0] != undefined) {
//                         console.log("clusters_lvl4", "Has data");
//                         console.log(clusters_lvl4.length, "length");
//                         for (let i = 0; i < clusters_lvl2.length; i++) {
//                             const newClass = await classData.create(classDataSchema);
//                             const updateLvl2Ref = await User.updateOne({$and:[{"class_lvl":4},{"class_name":classDataId},{"memberCount":2}]}, { $set: { class_lvl: 1 , class_name: newClass._id,} })
//                         }
//                     }

//                     // Logic 2 check memberCount 1

//                     const clusters_lvl2_rest = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 1 }] });
//                     const clusters_lvl3_rest = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classDataId }, { "memberCount": 1 }] });
//                     const clusters_lvl4_rest = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classDataId }, { "memberCount": 1 }] });

//                     // console.log(clusters_lvl2_rest,"clusters_lvl2");
//                     // console.log(clusters_lvl3_rest,"clusters_lvl3");
//                     // console.log(clusters_lvl4_rest,"clusters_lvl4");

//                     const DataClass = await classData.find({ lvl4_count: { $ne: 8 } });

//                     console.log(DataClass, "DataClass");
//                     console.log(DataClass[0].lvl4_count, "lvl2_count");

// // comment this
// if (clusters_lvl2_rest[0] != undefined) {
//     console.log("clusters_lvl2", "Has data");
//     console.log(clusters_lvl2_rest.length, "length");
//     console.log(clusters_lvl2_rest[0]._id, "clusters_lvl2__id");
//     console.log(clusters_lvl2_rest[0].refkey, "clusters_lvl2_rest_refkey");
//     console.log(clusters_lvl2_rest[0].memberCount, "memberCount");

//     const refDataClass = await User.find(new ObjectId(clusters_lvl2_rest[0].refkey), { class_name: 1 });
//     console.log(refDataClass[0].class_name, "refDataClass");

//     const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
//     console.log(refMainClass, "refMainClass");

//     if (refMainClass[0].lvl4_count == 8) {
//         console.log(DataClass[0], "newDataClass");

//         if (DataClass[0].lvl2_count != 2) {

//             const updatedUser = await User.findOneAndUpdate(
//                 { _id: clusters_lvl2_rest[0]._id },
//                 {
//                     class_lvl: 2,
//                     class_name: DataClass[0]._id,
//                 },
//                 { new: true }
//             );

//             const updatedClass = await classData.updateOne(
//                 { _id: DataClass[0]._id },
//                 { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
//             );

//         }
//         // Add elseif DataClass[0].lvl3_count != 4

//     } else {

//         if (refMainClass[0].lvl2_count != 2) {

//             const updatedUser = await User.findOneAndUpdate(
//                 { _id: clusters_lvl2_rest[0]._id },
//                 {
//                     class_lvl: 2,
//                     class_name: refMainClass[0]._id,
//                 },
//                 { new: true }
//             );

//             const updatedClass = await classData.updateOne(
//                 { _id: refMainClass[0]._id },
//                 { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
//             );

//             // const updatedClass = await classData.findOneAndUpdate(
//             //     { _id: refMainClass[0]._id },
//             //     {
//             //         lvl2_count: refMainClass[0].lvl2_count + 1,
//             //     },
//             //     { new: true }
//             // );

//         }
//     }

//     // DataClass[0]._id

// }

//                     if (clusters_lvl3_rest[0] != undefined) {
//                         console.log("clusters_lvl3", "Has data");
//                         console.log(clusters_lvl3_rest.length, "length");
//                         for (let i = 0; i < clusters_lvl3_rest.length; i++) {
//                             console.log(clusters_lvl3_rest[i].refkey, "clusters_lvl3_rest_refkey");
//                             console.log(clusters_lvl3_rest[i].memberCount, "memberCount");

//                             const refDataClass = await User.find(new ObjectId(clusters_lvl3_rest[i].refkey), { class_name: 1 });
//                             console.log(refDataClass[0].class_name, "refDataClass");

//                             const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));
//                             console.log(refMainClass, "refMainClass");

//                             if (refMainClass[0].lvl4_count == 8) {
//                                 console.log(DataClass[0], "newDataClass");

//                                 if (DataClass[0].lvl2_count != 2) {

//                                     const updatedUser = await User.findOneAndUpdate(
//                                         { _id: clusters_lvl3_rest[i]._id },
//                                         {
//                                             class_lvl: 2,
//                                             class_name: DataClass[0]._id,
//                                         },
//                                         { new: true }
//                                     );

//                                     const updatedClass = await classData.updateOne(
//                                         { _id: DataClass[0]._id },
//                                         { $set: { lvl2_count: DataClass[0].lvl2_count + 1 } }
//                                     );

//                                 }else if (DataClass[0].lvl3_count != 4){

//                                     const updatedUser = await User.findOneAndUpdate(
//                                         { _id: clusters_lvl3_rest[i]._id },
//                                         {
//                                             class_lvl: 3,
//                                             class_name: DataClass[0]._id,
//                                         },
//                                         { new: true }
//                                     );

//                                     const updatedClass = await classData.updateOne(
//                                         { _id: DataClass[0]._id },
//                                         { $set: { lvl3_count: DataClass[0].lvl3_count + 1 } }
//                                     );

//                                 }
//                                 // Add elseif DataClass[0].lvl3_count != 4

//                             } else {

//                                 if (refMainClass[0].lvl2_count != 2) {

//                                     const updatedUser = await User.findOneAndUpdate(
//                                         { _id: clusters_lvl3_rest[i]._id },
//                                         {
//                                             class_lvl: 2,
//                                             class_name: refMainClass[0]._id,
//                                         },
//                                         { new: true }
//                                     );

//                                     const updatedClass = await classData.updateOne(
//                                         { _id: refMainClass[0]._id },
//                                         { $set: { lvl2_count: refMainClass[0].lvl2_count + 1 } }
//                                     );

//                                 }else if (refMainClass[0].lvl3_count != 4){

//                                     const updatedUser = await User.findOneAndUpdate(
//                                         { _id: clusters_lvl3_rest[i]._id },
//                                         {
//                                             class_lvl: 3,
//                                             class_name: refMainClass[0]._id,
//                                         },
//                                         { new: true }
//                                     );

//                                     const updatedClass = await classData.updateOne(
//                                         { _id: refMainClass[0]._id },
//                                         { $set: { lvl3_count: refMainClass[0].lvl3_count + 1 } }
//                                     );

//                                 }

//                             }

//                         }
//                     }

//                     if (clusters_lvl4_rest[0] != undefined) {
//                         console.log("clusters_lvl4", "Has data");
//                         console.log(clusters_lvl4_rest.length, "length");
//                         for (let i = 0; i < clusters_lvl4_rest.length; i++) {
//                             console.log(clusters_lvl4_rest[i].refkey, "clusters_lvl4_rest_refkey");
//                             console.log(clusters_lvl4_rest[i].memberCount, "memberCount");
//                         }
//                     }

//                 }

//             } else if (refData[0].class_lvl == 3) {

//                 if (classDataInfo_byID[0].lvl3_count != 4) {

//                     const updatedUser = await User.findOneAndUpdate(
//                         { _id: getUId },
//                         {
//                             class_lvl: 3,
//                             class_name: classDataId,
//                             refkey: refGetId,
//                         },
//                         { new: true }
//                     );

//                     const updatedRef = await classData.findOneAndUpdate(
//                         { _id: classDataId },
//                         {
//                             lvl3_count: classDataInfo_byID[0].lvl3_count + 1,
//                         },
//                         { new: true }
//                     );

//                     console.log("put new member here lvl 3");

//                 } else if (classDataInfo_byID[0].lvl4_count != 8) {

//                     const updatedUser = await User.findOneAndUpdate(
//                         { _id: getUId },
//                         {
//                             class_lvl: 4,
//                             class_name: classDataId,
//                             refkey: refGetId,
//                         },
//                         { new: true }
//                     );

//                     const updatedRef = await classData.findOneAndUpdate(
//                         { _id: classDataId },
//                         {
//                             lvl4_count: classDataInfo_byID[0].lvl4_count + 1,
//                         },
//                         { new: true }
//                     );

//                 } else {
//                     console.log("create new class");
//                 }

//             } else if (refData[0].class_lvl == 2) {

//                 if (classDataInfo_byID[0].lvl3_count != 4) {

//                     const updatedUser = await User.findOneAndUpdate(
//                         { _id: getUId },
//                         {
//                             class_lvl: 3,
//                             class_name: classDataId,
//                             refkey: refGetId,
//                         },
//                         { new: true }
//                     );

//                     const updatedRef = await classData.findOneAndUpdate(
//                         { _id: classDataId },
//                         {
//                             lvl3_count: classDataInfo_byID[0].lvl3_count + 1,
//                         },
//                         { new: true }
//                     );

//                     console.log("put new member here lvl 3");

//                 } else if (classDataInfo_byID[0].lvl4_count != 8) {

//                     const updatedUser = await User.findOneAndUpdate(
//                         { _id: getUId },
//                         {
//                             class_lvl: 4,
//                             class_name: classDataId,
//                             refkey: refGetId,
//                         },
//                         { new: true }
//                     );

//                     const updatedRef = await classData.findOneAndUpdate(
//                         { _id: classDataId },
//                         {
//                             lvl4_count: classDataInfo_byID[0].lvl4_count + 1,
//                         },
//                         { new: true }
//                     );

//                 } else {
//                     console.log("create new class");
//                 }
//             } else {
//                 const updatedUser = await User.findOneAndUpdate(
//                     { _id: getUId },
//                     {
//                         class_lvl: refData[0].class_lvl + 1,
//                         class_name: classDataId,
//                         refkey: refGetId,
//                     },
//                     { new: true }
//                 );
//             }

//         }

// uncomment this

// ******************************

// if (UserData[0].refkey != refGetId) {
//     console.log(refData[0].memberCount, "refData.memberCount");

//     const updatedRef = await User.findOneAndUpdate(
//         { _id: refGetId },
//         {
//             memberCount: refData[0].memberCount + 1,
//             // class_lvl: 4,
//         },
//         { new: true }
//     );
// }

// ******************************

// check brek
// const refDataNew = await User.find(new ObjectId(refGetId));

// if (refDataNew[0].memberCount == 2) {
//     const updatedRefRocky = await User.findOneAndUpdate(
//         { _id: refGetId },
//         {
//             class_lvl: 1,
//         },
//         { new: true }
//     );

//     const upUser = await User.updateMany({ refkey: refGetId }, { $set: { class_lvl: 2 } })
//     const checkUser = await User.find({ refkey: refGetId });
//     console.log(checkUser, "checkUser")
// }

//         return NextResponse.json({
//             success: true,
//             message: "Updated",
//         });

//     } catch (error) {
//         console.error(error); // Corrected variable name
//         return NextResponse.json({
//             success: false,
//             message: "Something went wrong! Please try again later",
//         });
//     }
// }