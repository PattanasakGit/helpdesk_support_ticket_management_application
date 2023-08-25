import React, { useEffect, useState, } from 'react';
import '../css/NavBar.css'
import { Avatar, Dropdown, Menu, Tag } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';

const url = 'http://localhost:5173'
const IMG_LOGO = 'https://firebasestorage.googleapis.com/v0/b/yakkai.appspot.com/o/images%2FSystem%2Fadmin_Fix.svg?alt=media&token=4617c6fd-2b40-4f63-b646-158b30aa24bf'

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

  // console.log('============>',LoginData);

  const menu_in_Profile = (
    <Menu className='dropdown_menu'>
      <Avatar size={48} shape="square" src={LoginData?.U_IMG} />
      <p style={{ fontSize: '15px' }}> {LoginData?.U_NAME} </p>
      <Tag style={{ fontSize: '12px' }} color="orange">{LoginData?.ROLE}</Tag>
      <p style={{ fontSize: '15px' }}>{LoginData?.EMAIL_USER} </p>
      <button onClick={handleLogout} className='btn_login'>LOGOUT</button>
    </Menu>
  );

  return (
    <div className='container_NavBar'>
      <img className='Logo' src={IMG_LOGO} />

      <p className='NameProgram'> Support Ticket Management </p>

      <Dropdown overlay={menu_in_Profile} trigger={['click']} onVisibleChange={(visible) => setShowDropdown(visible)}>
        <div className='user_Profile'>
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

      </Dropdown>




    </div>
  );
}

export default NavBar;
