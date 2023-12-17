import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import User from "@/models/user";
import classData from "@/models/classData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getUserData(classNameTofind, memberCount, memberCountValue) {
    const clusters_lvl2 = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classNameTofind }, { memberCount: memberCountValue }] }).sort({ 'updatedAt': 1 });
    const clusters_lvl3 = await User.find({ $and: [{ "class_lvl": 3 }, { "class_name": classNameTofind }, { memberCount: memberCountValue }] }).sort({ 'updatedAt': 1 });
    const clusters_lvl4 = await User.find({ $and: [{ "class_lvl": 4 }, { "class_name": classNameTofind }, { memberCount: memberCountValue }] }).sort({ 'updatedAt': 1 });

    return {
        clusters_lvl2,
        clusters_lvl3,
        clusters_lvl4
    };
}


async function logic1Test(ObjectId, ClassR, ClassL, clusters_lvl2, clusters_lvl3, clusters_lvl4, classDataId, clsLvl) {
    let clasRdata;
    let clasLdata;
    clasRdata = await classData.find(new ObjectId(ClassR));
    clasLdata = await classData.find(new ObjectId(ClassL));
    let updatedClassL;

    if (clasRdata[0].lvl1_count != 1) {
        console.log("clasRdata lvl 1 im inside")

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
        } else {
            let clusters_lvl2_rest;
            let clusters_lvl3_rest;
            let clusters_lvl4_rest;
            if (clsLvl == 'A') {
                const userData = await getUserData(classDataId, "memberCount", 1);
                clusters_lvl2_rest = userData.clusters_lvl2;
                clusters_lvl3_rest = userData.clusters_lvl3;
                clusters_lvl4_rest = userData.clusters_lvl4;
            } else if (clsLvl == 'B') {
                const userData = await getUserData(classDataId, "lvl2_memberCount", 1);
                clusters_lvl2_rest = userData.clusters_lvl2;
                clusters_lvl3_rest = userData.clusters_lvl3;
                clusters_lvl4_rest = userData.clusters_lvl4;
            } else if (clsLvl == 'C') {
                const userData = await getUserData(classDataId, "lvl3_memberCount", 1);
                clusters_lvl2_rest = userData.clusters_lvl2;
                clusters_lvl3_rest = userData.clusters_lvl3;
                clusters_lvl4_rest = userData.clusters_lvl4;
            } else if (clsLvl == 'D') {
                const userData = await getUserData(classDataId, "lvl4_memberCount", 1);
                clusters_lvl2_rest = userData.clusters_lvl2;
                clusters_lvl3_rest = userData.clusters_lvl3;
                clusters_lvl4_rest = userData.clusters_lvl4;
            }
            clasRdata = await classData.find(new ObjectId(ClassR));
            clasLdata = await classData.find(new ObjectId(ClassL));

            if (clusters_lvl2_rest[0] != undefined) {
                if (clusters_lvl2_rest.length >= 2) {
                    console.log("clusters_lvl2_rest lvl")
                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl2_rest[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                    const updatedClassR = await classData.updateOne(
                        { _id: clasRdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );

                    const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl2_rest[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                    updatedClassL = await classData.updateOne(
                        { _id: clasLdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );

                } else {
                    console.log("clusters_lvl2 lvl 1")
                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl2_rest[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                    const updatedClassR = await classData.updateOne(
                        { _id: clasRdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );
                }
            } else if (clusters_lvl3_rest[0] != undefined) {
                if (clusters_lvl3_rest.length >= 2) {
                    console.log("clusters_lvl3_rest lvl")
                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl3_rest[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                    const updatedClassR = await classData.updateOne(
                        { _id: clasRdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );

                    const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl3_rest[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                    updatedClassL = await classData.updateOne(
                        { _id: clasLdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );
                } else {
                    console.log("clusters_lvl3_rest lvl 1")
                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl3_rest[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                    const updatedClassR = await classData.updateOne(
                        { _id: ClassR[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );
                }
            } else if (clusters_lvl4_rest[0] != undefined) {
                if (clusters_lvl4_rest.length >= 2) {
                    console.log("clusters_lvl4_rest lvl")
                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl4_rest[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                    const updatedClassR = await classData.updateOne(
                        { _id: clasRdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );

                    const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl4_rest[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                    updatedClassL = await classData.updateOne(
                        { _id: clasLdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );
                } else {
                    console.log("clusters_lvl4_rest lvl 1")
                    const updateLvl2Ref = await User.updateOne({ name: clusters_lvl4_rest[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                    const updatedClassR = await classData.updateOne(
                        { _id: clasRdata[0]._id },
                        { $set: { lvl1_count: 1 } }
                    );
                }
            } else {
                let clusters_lvl2_rest_mem;
                if (clsLvl == 'A') {
                    const userData = await getUserData(classDataId, "memberCount", 0);
                    clusters_lvl2_rest_mem = userData.clusters_lvl2;
                } else if (clsLvl == 'B') {
                    const userData = await getUserData(classDataId, "lvl2_memberCount", 0);
                    clusters_lvl2_rest_mem = userData.clusters_lvl2;
                } else if (clsLvl == 'C') {
                    const userData = await getUserData(classDataId, "lvl3_memberCount", 0);
                    clusters_lvl2_rest_mem = userData.clusters_lvl2;
                } else if (clsLvl == 'D') {
                    const userData = await getUserData(classDataId, "lvl4_memberCount", 0);
                    clusters_lvl2_rest_mem = userData.clusters_lvl2;
                }
                // const clusters_lvl2_rest_mem = await User.find({ $and: [{ "class_lvl": 2 }, { "class_name": classDataId }, { "memberCount": 0 }] }).sort({ 'updatedAt': 1 });
                const updateLvl2Ref = await User.updateOne({ name: clusters_lvl2_rest_mem[0].name }, { $set: { class_lvl: 1, class_name: clasRdata[0]._id, } })
                const updatedClassR = await classData.updateOne(
                    { _id: clasRdata[0]._id },
                    { $set: { lvl1_count: 1 } }
                );

                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl2_rest_mem[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                updatedClassL = await classData.updateOne(
                    { _id: clasLdata[0]._id },
                    { $set: { lvl1_count: 1 } }
                );
            }
        }
    }

    if (updatedClassL == undefined) {
        let clusters_lvl2;
        let clusters_lvl3;
        let clusters_lvl4;
        if (clsLvl == 'A') {
            const userData = await getUserData(classDataId, "memberCount", 2);
            clusters_lvl2 = userData.clusters_lvl2;
            clusters_lvl3 = userData.clusters_lvl3;
            clusters_lvl4 = userData.clusters_lvl4;
        } else if (clsLvl == 'B') {
            const userData = await getUserData(classDataId, "lvl2_memberCount", 1);
        }
        clasRdata = await classData.find(new ObjectId(ClassR));
        clasLdata = await classData.find(new ObjectId(ClassL));
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
        } else {
            let clusters_lvl2_rest;
            let clusters_lvl3_rest;
            let clusters_lvl4_rest;
            if (clsLvl == 'A') {
                const userData = await getUserData(classDataId, "memberCount", 1);
                clusters_lvl2_rest = userData.clusters_lvl2;
                clusters_lvl3_rest = userData.clusters_lvl3;
                clusters_lvl4_rest = userData.clusters_lvl4;
            } else if (clsLvl == 'B') {
                const userData = await getUserData(classDataId, "lvl2_memberCount", 1);
            }

            if (clusters_lvl2_rest[0] != undefined) {
                console.log("clusters_lvl2_rest lvl LL")
                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl2_rest[0].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                updatedClassL = await classData.updateOne(
                    { _id: clasLdata[0]._id },
                    { $set: { lvl1_count: 1 } }
                );
            }
            else if (clusters_lvl3_rest[0] != undefined) {
                console.log("clusters_lvl3_rest lvl LL")
                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl3_rest[0].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                updatedClassL = await classData.updateOne(
                    { _id: clasLdata[0]._id },
                    { $set: { lvl1_count: 1 } }
                );
            }
            else if (clusters_lvl4_rest[0] != undefined) {
                console.log("clusters_lvl4_rest lvl LL")
                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl4_rest[0].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                updatedClassL = await classData.updateOne(
                    { _id: clasLdata[0]._id },
                    { $set: { lvl1_count: 1 } }
                );
            } else {
                let clusters_lvl2_rest_mem;
                if (clsLvl == 'A') {
                    const userData = await getUserData(classDataId, "memberCount", 0);
                    clusters_lvl2_rest_mem = userData.clusters_lvl2;
                } else if (clsLvl == 'B') {
                    const userData = await getUserData(classDataId, "lvl2_memberCount", 1);
                }
                const updateLvl2_LRef = await User.updateOne({ name: clusters_lvl2_rest_mem[1].name }, { $set: { class_lvl: 1, class_name: clasLdata[0]._id, } })
                updatedClassL = await classData.updateOne(
                    { _id: clasLdata[0]._id },
                    { $set: { lvl1_count: 1 } }
                );
            }
        }
    }
}


async function updateClassAndUser(user_id, class_id, class_lvl, lvl_count, lvl_count_Val) {
    const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        {
            class_lvl: class_lvl,
            class_name: class_id,
        },
        { new: true }
    );

    const updatedClass = await classData.updateOne(
        { _id: class_id },
        { $set: { [lvl_count]: lvl_count_Val } }
    );
}


async function processClusters(ObjectId, clusters, ClassR, ClassL) {
    let clasRdata;
    let clasLdata;

    if (clusters[0] != undefined) {
        console.log(clusters.length, "length");

        for (let i = 0; i < clusters.length; i++) {
            clasRdata = await classData.find(new ObjectId(ClassR));
            clasLdata = await classData.find(new ObjectId(ClassL));
            const refkeyTest = clusters[i].refkey;

            if (refkeyTest == '') {
                console.log("im in processClusters no ref ");
                if (clasRdata[0].lvl2_count != 2) {
                    await updateClassAndUser(clusters[i]._id, clasRdata[0]._id, 2, 'lvl2_count', clasRdata[0].lvl2_count + 1);
                } else if (clasLdata[0].lvl2_count != 2) {
                    await updateClassAndUser(clusters[i]._id, clasLdata[0]._id, 2, 'lvl2_count', clasLdata[0].lvl2_count + 1);
                } else if (clasRdata[0].lvl3_count != 4) {
                    await updateClassAndUser(clusters[i]._id, clasRdata[0]._id, 3, 'lvl3_count', clasRdata[0].lvl3_count + 1);
                } else if (clasLdata[0].lvl3_count != 4) {
                    await updateClassAndUser(clusters[i]._id, clasLdata[0]._id, 3, 'lvl3_count', clasLdata[0].lvl3_count + 1);
                }
            } else {
                console.log("im in processClusters ref ");
                const refDataClass = await User.find(new ObjectId(clusters[i].refkey), { class_name: 1 }).sort({ 'updatedAt': 1 });
                const refMainClass = await classData.find(new ObjectId(refDataClass[0].class_name));

                // check same cls
                if (refMainClass[0].name == clasRdata[0].name) {
                    if (refMainClass[0].lvl2_count != 2) {
                        await updateClassAndUser(clusters[i]._id, refMainClass[0]._id, 2, 'lvl2_count', refMainClass[0].lvl2_count + 1);
                    } else if (refMainClass[0].lvl3_count != 4) {
                        await updateClassAndUser(clusters[i]._id, refMainClass[0]._id, 3, 'lvl3_count', refMainClass[0].lvl3_count + 1);
                    } else {
                        //add class type later 
                        const DataClass = await classData.find({ lvl3_count: { $ne: 4 } });
                        if (DataClass[0].lvl2_count != 2) {
                            await updateClassAndUser(clusters[i]._id, DataClass[0]._id, 2, 'lvl2_count', DataClass[0].lvl2_count + 1);
                        } else if (DataClass[0].lvl3_count != 4) {
                            await updateClassAndUser(clusters[i]._id, DataClass[0]._id, 3, 'lvl3_count', DataClass[0].lvl3_count + 1);
                        }
                    }
                } else {
                    if (clasRdata[0].lvl2_count != 2) {
                        await updateClassAndUser(clusters[i]._id, clasRdata[0]._id, 2, 'lvl2_count', clasRdata[0].lvl2_count + 1);
                    } else if (clasLdata[0].lvl2_count != 2) {
                        await updateClassAndUser(clusters[i]._id, clasLdata[0]._id, 2, 'lvl2_count', clasLdata[0].lvl2_count + 1);
                    } else if (clasRdata[0].lvl3_count != 4) {
                        await updateClassAndUser(clusters[i]._id, clasRdata[0]._id, 3, 'lvl3_count', clasRdata[0].lvl3_count + 1);
                    } else if (clasLdata[0].lvl3_count != 4) {
                        await updateClassAndUser(clusters[i]._id, clasLdata[0]._id, 3, 'lvl3_count', clasLdata[0].lvl3_count + 1);
                    }
                }


            }
        }
    }
}

async function processAndUpdateClusters(ObjectId, classDataId, witchCount, ClassR, ClassL, ClassName) {
    const userData = await getUserData(classDataId, witchCount, 2);

    await logic1Test(ObjectId, ClassR, ClassL, userData.clusters_lvl2, userData.clusters_lvl3, userData.clusters_lvl4, classDataId, ClassName);
    console.log("Logic1 Done");

    for (let i = 2; i >= 0; i--) {
        const userDataMemCount2 = await getUserData(classDataId, witchCount, i);
        await processClusters(ObjectId, userDataMemCount2.clusters_lvl2, ClassR, ClassL);
        await processClusters(ObjectId, userDataMemCount2.clusters_lvl3, ClassR, ClassL);
        await processClusters(ObjectId, userDataMemCount2.clusters_lvl4, ClassR, ClassL);
        console.log(`Logic ${i} Done`);
        await new Promise(resolve => setTimeout(resolve, 60000));
    }

}


async function UpdateRole(ObjectId, refGetId) {
    const refDataNew = await User.find(new ObjectId(refGetId));

    if (refDataNew[0].memberCount >= 4 && refDataNew[0].role == "member") {
        const updatedRefRocky = await User.findOneAndUpdate(
            { _id: refGetId },
            {
                role: "Rocky",
                // role_status:"pending"
            },
            { new: true }
        );
        // veteran

        if (refDataNew[0].refkey != "") {
            // todo : check other accut ref key also
            console.log(refDataNew[0].refkey, "refDataNew[0].refkey");
            const veteranId = refDataNew[0].refkey;

            const veteranData = await User.find(new ObjectId(veteranId));

            const updatedPerantUser = await User.findOneAndUpdate(
                { _id: veteranId },
                {
                    rookieCount: veteranData[0].rookieCount + 1,
                },
                { new: true }
            );

            const veteranDataNew = await User.find(new ObjectId(veteranId));

            if (veteranDataNew[0].rookieCount >= 4) {

                const updatedRefveteran = await User.findOneAndUpdate(
                    { _id: veteranId },
                    {
                        role: "veteran",
                        // role_status:"pending"
                    },
                    { new: true }
                );

                // Eliate

                if (veteranDataNew[0].refkey != "") {

                    console.log(veteranDataNew[0].refkey, "PerantDataNew[0].refkey");
                    const EliateId = veteranDataNew[0].refkey;

                    const EliateData = await User.find(new ObjectId(EliateId));

                    const updatedPerantUser = await User.findOneAndUpdate(
                        { _id: EliateId },
                        {
                            veteranCount: EliateData[0].veteranCount + 1,
                        },
                        { new: true }
                    );

                    const EliateDataNew = await User.find(new ObjectId(EliateId));

                    if (EliateDataNew[0].veteranCount >= 4) {

                        const updatedRefEliate = await User.findOneAndUpdate(
                            { _id: EliateId },
                            {
                                role: "Eliate", //master for now
                                // role_status:"pending"
                            },
                            { new: true }
                        );

                        // Master
                        if (EliateDataNew[0].refkey != "") {

                            console.log(EliateDataNew[0].refkey, "EliateDataNew[0].refkey");
                            const MasterId = EliateDataNew[0].refkey;

                            const MasterData = await User.find(new ObjectId(MasterId));

                            const updatedMasterUser = await User.findOneAndUpdate(
                                { _id: MasterId },
                                {
                                    masterCount: MasterData[0].masterCount + 1,
                                },
                                { new: true }
                            );

                            const MasterDataNew = await User.find(new ObjectId(MasterId));

                            if (MasterDataNew[0].masterCount >= 4) {

                                const updatedRefEliate = await User.findOneAndUpdate(
                                    { _id: MasterId },
                                    {
                                        role: "Master",
                                        // role_status:"pending"
                                    },
                                    { new: true }
                                );
                            }

                        }

                    }

                }
            }

        }
    }
}

export async function PUT(req1) {
    console.log("test1");
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
        console.log(classDataInfo_byID, "classDataInfo_byID");

        const classDataSchema =
        {
            name: "A",
            lvl1_count: 0,
            lvl2_count: 0,
            lvl3_count: 0,
            lvl4_count: 0,
        };

        if (UserData[0].refkey != refGetId && getUId != refGetId && classDataInfo_byID != undefined && classDataInfo_byID[0].name == 'A' && UserData[0].refkey == '') {
            // update ref 
            const updatedRef = await User.findOneAndUpdate(
                { _id: refGetId },
                {
                    memberCount: refData[0].memberCount + 1,
                },
                { new: true }
            );

            await UpdateRole(ObjectId, refGetId);

            if (classDataInfo_byID[0].lvl4_count != 8) {
                // update user 
                const updatedUser = await User.findOneAndUpdate(
                    { _id: getUId },
                    {
                        role: "member",
                        class_lvl: 4,
                        class_name: classDataId,
                        refkey: refGetId,
                    },
                    {
                        new: true,
                        timestamps: true
                    }
                );

                // update ref class
                const updatedRefCls = await classData.findOneAndUpdate(
                    { _id: classDataId },
                    {
                        lvl4_count: classDataInfo_byID[0].lvl4_count + 1,
                    },
                    { new: true }
                );

                if (updatedRefCls.lvl4_count == 8) {

                    const ClassRAll = await classData.create(classDataSchema);
                    const ClassR = ClassRAll._id;

                    const ClassLAll = await classData.create(classDataSchema);
                    const ClassL = ClassLAll._id;

                    await processAndUpdateClusters(ObjectId, classDataId, "memberCount", ClassR, ClassL, 'A');

                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classDataId }] }).sort({ 'updatedAt': 1 });
                    let refDataClassDetails;
                    let referDetails;

                    try {
                        referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                        console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                        refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                    } catch {
                        refDataClassDetails = "";
                    }

                    if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'B') {
                        const lvl2 = await classData.find({ $and: [{ "name": "B" }, { "lvl4_count": { $ne: 8 } }] });
                        const classLvl2Id = lvl2[0]._id

                        if (lvl2[0].lvl4_count != 8) {

                            const updatedUser = await User.findOneAndUpdate(
                                { _id: topLVL[0]._id },
                                {
                                    class_lvl: 4,
                                    class_name: lvl2[0]._id,
                                },
                                { new: true }
                            );

                            const updatedClass = await classData.findOneAndUpdate(
                                { _id: lvl2[0]._id },
                                {
                                    lvl4_count: lvl2[0].lvl4_count + 1,
                                },
                                { new: true }
                            );

                            if (updatedClass.lvl4_count == 8) {
                                const classBSchema =
                                {
                                    name: "B",
                                    lvl1_count: 0,
                                    lvl2_count: 0,
                                    lvl3_count: 0,
                                    lvl4_count: 0,
                                };
                                const ClassRAll = await classData.create(classBSchema);
                                const ClassR = ClassRAll._id;

                                const ClassLAll = await classData.create(classBSchema);
                                const ClassL = ClassLAll._id;

                                await processAndUpdateClusters(ObjectId, classLvl2Id, "lvl2_memberCount", ClassR, ClassL, 'B');

                                const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl2Id }] }).sort({ 'updatedAt': 1 });

                                let refDataClassDetails;
                                let referDetails;

                                try {
                                    referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                    console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                    refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                } catch {
                                    refDataClassDetails = "";
                                }

                                if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'C') {
                                    const lvl3 = await classData.find({ $and: [{ "name": "C" }, { "lvl4_count": { $ne: 8 } }] });
                                    const classLvl3Id = lvl3[0]._id

                                    if (lvl3[0].lvl4_count != 8) {

                                        const updatedUser = await User.findOneAndUpdate(
                                            { _id: topLVL[0]._id },
                                            {
                                                class_lvl: 4,
                                                class_name: lvl3[0]._id,
                                            },
                                            { new: true }
                                        );

                                        const updatedClass = await classData.findOneAndUpdate(
                                            { _id: lvl3[0]._id },
                                            {
                                                lvl4_count: lvl3[0].lvl4_count + 1,
                                            },
                                            { new: true }
                                        );

                                        if (updatedClass.lvl4_count == 8) {
                                            const classCSchema =
                                            {
                                                name: "C",
                                                lvl1_count: 0,
                                                lvl2_count: 0,
                                                lvl3_count: 0,
                                                lvl4_count: 0,
                                            };
                                            const ClassRAll = await classData.create(classCSchema);
                                            const ClassR = ClassRAll._id;

                                            const ClassLAll = await classData.create(classCSchema);
                                            const ClassL = ClassLAll._id;

                                            await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                            const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                            let refDataClassDetails;
                                            let referDetails;

                                            try {
                                                referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                                console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                                refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                            } catch {
                                                refDataClassDetails = "";
                                            }

                                            if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                                const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                                const classLvl4Id = lvl4[0]._id

                                                if (lvl4[0].lvl4_count != 8) {

                                                    const updatedUser = await User.findOneAndUpdate(
                                                        { _id: topLVL[0]._id },
                                                        {
                                                            class_lvl: 4,
                                                            class_name: lvl4[0]._id,
                                                        },
                                                        { new: true }
                                                    );

                                                    const updatedClass = await classData.findOneAndUpdate(
                                                        { _id: lvl4[0]._id },
                                                        {
                                                            lvl4_count: lvl4[0].lvl4_count + 1,
                                                        },
                                                        { new: true }
                                                    );
                                                    // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                                    if (updatedClass.lvl4_count == 8) {
                                                        const classDSchema =
                                                        {
                                                            name: "D",
                                                            lvl1_count: 0,
                                                            lvl2_count: 0,
                                                            lvl3_count: 0,
                                                            lvl4_count: 0,
                                                        };
                                                        const ClassRAll = await classData.create(classDSchema);
                                                        const ClassR = ClassRAll._id;

                                                        const ClassLAll = await classData.create(classDSchema);
                                                        const ClassL = ClassLAll._id;

                                                        await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                        const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                                        const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                                    }
                                                }

                                            }
                                            else {
                                                const updatedRef = await User.findOneAndUpdate(
                                                    { _id: referDetails[0]._id },
                                                    {
                                                        lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                                    },
                                                    { new: true }
                                                );

                                                const updatedUser = await User.findOneAndUpdate(
                                                    { _id: topLVL[0]._id },
                                                    {
                                                        class_lvl: 4,
                                                        class_name: refDataClassDetails[0]._id,
                                                    },
                                                    {
                                                        new: true,
                                                        timestamps: true
                                                    }
                                                );

                                                // update ref class
                                                const updatedRefCls = await classData.findOneAndUpdate(
                                                    { _id: refDataClassDetails[0]._id },
                                                    {
                                                        lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                                    },
                                                    { new: true }
                                                );

                                                if (updatedRefCls.lvl4_count == 8) {
                                                    const classDSchema =
                                                    {
                                                        name: "D",
                                                        lvl1_count: 0,
                                                        lvl2_count: 0,
                                                        lvl3_count: 0,
                                                        lvl4_count: 0,
                                                    };

                                                    const ClassRAll = await classData.create(classDSchema);
                                                    const ClassR = ClassRAll._id;

                                                    const ClassLAll = await classData.create(classDSchema);
                                                    const ClassL = ClassLAll._id;

                                                    await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                    // Do something to lvl4 Top user
                                                    // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                                }

                                            }

                                        }
                                    }

                                }
                                else {
                                    const updatedRef = await User.findOneAndUpdate(
                                        { _id: referDetails[0]._id },
                                        {
                                            lvl3_memberCount: referDetails[0].lvl3_memberCount + 1,
                                        },
                                        { new: true }
                                    );

                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: topLVL[0]._id },
                                        {
                                            class_lvl: 4,
                                            class_name: refDataClassDetails[0]._id,
                                        },
                                        {
                                            new: true,
                                            timestamps: true
                                        }
                                    );

                                    const updatedRefCls = await classData.findOneAndUpdate(
                                        { _id: refDataClassDetails[0]._id },
                                        {
                                            lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                        },
                                        { new: true }
                                    );

                                    if (updatedRefCls.lvl4_count == 8) {
                                        const classCSchema =
                                        {
                                            name: "C",
                                            lvl1_count: 0,
                                            lvl2_count: 0,
                                            lvl3_count: 0,
                                            lvl4_count: 0,
                                        };
                                        const ClassRAll = await classData.create(classCSchema);
                                        const ClassR = ClassRAll._id;

                                        const ClassLAll = await classData.create(classCSchema);
                                        const ClassL = ClassLAll._id;

                                        await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                        const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                        let refDataClassDetails;
                                        let referDetails;

                                        try {
                                            referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                            console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                            refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                        } catch {
                                            refDataClassDetails = "";
                                        }

                                        if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                            const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                            const classLvl4Id = lvl4[0]._id

                                            if (lvl4[0].lvl4_count != 8) {

                                                const updatedUser = await User.findOneAndUpdate(
                                                    { _id: topLVL[0]._id },
                                                    {
                                                        class_lvl: 4,
                                                        class_name: lvl4[0]._id,
                                                    },
                                                    { new: true }
                                                );

                                                const updatedClass = await classData.findOneAndUpdate(
                                                    { _id: lvl4[0]._id },
                                                    {
                                                        lvl4_count: lvl4[0].lvl4_count + 1,
                                                    },
                                                    { new: true }
                                                );
                                                // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                                if (updatedClass.lvl4_count == 8) {
                                                    const classDSchema =
                                                    {
                                                        name: "D",
                                                        lvl1_count: 0,
                                                        lvl2_count: 0,
                                                        lvl3_count: 0,
                                                        lvl4_count: 0,
                                                    };
                                                    const ClassRAll = await classData.create(classDSchema);
                                                    const ClassR = ClassRAll._id;

                                                    const ClassLAll = await classData.create(classDSchema);
                                                    const ClassL = ClassLAll._id;

                                                    await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                                    const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                                }
                                            }

                                        }
                                        else {
                                            const updatedRef = await User.findOneAndUpdate(
                                                { _id: referDetails[0]._id },
                                                {
                                                    lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                                },
                                                { new: true }
                                            );

                                            const updatedUser = await User.findOneAndUpdate(
                                                { _id: topLVL[0]._id },
                                                {
                                                    class_lvl: 4,
                                                    class_name: refDataClassDetails[0]._id,
                                                },
                                                {
                                                    new: true,
                                                    timestamps: true
                                                }
                                            );

                                            // update ref class
                                            const updatedRefCls = await classData.findOneAndUpdate(
                                                { _id: refDataClassDetails[0]._id },
                                                {
                                                    lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                                },
                                                { new: true }
                                            );

                                            if (updatedRefCls.lvl4_count == 8) {
                                                const classDSchema =
                                                {
                                                    name: "D",
                                                    lvl1_count: 0,
                                                    lvl2_count: 0,
                                                    lvl3_count: 0,
                                                    lvl4_count: 0,
                                                };

                                                const ClassRAll = await classData.create(classDSchema);
                                                const ClassR = ClassRAll._id;

                                                const ClassLAll = await classData.create(classDSchema);
                                                const ClassL = ClassLAll._id;

                                                await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                // Do something to lvl4 Top user
                                                // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                            }

                                        }

                                    }
                                }
                            }
                        }

                    }
                    else {
                        const updatedRef = await User.findOneAndUpdate(
                            { _id: referDetails[0]._id },
                            {
                                lvl2_memberCount: referDetails[0].lvl2_memberCount + 1,
                            },
                            { new: true }
                        );

                        const updatedUser = await User.findOneAndUpdate(
                            { _id: topLVL[0]._id },
                            {
                                class_lvl: 4,
                                class_name: refDataClassDetails[0]._id,
                            },
                            {
                                new: true,
                                timestamps: true
                            }
                        );

                        const updatedRefCls = await classData.findOneAndUpdate(
                            { _id: refDataClassDetails[0]._id },
                            {
                                lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                            },
                            { new: true }
                        );

                        if (updatedRefCls.lvl4_count == 8) {
                            const classBSchema =
                            {
                                name: "B",
                                lvl1_count: 0,
                                lvl2_count: 0,
                                lvl3_count: 0,
                                lvl4_count: 0,
                            };
                            const ClassRAll = await classData.create(classBSchema);
                            const ClassR = ClassRAll._id;

                            const ClassLAll = await classData.create(classBSchema);
                            const ClassL = ClassLAll._id;

                            await processAndUpdateClusters(ObjectId, classLvl2Id, "lvl2_memberCount", ClassR, ClassL, 'B');

                            const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl2Id }] }).sort({ 'updatedAt': 1 });

                            let refDataClassDetails;
                            let referDetails;

                            try {
                                referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                            } catch {
                                refDataClassDetails = "";
                            }

                            if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'C') {
                                const lvl3 = await classData.find({ $and: [{ "name": "C" }, { "lvl4_count": { $ne: 8 } }] });
                                const classLvl3Id = lvl3[0]._id

                                if (lvl3[0].lvl4_count != 8) {

                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: topLVL[0]._id },
                                        {
                                            class_lvl: 4,
                                            class_name: lvl3[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.findOneAndUpdate(
                                        { _id: lvl3[0]._id },
                                        {
                                            lvl4_count: lvl3[0].lvl4_count + 1,
                                        },
                                        { new: true }
                                    );

                                    if (updatedClass.lvl4_count == 8) {
                                        const classCSchema =
                                        {
                                            name: "C",
                                            lvl1_count: 0,
                                            lvl2_count: 0,
                                            lvl3_count: 0,
                                            lvl4_count: 0,
                                        };
                                        const ClassRAll = await classData.create(classCSchema);
                                        const ClassR = ClassRAll._id;

                                        const ClassLAll = await classData.create(classCSchema);
                                        const ClassL = ClassLAll._id;

                                        await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                        const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                        let refDataClassDetails;
                                        let referDetails;

                                        try {
                                            referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                            console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                            refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                        } catch {
                                            refDataClassDetails = "";
                                        }

                                        if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                            const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                            const classLvl4Id = lvl4[0]._id

                                            if (lvl4[0].lvl4_count != 8) {

                                                const updatedUser = await User.findOneAndUpdate(
                                                    { _id: topLVL[0]._id },
                                                    {
                                                        class_lvl: 4,
                                                        class_name: lvl4[0]._id,
                                                    },
                                                    { new: true }
                                                );

                                                const updatedClass = await classData.findOneAndUpdate(
                                                    { _id: lvl4[0]._id },
                                                    {
                                                        lvl4_count: lvl4[0].lvl4_count + 1,
                                                    },
                                                    { new: true }
                                                );
                                                // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                                if (updatedClass.lvl4_count == 8) {
                                                    const classDSchema =
                                                    {
                                                        name: "D",
                                                        lvl1_count: 0,
                                                        lvl2_count: 0,
                                                        lvl3_count: 0,
                                                        lvl4_count: 0,
                                                    };
                                                    const ClassRAll = await classData.create(classDSchema);
                                                    const ClassR = ClassRAll._id;

                                                    const ClassLAll = await classData.create(classDSchema);
                                                    const ClassL = ClassLAll._id;

                                                    await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                                    const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                                }
                                            }

                                        }
                                        else {
                                            const updatedRef = await User.findOneAndUpdate(
                                                { _id: referDetails[0]._id },
                                                {
                                                    lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                                },
                                                { new: true }
                                            );

                                            const updatedUser = await User.findOneAndUpdate(
                                                { _id: topLVL[0]._id },
                                                {
                                                    class_lvl: 4,
                                                    class_name: refDataClassDetails[0]._id,
                                                },
                                                {
                                                    new: true,
                                                    timestamps: true
                                                }
                                            );

                                            // update ref class
                                            const updatedRefCls = await classData.findOneAndUpdate(
                                                { _id: refDataClassDetails[0]._id },
                                                {
                                                    lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                                },
                                                { new: true }
                                            );

                                            if (updatedRefCls.lvl4_count == 8) {
                                                const classDSchema =
                                                {
                                                    name: "D",
                                                    lvl1_count: 0,
                                                    lvl2_count: 0,
                                                    lvl3_count: 0,
                                                    lvl4_count: 0,
                                                };

                                                const ClassRAll = await classData.create(classDSchema);
                                                const ClassR = ClassRAll._id;

                                                const ClassLAll = await classData.create(classDSchema);
                                                const ClassL = ClassLAll._id;

                                                await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                // Do something to lvl4 Top user
                                                // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                            }

                                        }

                                    }
                                }

                            }
                            else {
                                const updatedRef = await User.findOneAndUpdate(
                                    { _id: referDetails[0]._id },
                                    {
                                        lvl3_memberCount: referDetails[0].lvl3_memberCount + 1,
                                    },
                                    { new: true }
                                );

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: topLVL[0]._id },
                                    {
                                        class_lvl: 4,
                                        class_name: refDataClassDetails[0]._id,
                                    },
                                    {
                                        new: true,
                                        timestamps: true
                                    }
                                );

                                const updatedRefCls = await classData.findOneAndUpdate(
                                    { _id: refDataClassDetails[0]._id },
                                    {
                                        lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                    },
                                    { new: true }
                                );

                                if (updatedRefCls.lvl4_count == 8) {
                                    const classCSchema =
                                    {
                                        name: "C",
                                        lvl1_count: 0,
                                        lvl2_count: 0,
                                        lvl3_count: 0,
                                        lvl4_count: 0,
                                    };
                                    const ClassRAll = await classData.create(classCSchema);
                                    const ClassR = ClassRAll._id;

                                    const ClassLAll = await classData.create(classCSchema);
                                    const ClassL = ClassLAll._id;

                                    await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                    let refDataClassDetails;
                                    let referDetails;

                                    try {
                                        referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                        console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                        refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                    } catch {
                                        refDataClassDetails = "";
                                    }

                                    if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                        const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                        const classLvl4Id = lvl4[0]._id

                                        if (lvl4[0].lvl4_count != 8) {

                                            const updatedUser = await User.findOneAndUpdate(
                                                { _id: topLVL[0]._id },
                                                {
                                                    class_lvl: 4,
                                                    class_name: lvl4[0]._id,
                                                },
                                                { new: true }
                                            );

                                            const updatedClass = await classData.findOneAndUpdate(
                                                { _id: lvl4[0]._id },
                                                {
                                                    lvl4_count: lvl4[0].lvl4_count + 1,
                                                },
                                                { new: true }
                                            );
                                            // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                            if (updatedClass.lvl4_count == 8) {
                                                const classDSchema =
                                                {
                                                    name: "D",
                                                    lvl1_count: 0,
                                                    lvl2_count: 0,
                                                    lvl3_count: 0,
                                                    lvl4_count: 0,
                                                };
                                                const ClassRAll = await classData.create(classDSchema);
                                                const ClassR = ClassRAll._id;

                                                const ClassLAll = await classData.create(classDSchema);
                                                const ClassL = ClassLAll._id;

                                                await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                                const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                            }
                                        }

                                    }
                                    else {
                                        const updatedRef = await User.findOneAndUpdate(
                                            { _id: referDetails[0]._id },
                                            {
                                                lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                            },
                                            { new: true }
                                        );

                                        const updatedUser = await User.findOneAndUpdate(
                                            { _id: topLVL[0]._id },
                                            {
                                                class_lvl: 4,
                                                class_name: refDataClassDetails[0]._id,
                                            },
                                            {
                                                new: true,
                                                timestamps: true
                                            }
                                        );

                                        // update ref class
                                        const updatedRefCls = await classData.findOneAndUpdate(
                                            { _id: refDataClassDetails[0]._id },
                                            {
                                                lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                            },
                                            { new: true }
                                        );

                                        if (updatedRefCls.lvl4_count == 8) {
                                            const classDSchema =
                                            {
                                                name: "D",
                                                lvl1_count: 0,
                                                lvl2_count: 0,
                                                lvl3_count: 0,
                                                lvl4_count: 0,
                                            };

                                            const ClassRAll = await classData.create(classDSchema);
                                            const ClassR = ClassRAll._id;

                                            const ClassLAll = await classData.create(classDSchema);
                                            const ClassL = ClassLAll._id;

                                            await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                            // Do something to lvl4 Top user
                                            // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                        }

                                    }

                                }
                            }
                        }
                    }
                }
            }
        } else if (refGetId == '' || classDataInfo_byID[0].name != 'A' && UserData[0].refkey == '') {
            console.log("no ref", "no ref");
            const lvl2 = await classData.find({ $and: [{ "name": "A" }, { "lvl4_count": { $ne: 8 } }] });
            const classLvl2Id = lvl2[0]._id

            const updatedUser = await User.findOneAndUpdate(
                { _id: getUId },
                {
                    role: "member",
                    class_lvl: 4,
                    class_name: classLvl2Id
                },
                {
                    new: true,
                    timestamps: true
                }
            );

            // update ref class
            const updatedRefCls = await classData.findOneAndUpdate(
                { _id: classLvl2Id },
                {
                    lvl4_count: classLvl2Id[0].lvl4_count + 1,
                },
                { new: true }
            );

            if (updatedRefCls.lvl4_count == 8) {

                const ClassRAll = await classData.create(classDataSchema);
                const ClassR = ClassRAll._id;

                const ClassLAll = await classData.create(classDataSchema);
                const ClassL = ClassLAll._id;

                await processAndUpdateClusters(ObjectId, classDataId, "memberCount", ClassR, ClassL, 'A');

                const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classDataId }] }).sort({ 'updatedAt': 1 });
                let refDataClassDetails;
                let referDetails;

                try {
                    referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                    console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                    refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                } catch {
                    refDataClassDetails = "";
                }

                if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'B') {
                    const lvl2 = await classData.find({ $and: [{ "name": "B" }, { "lvl4_count": { $ne: 8 } }] });
                    const classLvl2Id = lvl2[0]._id

                    if (lvl2[0].lvl4_count != 8) {

                        const updatedUser = await User.findOneAndUpdate(
                            { _id: topLVL[0]._id },
                            {
                                class_lvl: 4,
                                class_name: lvl2[0]._id,
                            },
                            { new: true }
                        );

                        const updatedClass = await classData.findOneAndUpdate(
                            { _id: lvl2[0]._id },
                            {
                                lvl4_count: lvl2[0].lvl4_count + 1,
                            },
                            { new: true }
                        );

                        if (updatedClass.lvl4_count == 8) {
                            const classBSchema =
                            {
                                name: "B",
                                lvl1_count: 0,
                                lvl2_count: 0,
                                lvl3_count: 0,
                                lvl4_count: 0,
                            };
                            const ClassRAll = await classData.create(classBSchema);
                            const ClassR = ClassRAll._id;

                            const ClassLAll = await classData.create(classBSchema);
                            const ClassL = ClassLAll._id;

                            await processAndUpdateClusters(ObjectId, classLvl2Id, "lvl2_memberCount", ClassR, ClassL, 'B');

                            const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl2Id }] }).sort({ 'updatedAt': 1 });

                            let refDataClassDetails;
                            let referDetails;

                            try {
                                referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                            } catch {
                                refDataClassDetails = "";
                            }

                            if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'C') {
                                const lvl3 = await classData.find({ $and: [{ "name": "C" }, { "lvl4_count": { $ne: 8 } }] });
                                const classLvl3Id = lvl3[0]._id

                                if (lvl3[0].lvl4_count != 8) {

                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: topLVL[0]._id },
                                        {
                                            class_lvl: 4,
                                            class_name: lvl3[0]._id,
                                        },
                                        { new: true }
                                    );

                                    const updatedClass = await classData.findOneAndUpdate(
                                        { _id: lvl3[0]._id },
                                        {
                                            lvl4_count: lvl3[0].lvl4_count + 1,
                                        },
                                        { new: true }
                                    );

                                    if (updatedClass.lvl4_count == 8) {
                                        const classCSchema =
                                        {
                                            name: "C",
                                            lvl1_count: 0,
                                            lvl2_count: 0,
                                            lvl3_count: 0,
                                            lvl4_count: 0,
                                        };
                                        const ClassRAll = await classData.create(classCSchema);
                                        const ClassR = ClassRAll._id;

                                        const ClassLAll = await classData.create(classCSchema);
                                        const ClassL = ClassLAll._id;

                                        await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                        const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                        let refDataClassDetails;
                                        let referDetails;

                                        try {
                                            referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                            console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                            refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                        } catch {
                                            refDataClassDetails = "";
                                        }

                                        if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                            const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                            const classLvl4Id = lvl4[0]._id

                                            if (lvl4[0].lvl4_count != 8) {

                                                const updatedUser = await User.findOneAndUpdate(
                                                    { _id: topLVL[0]._id },
                                                    {
                                                        class_lvl: 4,
                                                        class_name: lvl4[0]._id,
                                                    },
                                                    { new: true }
                                                );

                                                const updatedClass = await classData.findOneAndUpdate(
                                                    { _id: lvl4[0]._id },
                                                    {
                                                        lvl4_count: lvl4[0].lvl4_count + 1,
                                                    },
                                                    { new: true }
                                                );
                                                // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                                if (updatedClass.lvl4_count == 8) {
                                                    const classDSchema =
                                                    {
                                                        name: "D",
                                                        lvl1_count: 0,
                                                        lvl2_count: 0,
                                                        lvl3_count: 0,
                                                        lvl4_count: 0,
                                                    };
                                                    const ClassRAll = await classData.create(classDSchema);
                                                    const ClassR = ClassRAll._id;

                                                    const ClassLAll = await classData.create(classDSchema);
                                                    const ClassL = ClassLAll._id;

                                                    await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                                    const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                                }
                                            }

                                        }
                                        else {
                                            const updatedRef = await User.findOneAndUpdate(
                                                { _id: referDetails[0]._id },
                                                {
                                                    lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                                },
                                                { new: true }
                                            );

                                            const updatedUser = await User.findOneAndUpdate(
                                                { _id: topLVL[0]._id },
                                                {
                                                    class_lvl: 4,
                                                    class_name: refDataClassDetails[0]._id,
                                                },
                                                {
                                                    new: true,
                                                    timestamps: true
                                                }
                                            );

                                            // update ref class
                                            const updatedRefCls = await classData.findOneAndUpdate(
                                                { _id: refDataClassDetails[0]._id },
                                                {
                                                    lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                                },
                                                { new: true }
                                            );

                                            if (updatedRefCls.lvl4_count == 8) {
                                                const classDSchema =
                                                {
                                                    name: "D",
                                                    lvl1_count: 0,
                                                    lvl2_count: 0,
                                                    lvl3_count: 0,
                                                    lvl4_count: 0,
                                                };

                                                const ClassRAll = await classData.create(classDSchema);
                                                const ClassR = ClassRAll._id;

                                                const ClassLAll = await classData.create(classDSchema);
                                                const ClassL = ClassLAll._id;

                                                await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                // Do something to lvl4 Top user
                                                // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                            }

                                        }

                                    }
                                }

                            }
                            else {
                                const updatedRef = await User.findOneAndUpdate(
                                    { _id: referDetails[0]._id },
                                    {
                                        lvl3_memberCount: referDetails[0].lvl3_memberCount + 1,
                                    },
                                    { new: true }
                                );

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: topLVL[0]._id },
                                    {
                                        class_lvl: 4,
                                        class_name: refDataClassDetails[0]._id,
                                    },
                                    {
                                        new: true,
                                        timestamps: true
                                    }
                                );

                                const updatedRefCls = await classData.findOneAndUpdate(
                                    { _id: refDataClassDetails[0]._id },
                                    {
                                        lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                    },
                                    { new: true }
                                );

                                if (updatedRefCls.lvl4_count == 8) {
                                    const classCSchema =
                                    {
                                        name: "C",
                                        lvl1_count: 0,
                                        lvl2_count: 0,
                                        lvl3_count: 0,
                                        lvl4_count: 0,
                                    };
                                    const ClassRAll = await classData.create(classCSchema);
                                    const ClassR = ClassRAll._id;

                                    const ClassLAll = await classData.create(classCSchema);
                                    const ClassL = ClassLAll._id;

                                    await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                    let refDataClassDetails;
                                    let referDetails;

                                    try {
                                        referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                        console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                        refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                    } catch {
                                        refDataClassDetails = "";
                                    }

                                    if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                        const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                        const classLvl4Id = lvl4[0]._id

                                        if (lvl4[0].lvl4_count != 8) {

                                            const updatedUser = await User.findOneAndUpdate(
                                                { _id: topLVL[0]._id },
                                                {
                                                    class_lvl: 4,
                                                    class_name: lvl4[0]._id,
                                                },
                                                { new: true }
                                            );

                                            const updatedClass = await classData.findOneAndUpdate(
                                                { _id: lvl4[0]._id },
                                                {
                                                    lvl4_count: lvl4[0].lvl4_count + 1,
                                                },
                                                { new: true }
                                            );
                                            // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                            if (updatedClass.lvl4_count == 8) {
                                                const classDSchema =
                                                {
                                                    name: "D",
                                                    lvl1_count: 0,
                                                    lvl2_count: 0,
                                                    lvl3_count: 0,
                                                    lvl4_count: 0,
                                                };
                                                const ClassRAll = await classData.create(classDSchema);
                                                const ClassR = ClassRAll._id;

                                                const ClassLAll = await classData.create(classDSchema);
                                                const ClassL = ClassLAll._id;

                                                await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                                const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                            }
                                        }

                                    }
                                    else {
                                        const updatedRef = await User.findOneAndUpdate(
                                            { _id: referDetails[0]._id },
                                            {
                                                lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                            },
                                            { new: true }
                                        );

                                        const updatedUser = await User.findOneAndUpdate(
                                            { _id: topLVL[0]._id },
                                            {
                                                class_lvl: 4,
                                                class_name: refDataClassDetails[0]._id,
                                            },
                                            {
                                                new: true,
                                                timestamps: true
                                            }
                                        );

                                        // update ref class
                                        const updatedRefCls = await classData.findOneAndUpdate(
                                            { _id: refDataClassDetails[0]._id },
                                            {
                                                lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                            },
                                            { new: true }
                                        );

                                        if (updatedRefCls.lvl4_count == 8) {
                                            const classDSchema =
                                            {
                                                name: "D",
                                                lvl1_count: 0,
                                                lvl2_count: 0,
                                                lvl3_count: 0,
                                                lvl4_count: 0,
                                            };

                                            const ClassRAll = await classData.create(classDSchema);
                                            const ClassR = ClassRAll._id;

                                            const ClassLAll = await classData.create(classDSchema);
                                            const ClassL = ClassLAll._id;

                                            await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                            // Do something to lvl4 Top user
                                            // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                        }

                                    }

                                }
                            }
                        }
                    }

                }
                else {
                    const updatedRef = await User.findOneAndUpdate(
                        { _id: referDetails[0]._id },
                        {
                            lvl2_memberCount: referDetails[0].lvl2_memberCount + 1,
                        },
                        { new: true }
                    );

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: topLVL[0]._id },
                        {
                            class_lvl: 4,
                            class_name: refDataClassDetails[0]._id,
                        },
                        {
                            new: true,
                            timestamps: true
                        }
                    );

                    const updatedRefCls = await classData.findOneAndUpdate(
                        { _id: refDataClassDetails[0]._id },
                        {
                            lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                        },
                        { new: true }
                    );

                    if (updatedRefCls.lvl4_count == 8) {
                        const classBSchema =
                        {
                            name: "B",
                            lvl1_count: 0,
                            lvl2_count: 0,
                            lvl3_count: 0,
                            lvl4_count: 0,
                        };
                        const ClassRAll = await classData.create(classBSchema);
                        const ClassR = ClassRAll._id;

                        const ClassLAll = await classData.create(classBSchema);
                        const ClassL = ClassLAll._id;

                        await processAndUpdateClusters(ObjectId, classLvl2Id, "lvl2_memberCount", ClassR, ClassL, 'B');

                        const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl2Id }] }).sort({ 'updatedAt': 1 });

                        let refDataClassDetails;
                        let referDetails;

                        try {
                            referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                            console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                            refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                        } catch {
                            refDataClassDetails = "";
                        }

                        if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'C') {
                            const lvl3 = await classData.find({ $and: [{ "name": "C" }, { "lvl4_count": { $ne: 8 } }] });
                            const classLvl3Id = lvl3[0]._id

                            if (lvl3[0].lvl4_count != 8) {

                                const updatedUser = await User.findOneAndUpdate(
                                    { _id: topLVL[0]._id },
                                    {
                                        class_lvl: 4,
                                        class_name: lvl3[0]._id,
                                    },
                                    { new: true }
                                );

                                const updatedClass = await classData.findOneAndUpdate(
                                    { _id: lvl3[0]._id },
                                    {
                                        lvl4_count: lvl3[0].lvl4_count + 1,
                                    },
                                    { new: true }
                                );

                                if (updatedClass.lvl4_count == 8) {
                                    const classCSchema =
                                    {
                                        name: "C",
                                        lvl1_count: 0,
                                        lvl2_count: 0,
                                        lvl3_count: 0,
                                        lvl4_count: 0,
                                    };
                                    const ClassRAll = await classData.create(classCSchema);
                                    const ClassR = ClassRAll._id;

                                    const ClassLAll = await classData.create(classCSchema);
                                    const ClassL = ClassLAll._id;

                                    await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                    const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                    let refDataClassDetails;
                                    let referDetails;

                                    try {
                                        referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                        console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                        refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                    } catch {
                                        refDataClassDetails = "";
                                    }

                                    if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                        const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                        const classLvl4Id = lvl4[0]._id

                                        if (lvl4[0].lvl4_count != 8) {

                                            const updatedUser = await User.findOneAndUpdate(
                                                { _id: topLVL[0]._id },
                                                {
                                                    class_lvl: 4,
                                                    class_name: lvl4[0]._id,
                                                },
                                                { new: true }
                                            );

                                            const updatedClass = await classData.findOneAndUpdate(
                                                { _id: lvl4[0]._id },
                                                {
                                                    lvl4_count: lvl4[0].lvl4_count + 1,
                                                },
                                                { new: true }
                                            );
                                            // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                            if (updatedClass.lvl4_count == 8) {
                                                const classDSchema =
                                                {
                                                    name: "D",
                                                    lvl1_count: 0,
                                                    lvl2_count: 0,
                                                    lvl3_count: 0,
                                                    lvl4_count: 0,
                                                };
                                                const ClassRAll = await classData.create(classDSchema);
                                                const ClassR = ClassRAll._id;

                                                const ClassLAll = await classData.create(classDSchema);
                                                const ClassL = ClassLAll._id;

                                                await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                                const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                                const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                            }
                                        }

                                    }
                                    else {
                                        const updatedRef = await User.findOneAndUpdate(
                                            { _id: referDetails[0]._id },
                                            {
                                                lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                            },
                                            { new: true }
                                        );

                                        const updatedUser = await User.findOneAndUpdate(
                                            { _id: topLVL[0]._id },
                                            {
                                                class_lvl: 4,
                                                class_name: refDataClassDetails[0]._id,
                                            },
                                            {
                                                new: true,
                                                timestamps: true
                                            }
                                        );

                                        // update ref class
                                        const updatedRefCls = await classData.findOneAndUpdate(
                                            { _id: refDataClassDetails[0]._id },
                                            {
                                                lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                            },
                                            { new: true }
                                        );

                                        if (updatedRefCls.lvl4_count == 8) {
                                            const classDSchema =
                                            {
                                                name: "D",
                                                lvl1_count: 0,
                                                lvl2_count: 0,
                                                lvl3_count: 0,
                                                lvl4_count: 0,
                                            };

                                            const ClassRAll = await classData.create(classDSchema);
                                            const ClassR = ClassRAll._id;

                                            const ClassLAll = await classData.create(classDSchema);
                                            const ClassL = ClassLAll._id;

                                            await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                            // Do something to lvl4 Top user
                                            // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                        }

                                    }

                                }
                            }

                        }
                        else {
                            const updatedRef = await User.findOneAndUpdate(
                                { _id: referDetails[0]._id },
                                {
                                    lvl3_memberCount: referDetails[0].lvl3_memberCount + 1,
                                },
                                { new: true }
                            );

                            const updatedUser = await User.findOneAndUpdate(
                                { _id: topLVL[0]._id },
                                {
                                    class_lvl: 4,
                                    class_name: refDataClassDetails[0]._id,
                                },
                                {
                                    new: true,
                                    timestamps: true
                                }
                            );

                            const updatedRefCls = await classData.findOneAndUpdate(
                                { _id: refDataClassDetails[0]._id },
                                {
                                    lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                },
                                { new: true }
                            );

                            if (updatedRefCls.lvl4_count == 8) {
                                const classCSchema =
                                {
                                    name: "C",
                                    lvl1_count: 0,
                                    lvl2_count: 0,
                                    lvl3_count: 0,
                                    lvl4_count: 0,
                                };
                                const ClassRAll = await classData.create(classCSchema);
                                const ClassR = ClassRAll._id;

                                const ClassLAll = await classData.create(classCSchema);
                                const ClassL = ClassLAll._id;

                                await processAndUpdateClusters(ObjectId, classLvl3Id, "lvl3_memberCount", ClassR, ClassL, 'C');

                                const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl3Id }] }).sort({ 'updatedAt': 1 });

                                let refDataClassDetails;
                                let referDetails;

                                try {
                                    referDetails = await User.find(new ObjectId(topLVL[0].refkey));
                                    console.log("🚀 ~ file: route.js:44 ~ PUT ~ referDetails:", referDetails)
                                    refDataClassDetails = await classData.find(new ObjectId(referDetails[0].class_name));
                                } catch {
                                    refDataClassDetails = "";
                                }

                                if (topLVL[0].refkey == '' || refDataClassDetails[0].name != 'D') {
                                    const lvl4 = await classData.find({ $and: [{ "name": "D" }, { "lvl4_count": { $ne: 8 } }] });
                                    const classLvl4Id = lvl4[0]._id

                                    if (lvl4[0].lvl4_count != 8) {

                                        const updatedUser = await User.findOneAndUpdate(
                                            { _id: topLVL[0]._id },
                                            {
                                                class_lvl: 4,
                                                class_name: lvl4[0]._id,
                                            },
                                            { new: true }
                                        );

                                        const updatedClass = await classData.findOneAndUpdate(
                                            { _id: lvl4[0]._id },
                                            {
                                                lvl4_count: lvl4[0].lvl4_count + 1,
                                            },
                                            { new: true }
                                        );
                                        // console.log("🚀 ~ file: route.js:1743 ~ PUT ~ updatedClass:", updatedClass)

                                        if (updatedClass.lvl4_count == 8) {
                                            const classDSchema =
                                            {
                                                name: "D",
                                                lvl1_count: 0,
                                                lvl2_count: 0,
                                                lvl3_count: 0,
                                                lvl4_count: 0,
                                            };
                                            const ClassRAll = await classData.create(classDSchema);
                                            const ClassR = ClassRAll._id;

                                            const ClassLAll = await classData.create(classDSchema);
                                            const ClassL = ClassLAll._id;

                                            await processAndUpdateClusters(ObjectId, classLvl4Id, "lvl4_memberCount", ClassR, ClassL, 'D');

                                            const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": classLvl4Id }] }).sort({ 'updatedAt': 1 });
                                            const topLVLClassName = await classData.find(new ObjectId(topLVL[0].class_name));
                                        }
                                    }

                                }
                                else {
                                    const updatedRef = await User.findOneAndUpdate(
                                        { _id: referDetails[0]._id },
                                        {
                                            lvl4_memberCount: referDetails[0].lvl4_memberCount + 1,
                                        },
                                        { new: true }
                                    );

                                    const updatedUser = await User.findOneAndUpdate(
                                        { _id: topLVL[0]._id },
                                        {
                                            class_lvl: 4,
                                            class_name: refDataClassDetails[0]._id,
                                        },
                                        {
                                            new: true,
                                            timestamps: true
                                        }
                                    );

                                    // update ref class
                                    const updatedRefCls = await classData.findOneAndUpdate(
                                        { _id: refDataClassDetails[0]._id },
                                        {
                                            lvl4_count: refDataClassDetails[0].lvl4_count + 1,
                                        },
                                        { new: true }
                                    );

                                    if (updatedRefCls.lvl4_count == 8) {
                                        const classDSchema =
                                        {
                                            name: "D",
                                            lvl1_count: 0,
                                            lvl2_count: 0,
                                            lvl3_count: 0,
                                            lvl4_count: 0,
                                        };

                                        const ClassRAll = await classData.create(classDSchema);
                                        const ClassR = ClassRAll._id;

                                        const ClassLAll = await classData.create(classDSchema);
                                        const ClassL = ClassLAll._id;

                                        await processAndUpdateClusters(ObjectId, topLVLClassData, "lvl4_memberCount", ClassR, ClassL, 'D');

                                        // Do something to lvl4 Top user
                                        // const topLVL = await User.find({ $and: [{ "class_lvl": 1 }, { "class_name": topLVLClassData }] }).sort({ 'updatedAt': 1 });
                                    }

                                }

                            }
                        }
                    }
                }
            }

        }
        // else if(UserData[0].class_name == '' ){
        //     console.log("not a ref", "not a ref");
        // }
        else {
            console.log("user in cls", "user in cls");
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Maybe User Alredy In a Class! Please Contact HR",
            });
        }
        console.log("All done MyBoy");

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
