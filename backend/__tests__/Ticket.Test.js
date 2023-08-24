const mongoose = require('mongoose');
const TicketModel = require('../schema/Tricket_schema'); // ให้ตรงกับ path ที่คุณใช้

// Mocking the mongoose.model function
mongoose.model = jest.fn(() => TicketModel);

describe('Ticket Model Unit Tests', () => {
    test('ทดสอบ Validate Email ที่ถูกต้อง', () => {
        const validEmail = 'putjat145@gmail.com';
        const ticket = new TicketModel({
            ID: 1,
            TITLE: 'Test Tile',
            DESCRIPTION: 'Pattanasat Testing',
            CONTACT: 'Pattanasak LineID:theput',
            CREATE_TIME: new Date(),
            UPDATE_TIME: new Date(),
            USER_EMAIL: validEmail
        });
        const validationError = ticket.validateSync(); //validateSync เช็คเทียบกับ Schema ที่เราเขียนเอาไว้
        expect(validationError).toBeUndefined(); //ถ้าทุกอย่างถูกต้องจะไม่พบ  error
    });

    test('ทดสอบ Validate Email ที่ผิดรูปแบบ', () => {
        const invalidEmail = 'invalid.email';
        const ticket = new TicketModel({
            ID: 1,
            TITLE: 'Test Tile',
            DESCRIPTION: 'Pattanasat Testing',
            CONTACT: 'Pattanasak LineID:theput',
            CREATE_TIME: new Date(),
            UPDATE_TIME: new Date(),
            USER_EMAIL: invalidEmail
        });
        const validationError = ticket.validateSync();
        expect(validationError.errors['USER_EMAIL']).toBeDefined();
    });

    test('ทดสอบกรณีได้รับค่าที่จำเป็นครบทุกค่า', () => {
        const validTicketData = {
            ID: 1,
            TITLE: 'Test Tile',
            DESCRIPTION: 'Pattanasat Testing',
            CONTACT: 'Pattanasak LineID:theput',
            CREATE_TIME: new Date(),
            UPDATE_TIME: new Date(),
            USER_EMAIL: 'putjat145@gmail.com',
        };
        const ticket = new TicketModel(validTicketData);
        const validationError = ticket.validateSync();
        expect(validationError).toBeUndefined();
    });

    test('ทดสอบว่ากรณีไม่ได้รับค่าที่จำเป็นครบทุกค่า', () => {
        const invalidTicketData = {
            ID: 1,
            TITLE: '',
            DESCRIPTION: 'Pattanasat Testing',
            CREATE_TIME: new Date(),
            UPDATE_TIME: new Date(),
            USER_EMAIL: 'putjat145@gmail.com',
        };
        const ticket = new TicketModel(invalidTicketData);
        const validationError = ticket.validateSync();
        expect(validationError).toBeDefined();
    });
});

