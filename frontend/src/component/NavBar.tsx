import React, { useEffect, useState } from 'react';
import '../css/NavBar.css';
import { Avatar, Tag } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';

const url = 'http://localhost:5173';
const IMG_LOGO = '/LOGO.svg';

interface LoginData {
  U_NAME: string;
  EMAIL_USER: string;
  ROLE: string;
  U_IMG: string;
}

function NavBar() {
  const [LoginData, setLoginData] = useState<LoginData | null>(null);
  const [ShowDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedLoginData = sessionStorage.getItem('DataLogin');
    if (storedLoginData !== null) {
      const parsedLoginData: LoginData = JSON.parse(storedLoginData);
      setLoginData(parsedLoginData);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = url + '/Login';
  };

  const handleShowDropdownClick = () => {
    setShowDropdown(!ShowDropdown);
  };

  const Dropdown_in_Profile = (
    <div className='dropdown_menu'>
      <Avatar size={48} shape='square' src={LoginData?.U_IMG} />
      <p style={{ fontSize: '15px' }}> {LoginData?.U_NAME} </p>
      <Tag style={{ fontSize: '12px' }} color='orange'>
        {LoginData?.ROLE}
      </Tag>
      <p style={{ fontSize: '15px' }}>{LoginData?.EMAIL_USER} </p>
      <button onClick={handleLogout} className='btn_login'>
        LOGOUT
      </button>
    </div>
  );

  return (
    <div className='container_NavBar'>
      <img className='Logo' src={IMG_LOGO} onClick={() => window.location.href = url} />
      <p className='NameProgram' onClick={() => window.location.href = url}> Support Ticket Management </p>

      <div
        className='user_Profile'
        onClick={handleShowDropdownClick}
        style={{ cursor: 'pointer' }}
      >
        {LoginData === null ? (
          <Avatar size={48} icon={<UserOutlined />} />
        ) : (
          <Avatar size={48} src={LoginData?.U_IMG} />
        )}
        <div style={{ marginLeft: '1rem' }}>
          <p style={{ margin: 0, fontSize: '13px' }}> {LoginData?.U_NAME} </p>
        </div>
        <div style={{ marginLeft: '1rem' }}>
          {ShowDropdown ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </div>
      </div>

      {ShowDropdown && Dropdown_in_Profile}
    </div>
  );
}

export default NavBar;
