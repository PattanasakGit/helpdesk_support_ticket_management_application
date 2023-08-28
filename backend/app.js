const express = require('express');
var cors = require('cors');
const app = express();
const port = 8000;

const { connectDatabase, closeDatabase } = require('./controllers/Database');
const { CreateTicket, UpdateTicket, ListTicket, GetTicketById, GetTicketByEmail} = require('./controllers/Ticket');
const { CreateStatus, UpdateStatus, ListStatus, GetStatusById, DeleteStatus} = require('./controllers/Status');

app.use(express.json());
app.use(cors());

// Ticket API
app.get('/ListTicket', ListTicket)
app.post('/CreateTicket', CreateTicket);
app.put('/UpdateTicket/:id', UpdateTicket);
app.post('/GetTicketByEmail', GetTicketByEmail);
app.get('/GetTicketById/:id', GetTicketById);

// Status API
app.get('/ListStatus', ListStatus)
app.post('/CreateStatus', CreateStatus);
app.put('/UpdateStatus/:id', UpdateStatus);
app.get('/GetStatusById/:id', GetStatusById);
app.delete('/DeleteStatus/:id', DeleteStatus);

const startServer = async () => {
    try {
        await connectDatabase(); // เชื่อมต่อฐานข้อมูล

        const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        // ปิดการเชื่อมต่อกับ MongoDB ตอนที่เราปิดแอปพลิเคชัน
        process.on('SIGTERM', async () => {
            await closeDatabase();
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        // หยุดเชื่อมต่อกับฐานข้อมูลถ้าปิดด้วย Ctrl+C
        process.on('SIGINT', async () => {
            await closeDatabase();
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();