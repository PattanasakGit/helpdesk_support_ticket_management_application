const { CreateTicket, UpdateTicket } = require('../controllers/Ticket');

jest.mock('../controllers/Database.js', () => ({
    insertData: jest.fn(),
    updateData: jest.fn(),
    getNextDataId: jest.fn(),
}));

describe('Test Create Ticket', () => {
    it('ทดสอบบันทึก Ticket สำเร็จ', async () => {
        const mockRequest = {
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: true,
            message: 'Ticket added successfully',
        });
    });

    it('ทดสอบบันทึกไม่ส่ง Title มา', async () => {
        const mockRequest = {
            body: {
                TITLE: '',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing TITLE',
        });
    });

    it('ทดสอบบันทึกไม่ส่ง DESCRIPTION มา', async () => {
        const mockRequest = {
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: '',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing DESCRIPTION',
        });
    });

    it('ทดสอบบันทึกไม่ส่ง CONTACT มา', async () => {
        const mockRequest = {
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: '',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing CONTACT',
        });
    });

    it('ทดสอบบันทึกไม่ได้รับ USER_EMAIL', async () => {
        const mockRequest = {
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: ''
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing USER_EMAIL',
        });
    });

    it('ทดสอบบันทึกได้รับ USER_EMAIL ที่ไม่ถูกต้อง', async () => {
        const mockRequest = {
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'P.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Invalid USER_EMAIL Format',
        });
    });

});

describe('Test Update Ticket', () => {
    it('ทดสอบอัพเดต Ticket สำเร็จ', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: true,
            message: 'Ticket updated successfully',
        });
    });

    it('ทดสอบอัพเดตไม่ส่ง Title มา', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                TITLE: '',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing TITLE',
        });
    });

    it('ทดสอบอัพเดตไม่ส่ง DESCRIPTION มา', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: '',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing DESCRIPTION',
        });
    });

    it('ทดสอบอัพเดตไม่ส่ง CONTACT มา', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: '',
                USER_EMAIL: 'putjat145@gmail.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing CONTACT',
        });
    });

    it('ทดสอบอัพเดตไม่ได้รับ USER_EMAIL', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: ''
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing USER_EMAIL',
        });
    });

    it('ทดสอบอัพเดตได้รับ USER_EMAIL ที่ไม่ถูกต้อง', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                TITLE: 'Test Tile',
                DESCRIPTION: 'Pattanasat Testing',
                INFORMATION: "Helo test",
                CONTACT: 'Pattanasak LineID:theput',
                USER_EMAIL: 'P.com'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateTicket(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Invalid USER_EMAIL Format',
        });
    });

});