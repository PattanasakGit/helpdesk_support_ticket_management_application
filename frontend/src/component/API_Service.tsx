import axios from "axios";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2

const port = 8000; // พรอตหลังบ้าน
const url_frontend = 'http://localhost:5173';

//=========================== ส่วนของ Ticked =========================================

export const get_all_Tricket = async () => {
    const apiUrl = `http://localhost:${port}/ListTicket`;
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log('พบข้อผิดพลาดในการดึงข้อมูล Trickets:' + error);
        return [];
    }
};

export const get_Tricket = async (id: string | number) => {
    const apiUrl = `http://localhost:${port}/GetTicketById/${id}`;
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log('พบข้อผิดพลาดในการดึงข้อมูล Trickets:' + error);
        return [];
    }
};

export const getData_By_USER_Email = async (email: string) => {
    const apiUrl = `http://localhost:${port}/GetTicketByEmail`;
    try {
        const response = await axios.post(apiUrl,{USER_EMAIL:email});
        return response.data;
    } catch (error) {
        console.log('พบข้อผิดพลาดในการดึงข้อมูล Trickets:' + error);
        return [];
    }
};

export const update = (data: any, part: string) => {
    const apiUrl = `http://localhost:${port}/${part}`;
    axios
        .put(apiUrl, data)
        .then((response) => {
            const res = response.data;
            if (res.status === true) {
                Swal.fire({
                    title: 'Update Success',
                    icon: 'success',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href=url_frontend;
                    }
                })
            } else {
                Swal.fire({
                    title: 'Update Failed',
                    text: res.error,
                    icon: 'error',
                });
            }
        })
        .catch((error) => {
            let errorMessage = '!!!';
            if (error.message === 'Network Error') {
                errorMessage = 'Sorry Cannot Connect to Database'
            } else if (error.response.data.error) {
                errorMessage = error.response.data.error;
            } else {
                errorMessage = error;
            }
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
            });
        });
};
export const create = (data: any, part: string) => {
    const apiUrl = `http://localhost:${port}/${part}`;
    axios
        .post(apiUrl, data)
        .then((response) => {
            const res = response.data;
            if (res.status === true) {
                Swal.fire({
                    title: 'Create Success',
                    icon: 'success',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            } else {
                Swal.fire({
                    title: 'Create Failed',
                    text: res.error,
                    icon: 'error',
                });
            }
        })
        .catch((error) => {
            let errorMessage = '!!!';
            if (error.message === 'Network Error') {
                errorMessage = 'Sorry Cannot Connect to Database'
            } else if (error.response.data.error) {
                errorMessage = error.response.data.error;
            } else {
                errorMessage = error;
            }
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
            });
        });
};

//=========================== ส่วนของ Status ==========================================
export const get_all_Status = async () => {
    const apiUrl = `http://localhost:${port}/ListStatus`;
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log('พบข้อผิดพลาดในการดึงข้อมูล Status:' + error);
        return [];
    }
};
// ===================================================================================