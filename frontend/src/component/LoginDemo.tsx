import React, { useEffect, useState } from 'react';
import '../css/Login.css'

const url = 'http://localhost:5173'
const admin_img_for_select = 'admin.svg'
const user_img_for_select = 'user.svg';
const user_img = user_img_for_select;
const admin_img = admin_img_for_select;

const UserDemo = {
    U_NAME: 'Pattanasak Atakul',
    EMAIL_USER: 'putjat145@gmail.com',
    ROLE: 'User',
    U_IMG: user_img,
};
const AdminDemo = {
    U_NAME: 'Admin Just',
    EMAIL_USER: 'Admin@gmail.com',
    ROLE: 'Admin',
    U_IMG: admin_img,
}
interface DataDemoType { U_NAME: string; EMAIL_USER: string; ROLE: string; U_IMG: string; };

function Login() {
    sessionStorage.clear();

    const handleLogin = (Data_Input: DataDemoType) => {
        sessionStorage.setItem('DataLogin', JSON.stringify(Data_Input));
        sessionStorage.setItem('Email_Login', JSON.stringify(Data_Input.EMAIL_USER));
        sessionStorage.setItem('ROLE', Data_Input.ROLE);
        window.location.href = url;
    };

    return (
        <center>
            <div className='login_container'>
                <div style={{
                    backgroundColor: '#ffffff55', padding: '1rem', border: '10px solid #00000009',
                    width: '40%', borderRadius: '15px', marginBottom: '5rem', color: '#222', marginTop: '-3rem'
                }}>
                    <p style={{ margin: 0, fontSize: '30px' }}>Simulate Login System</p>
                </div>

                <div id='card_show_user' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div onClick={() => handleLogin(AdminDemo)} className='Card_Select_User'>
                        <img src={admin_img_for_select} />
                        <p style={{ fontSize: '35px', margin: 0 }}> Login as admin </p>
                    </div>
                    <div onClick={() => handleLogin(UserDemo)} className='Card_Select_User'>
                        <img src={user_img_for_select} />
                        <p style={{ fontSize: '35px', margin: 0 }}> Login as User </p>
                    </div>
                </div>
            </div>
        </center>
    );
}

export default Login;
