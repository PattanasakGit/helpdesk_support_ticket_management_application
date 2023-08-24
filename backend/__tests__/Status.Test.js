const { CreateStatus, UpdateStatus } = require('../controllers/Status');

jest.mock('../controllers/Database.js', () => ({
    insertData: jest.fn(),
    updateData: jest.fn(),
    getNextDataId: jest.fn(),
}));

describe('Test Create Status', () => {
    it('ทดสอบบันทึก Status สำเร็จ', async () => {
        const mockRequest = {
            body: {
                STATUS_NAME: 'Test Tile'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateStatus(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: true,
            message: 'Status added successfully',
        });
    });

    it('ทดสอบบันทึกแต่ไม่ส่ง STATUS_NAME', async () => {
        const mockRequest = {
            body: {
                STATUS_NAME: ''
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await CreateStatus(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing STATUS_NAME',
        });
    });
});

describe('Test Update Status', () => {
    it('ทดสอบบันทึก Status สำเร็จ', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                STATUS_NAME: 'Test Tile'
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateStatus(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: true,
            message: 'Status updated successfully',
        });
    });

    it('ทดสอบบันทึกแต่ไม่ส่ง STATUS_NAME', async () => {
        const mockRequest = {
            params: { id: 1 },
            body: {
                STATUS_NAME: ''
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await UpdateStatus(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Missing STATUS_NAME',
        });
    });
});