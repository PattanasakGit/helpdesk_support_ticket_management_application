import React, { useEffect, useRef, useState } from 'react';
import { create } from './API_Service';
import '../css/CreateTicket.css'
import { validateInputTicket } from './ValidateInput'

interface LoginData {
    U_NAME: string;
    EMAIL_USER: string;
    ROLE: string;
    U_IMG: string;
}

let DataLogin: LoginData = { U_NAME: '', EMAIL_USER: '', ROLE: '', U_IMG: '', };
const storedLoginData = sessionStorage.getItem('DataLogin');
if (storedLoginData !== null) {
    const parsedLoginData: LoginData = JSON.parse(storedLoginData);
    DataLogin = parsedLoginData;
}


function CreateTicket() {
    const [formData, setFormData] = useState({
        TITLE: '',
        DESCRIPTION: '',
        INFORMATION: '',
        CONTACT: '',
        USER_EMAIL: DataLogin.EMAIL_USER
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (validateInputTicket(formData)) {
            console.log(formData);
            create(formData, 'CreateTicket');
        }
    };
    return (
        <center>
            <div style={{ height: '85vh', backgroundColor: '#ffffff70', color: '#555', margin: '0.5rem 1rem', padding: '2rem', borderRadius: '15px' }}>
                <h2 style={{ backgroundColor: '#EACDA3', padding: '15px', borderRadius: '15px', margin: 0, border: '5px solid #ffffff55', width: '60%' }}>
                    Create New Ticket
                </h2>

                <form>
                    <div className='container_createTicket'>

                        <div className='left-section'>
                            <div>
                                <label>TITLE*</label>
                                <input type="text" name="TITLE" value={formData.TITLE} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>INFORMATION</label>
                                <input type="text" name="INFORMATION" value={formData.INFORMATION} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>CONTACT*</label>
                                <input type="text" name="CONTACT" value={formData.CONTACT} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>CREATOR</label>
                                <p className='Creator' style={{ background: '#ffffff22', color: '#555', textAlign: 'center', fontSize: '25px', margin: 0 }}>
                                    {DataLogin.EMAIL_USER}
                                </p>
                            </div>

                        </div>

                        <div className='right-section'>
                            <div>
                                <label>DESCRIPTION*</label>
                                <textarea name="DESCRIPTION" value={formData.DESCRIPTION} onChange={handleInputChange} />
                            </div>


                        </div>
                    </div>

                    <button className='btn_Submit' type="button" onClick={handleSubmit}>Create Ticket</button>
                </form>

            </div>
        </center>
    );
}

export default CreateTicket;
