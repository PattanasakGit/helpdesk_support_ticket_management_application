const mongoose = require('mongoose');
const { insertData, getData, updateData, getDataById, getUserBy_Email, getNextDataId } = require('./Database');
const TicketModel = require('../schema/Tricket_schema');

const DataModel = TicketModel;

async function CreateTicket(req, res) {
    try {
        const Ticket = req.body;
        Ticket.ID = await getNextDataId(DataModel); // สร้าง ID ขึ้นมาใหม่เพื่อใช้แทน _id ของ mongoDB เพื่อให้อ่านและจัดการกับ ID ได้ง่าย
        Ticket.CREATE_TIME = new Date().getTime(); // เก็บค่า Timestamp ลงฐานข้อมูลตอนสร้าง Ticket ใหม่
        Ticket.UPDATE_TIME = Ticket.CREATE_TIME; // สร้างครั้งแรกเวลาแก้ไขล่าสุดจะเท่ากับเวลาสร้าง

        await insertData(Ticket, DataModel);

        console.log('Ticket added successfully');
        res.status(200).json({ status: true, message: 'Ticket added successfully' });
    } catch (error) {
        console.error('Failed to insert Ticket:', error);
        res.status(500).json({ error: error.message });
    }
}

async function UpdateTicket(req, res) {
    try {
        const { id } = req.params;
        const newData = req.body;
        newData.UPDATE_TIME = new Date().getTime();

        await updateData(id, newData, DataModel);
        console.log('Ticket updated successfully');
        res.status(200).json({ status: true, message: 'Ticket updated successfully' });
    } catch (error) {
        console.error('Failed to update Ticket:', error);
        res.status(500).json({ error: error.message });
    }
}

async function ListTicket(req, res) {
    try {
        const data = await getData(DataModel);
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to retrieve ListTicket:', error);
        res.status(500).json({ error: error.message });
    }
}

async function GetTicketById(req, res) {
    try {
        const { id } = req.params;
        const Ticket = await getDataById(id, DataModel);

        if (!Ticket) {
            return res.status(404).json({ error: 'Ticket not found ' });
        }

        res.status(200).json(Ticket);
    } catch (error) {
        console.error('Failed to retrieve Ticket:', error);
        res.status(500).json({ error: error.message });
    }
}

////==================== ฟังก์ชันสำหรับ Deltedate เขียนเผื่อได้ใช้งานในอนาคต ==========================
// async function DeleteTicket(req, res) {
//     try {
//         const { id } = req.params;

//         await deleteData(id, DataModel);

//         console.log('Ticket deleted successfully');
//         res.status(200).json({ status: true, message: 'Ticket deleted successfully' });
//     } catch (error) {
//         console.error('Failed to delete Ticket:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

module.exports = {
    CreateTicket,
    UpdateTicket,
    ListTicket,
    GetTicketById,
};