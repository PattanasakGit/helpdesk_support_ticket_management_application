import Swal from "sweetalert2";

export const validateInputTicket = (data: any) => {
    const { TITLE, DESCRIPTION, CONTACT } = data;
    let errorMessage = "";

    if (!TITLE) {
        errorMessage += "TITLE.  ";
    }

    if (!DESCRIPTION) {
        errorMessage += "DESCRIPTION.  ";
    }

    if (!CONTACT) {
        errorMessage += "CONTACT.  ";
    }

    if (errorMessage !== "") {
        Swal.fire({
            icon: 'warning',
            title: 'Please enter',
            text: errorMessage,
        });
        return false;
    }

    return true; 
};
