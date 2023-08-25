import React, { useEffect, useState } from 'react';
import '../css/Login.css'


const url = 'http://localhost:5173'
const bg_img = 'https://images.unsplash.com/photo-1498409785966-ab341407de6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1762&q=80';
const user_img = 'https://img.freepik.com/free-vector/admin-concept-illustration_114360-2139.jpg?w=1380&t=st=1692956832~exp=1692957432~hmac=a1116fc90cba846cd3c5670fd18bb322a4ee0ab80f753c0deda24761b777f56e';
const admin_img = 'https://img.freepik.com/free-vector/nerd-concept-illustration_114360-260.jpg?w=1380&t=st=1692957020~exp=1692957620~hmac=058d814d8996815d42b870b91429f57f790ccd20028da7b803728c6b96efaa18';
const admin_img_for_select = 'https://tinyurl.com/mrxctnun';
const user_img_for_select = 'https://tinyurl.com/bdfrzdtt';

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
        sessionStorage.setItem('ROLE', Data_Input.ROLE);
        window.location.href = url;
    };

    return (
        <center>
            {/* <div className='login_container' style={{ backgroundImage: `url(${bg_img})` }}> */}
            <div className='login_container'>

                <div style={{
                    backgroundColor: '#ffffff55', padding: '1rem', border: '10px solid #00000009',
                    width: '40%', borderRadius: '15px', marginBottom: '5rem', color: '#222',marginTop: '-3rem'
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
