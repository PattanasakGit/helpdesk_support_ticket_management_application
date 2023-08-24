const mongoose = require('mongoose');
const StatusModel = require('../schema/Status_schema'); // ให้ตรงกับ path ที่คุณใช้

// Mocking the mongoose.model function
mongoose.model = jest.fn(() => StatusModel);

describe('Status Model Unit Tests', () => {
    test('ทดสอบการเพิ่มข้อมูล Status ที่กรอกค่ามาครบ', () => {
        const Status = {
            ID: 1,
            STATSU_NAME: 'Test Tile',
            CREATE_TIME: new Date(),
            UPDATE_TIME: new Date(),
        };
        const Status_Tets = new StatusModel(Status);
        const validationError = Status_Tets.validateSync(); //validateSync เช็คเทียบกับ Schema ที่เราเขียนเอาไว้
        expect(validationError).toBeUndefined(); //ถ้าทุกอย่างถูกต้องจะไม่พบ  error
    });
    test('ทดสอบการเพิ่มข้อมูล Status ที่กรอกค่ามาไม่ครบ', () => {
        const Status = {
            ID: 1,
            STATSU_NAME: '',
            CREATE_TIME: new Date(),
            UPDATE_TIME: new Date(),
        };
        const Status_Tets = new StatusModel(Status);
        const validationError = Status_Tets.validateSync();
        expect(validationError).toBeDefined();
    });


});