const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/Final_Project';

//------------ ฟังก์ชันสำหรับ เปิดและปิดการเชื่อมต่อกับฐานข้อมูล  ----------------
async function connectDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}

async function closeDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  } catch (error) {
    console.error('Failed to close database connection:', error);
    throw error;
  }
}
//--------------------------------------------------------------------

async function insertData(data, DataModel) {
  try {
    const user = new DataModel(data);
    const result = await user.save();

    console.log('Data added successfully:', result);
  } catch (error) {
    console.error('Failed to insert data:', error);
    throw error;
  }
}

async function getData(DataModel) {
  try {
    const data = await DataModel.find({}).exec();
    return data;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error;
  }
}

async function updateData(id, newData, DataModel) {
  try {
    const result = await DataModel.updateOne({ ID: id }, { $set: newData }).exec();
    console.log('Data updated successfully:', result);
  } catch (error) {
    console.error('Failed to update Data:', error);
    throw error;
  }
}

async function getDataById(id, DataModel) {
  try {
    const data = await DataModel.findOne({ ID: id }).exec();
    return data;
  } catch (error) {
    console.error('Failed to retrieve Data:', error);
    throw error;
  }
}
async function getData_By_USER_Email(email, DataModel) {
  try {
    const data = await DataModel.findOne({ USER_EMAIL: email }).exec();
    return data;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการ Get User By Email', error);
    throw error;
  }
}

// ฟังชันนี้นี้สร้างขึ้นเพื่อให้การสร้าง ID ใน MoogoDB เป็นรูปแบบตัวเลขที่อ่านง่าย
// โดยตัวเลขที่จะนำไปกำหนด ID คือให้ใช้ค่า ID ที่มากที่สุดในปัจจุบัน แล้วเพิ่มค่า 1 
// สร้างขึ้นเพื่อใช้แทน _id ของ MongoDB ที่สร้างให้อัตโนมัติอ่านค่ายาก
async function getNextDataId(DataModel) {
  try {
    const data = await DataModel.find().sort({ ID: -1 }).limit(1).exec();
    const maxId = data.length > 0 ? data[0].ID : 0;
    return maxId + 1;
  } catch (error) {
    console.error('Failed to get next id:', error);
    throw error;
  }
}

////==================== ฟังก์ชันสำหรับ DelteData เขียนเผื่อได้ใช้งานในอนาคต ==========================
// async function deleteData(id, DataModel) {
//   try {
//     const result = await DataModel.deleteOne({ ID: id }).exec();
//     console.log('Data deleted successfully:', result);
//   } catch (error) {
//     console.error('Failed to delete Data:', error);
//     throw error;
//   }
// }



// //-----------------------------------------------------------------------------------
// async function getToken_check(Token, DataModel) {
//   try {
//     const data = await DataModel.findOne({ Token: Token }).exec();
//     return data;
//   } catch (error) {
//     console.error('Failed to retrieve Data:', error);
//     throw error;
//   }
// }



module.exports = {
  connectDatabase,
  closeDatabase,
  insertData,
  getData,
  updateData,
  // deleteData,
  getDataById,
  getNextDataId,
  getToken_check,
  getData_By_USER_Email
};
