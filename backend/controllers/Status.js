const mongoose = require('mongoose');
const { insertData, getData, updateData, getDataById, getUserBy_Email, getNextDataId } = require('./Database');
const StatusModel = require('../schema/Status_schema');

const DataModel = StatusModel;

async function CreateStatus(req, res) {
    try {
        const Status = req.body;
        Status.ID = await getNextDataId(DataModel); // สร้าง ID ขึ้นมาใหม่เพื่อใช้แทน _id ของ mongoDB เพื่อให้อ่านและจัดการกับ ID ได้ง่าย
        Status.CREATE_TIME = new Date().getTime(); // เก็บค่า Timestamp ลงฐานข้อมูลตอนสร้าง Status ใหม่
        Status.UPDATE_TIME = Status.CREATE_TIME; // สร้างครั้งแรกเวลาแก้ไขล่าสุดจะเท่ากับเวลาสร้าง

        await insertData(Status, DataModel);

        console.log('Status added successfully');
        res.status(200).json({ status: true, message: 'Status added successfully' });
    } catch (error) {
        console.error('Failed to insert Status:', error);
        res.status(500).json({ error: error.message });
    }
}

async function UpdateStatus(req, res) {
    try {
        const { id } = req.params;
        const newData = req.body;
        newData.UPDATE_TIME = new Date().getTime();

        await updateData(id, newData, DataModel);
        console.log('Status updated successfully');
        res.status(200).json({ status: true, message: 'Status updated successfully' });
    } catch (error) {
        console.error('Failed to update Status:', error);
        res.status(500).json({ error: error.message });
    }
}

async function ListStatus(req, res) {
    try {
        const data = await getData(DataModel);
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to retrieve ListStatus:', error);
        res.status(500).json({ error: error.message });
    }
}

async function GetStatusById(req, res) {
    try {
        const { id } = req.params;
        const Status = await getDataById(id, DataModel);

        if (!Status) {
            return res.status(404).json({ error: 'Status not found ' });
        }

        res.status(200).json(Status);
    } catch (error) {
        console.error('Failed to retrieve Status:', error);
        res.status(500).json({ error: error.message });
    }
}

////==================== ฟังก์ชันสำหรับ Deltedat เขียนเผื่อได้ใช้งานในอนาคต ==========================
// async function DeleteStatus(req, res) {
//     try {
//         const { id } = req.params;

//         await deleteData(id, DataModel);

//         console.log('Status deleted successfully');
//         res.status(200).json({ status: true, message: 'Status deleted successfully' });
//     } catch (error) {
//         console.error('Failed to delete Status:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

module.exports = {
    CreateStatus,
    UpdateStatus,
    ListStatus,
    GetStatusById,
};