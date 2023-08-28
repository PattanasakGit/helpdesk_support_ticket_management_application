# helpdesk_support_ticket_management_application

## Start Program
To get started with the application, follow these steps:

 1. **.Clone the Repository:** Clone this project repository
    
 2. **Install Dependencies** In the project directory `\backend` and `\frontend`,
		 run `npm install` to install all necessary dependencies.
    
 3. **Start the Backend Server:** Go to `\backend` path Run `node app.js` to start the application server.
    
 4. **Start the Frontend Server:** Go to `\frontend` path Run `npm run dev` to start the application server.

If you want to **Test Backend Server**
Go to `\backend` path 
Run `npm test` 

## Picture Program
This is  Picture of Program  [Click here for preview picture](https://github.com/PattanasakGit/helpdesk_support_ticket_management_application/tree/main/Picture%20Program)


## API Documentation

### 1. Understand the API's users

This API has been designed to serve as a support ticket management application.

The users of this API include:
1. **System Administrators or Support Team**: These individuals are responsible for verifying, managing, and tracking support tickets.
2. **General System Users**: These users, such as employees, can report issues to the administrators.

General users have the capability to create new tickets, update ticket details, and view ticket information. This system empowers administrators or support personnel to oversee, handle, and monitor support tickets effectively.

### 2. Start with the fundamentals

The API endpoints and their respective functionalities are as follows:

- **CreateTicket** (`POST /CreateTicket`): Create a new support ticket.
- **GetTicketById** (`GET /GetTicketById/:id`): Retrieve a specific ticket by its ID.
- **GetTicketByEmail** (`POST /GetTicketByEmail`): Retrieve a specific ticket by its User Email.
- **ListTicket** (`GET /ListTicket`): List all tickets.
- **UpdateTicket** (`PATCH /UpdateTicket/:id`): Update the details of a ticket.
- **CreateStatus** (`POST /CreateStatus`): Create new ticket status.
- **ListStatus** (`GET /ListStatus`): List all ticket statuses.
- **GetStatusById** (`GET /GetStatusById/:id`): Retrieve a specific ticket status by its ID
- **DeleteStatus** (`DELETE /DeleteStatus/:id`): Delete a specific ticket status by its ID

### 3. Code examples
Here are a few code examples demonstrating the usage of the API endpoints:

### CreateTicket (POST /CreateTicket)

Create a new support ticket.

**Request Body:**
```json
{
	"TITLE":"Test",
	"DESCRIPTION":"ทดสอบครับผม",
	"INFORMATION":"ทดสอบระบบเพิ่มข้อมูล",
	"CONTACT":"0988768438",
	"USER_EMAIL":"putjat145@gmail.com"
}
```

### GetTicketById (GET /GetTicketById/:id)

Retrieve a specific ticket by its ID.

**Parameters:**
- `id` (integer): The ID of the ticket.

### GetTicketByEmail (POST /GetTicketByEmail)

Retrieve a specific ticket by its User Email .

**Request Body:**
```json
{
	"USER_EMAIL":"putjat145@gmail.com"
}
```

### ListTicket (GET /ListTicket)

List all tickets.

### UpdateTicket (PATCH /UpdateTicket/:id)

Update the details of a ticket.

**Request Body:**
```json
{
	"TITLE":"Update Data Test",
	"DESCRIPTION":"DESCRIPTION",
	"INFORMATION":"Edit",
	"CONTACT":"0987654321",
	"USER_EMAIL":"putjat145@gmail.com"
}
```
### CreateStatus (POST /CreateStatus)

Create a new status of support ticket.

**Request Body:**
```json
{
	"STATUS_NAME":"Resolved",
	"STATUS_IMG":"/Icon_Resolved.png"
}
```
### ListStatus (GET /ListStatus)

List all ticket statuses.

### GetStatusById (GET /GetStatusById/:id)

Retrieve a specific ticket status by its ID.

**Parameters:**
- `id` (integer): The ID of the ticket status.


These are the available endpoints and their corresponding functionalities. You can interact with the API using the provided methods and parameters to perform the desired operations.
## 4. List your status codes and error messages

The API follows standard HTTP status codes and includes appropriate error messages in the response body when an error occurs. Here are some common status codes:

- 200 OK: The request was successful.
- 400 Bad Request: The request was invalid or malformed (User send data invalid format ) . 
- 401 Unauthorized: Authentication failed or the API key is missing or invalid.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.

The response body for error messages may include additional details about the error to assist developers in troubleshooting.
