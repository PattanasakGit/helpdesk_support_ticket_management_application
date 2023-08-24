function Validation_Ticket(Ticket) {
    try {
        if (!Ticket.TITLE) {
            return ('Missing TITLE');
        } else if (!Ticket.DESCRIPTION) {
            return ('Missing DESCRIPTION');
        } else if (!Ticket.CONTACT) {
            return ('Missing CONTACT');
        } else if (!Ticket.USER_EMAIL) {
            return ('Missing USER_EMAIL');
        };
        if (Ticket.USER_EMAIL) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(Ticket.USER_EMAIL)) {
                return ('Invalid USER_EMAIL Format');
            }
        }
    } catch (error) {
        console.log(error.message);
        return (error.message);
    }
}

function Validation_Status(Status) {
    try {
        if (!Status.STATUS_NAME) {
            return ('Missing STATUS_NAME');
        };
    } catch (error) {
        console.log(error.message);
        return (error.message);
    }
}


module.exports = {
    Validation_Ticket,
    Validation_Status,
};