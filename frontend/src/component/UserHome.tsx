import React, { useEffect, useRef, useState } from 'react';
import { get_all_Status, getData_By_USER_Email } from './API_Service';
import '../css/AdminHome.css'
import { Button, Input, Space, Table, Tag, InputRef } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { FormOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const url = 'http://localhost:5173';

const formatDateTime = (dateTime: Date) => {
    return moment(dateTime).format('DD-MM-YYYY HH:mm:ss');
};

interface DataType {
    key: number;
    ID: number;
    TITLE: string;
    DESCRIPTION: string;
    INFORMATION: number;
    CONTACT: string;
    CREATE_TIME: string;
    UPDATE_TIME: string;
    USER_EMAIL: string;
    TICKET_STATUS: string;
}
type DataIndex = keyof DataType;

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

function UserHome() {
    const [Status, setStatus] = useState([]);
    const [Tickets, setTickets] = useState<DataType[]>([]);
    const [Ticket_for_show_in_table, setTicket_for_show_in_table] = useState<DataType[]>(Tickets);
    const [selected_filter_btn_value, setselected_filter_btn_value] = useState<string>();
    const [Show_selected_value, setShow_selected_value] = useState<any>();

    const GetAllTicket = async () => {
        if (DataLogin !== null) {
            const DataTickets = await getData_By_USER_Email(DataLogin.EMAIL_USER);
            setTickets(DataTickets);
        } else {
            console.log('ไม่มีข้อมูลการเข้าระบบของผู้ใช้งาน');
        }
    }

    const GetAllStatus = async () => {
        const DataTickets = await get_all_Status();
        setStatus(DataTickets);
    }
    useEffect(() => {
        GetAllStatus();
        GetAllTicket();
    }, []);


    const handle_select_status_btn = (status: string, value: any) => {
        setselected_filter_btn_value(status);
        setShow_selected_value(value);
    }

    const Count_Data = (Status: string) => {
        if (Status === 'Pending') {
            return (Tickets.filter(item => item.TICKET_STATUS === 'Pending').length);
        } else if (Status === 'Accepted') {
            return (Tickets.filter(item => item.TICKET_STATUS === 'Accepted').length);
        } else if (Status === 'Reject') {
            return (Tickets.filter(item => item.TICKET_STATUS === 'Reject').length);
        } else if (Status === 'Resolved') {
            return (Tickets.filter(item => item.TICKET_STATUS === 'Resolved').length);
        }

    }
    //-----------------------------------------------------   สำหรับปรับแต่งการค้นหาในตาราง    -----------------------------------------------------------------------------------------
    const searchInput = useRef<InputRef>(null);
    const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex,) => { confirm(); };
    const handleReset = (clearFilters: () => void) => { clearFilters(); };
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input ref={searchInput} value={selectedKeys[0]} style={{ marginBottom: 8, display: 'block' }} className='font_style'
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                />
                <Space>
                    <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }} >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }} >
                        Reset
                    </Button>
                    <Button type="link" size="small" onClick={() => { close(); }} >  close  </Button>
                </Space>
                <h6 className='font_style'>*เมื่อ reset กรุณากดปุ่ม search เพื่อค้นหาใหม่</h6>
            </div>
        ),
        filterIcon: (filtered: boolean) => (<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined, fontSize: filtered ? '25px' : undefined }} />),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
    });

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            className: 'font_style',
            align: 'center',
            dataIndex: 'ID',
            key: 'ID',
            width: '80px',
            fixed: 'left',
            sorter: (a, b) => a.ID - b.ID,
        },
        {
            title: 'TITLE',
            className: 'font_style',
            align: 'center',
            dataIndex: 'TITLE',
            key: 'TITLE',
            // fixed: 'left',
            ...getColumnSearchProps('TITLE'),

        },
        {
            title: 'DESCRIPTION',
            className: 'font_style',
            align: 'center',
            dataIndex: 'DESCRIPTION',
            key: 'DESCRIPTION',
            ...getColumnSearchProps('DESCRIPTION'),
        },
        {
            title: 'INFORMATION',
            className: 'font_style',
            align: 'center',
            dataIndex: 'INFORMATION',
            key: 'INFORMATION',
            ellipsis: true,
        },
        {
            title: 'CONTACT',
            className: 'font_style',
            align: 'center',
            dataIndex: 'CONTACT',
            key: 'CONTACT',
            ellipsis: true,
        },
        {
            title: 'CREATED',
            className: 'font_style',
            align: 'center',
            dataIndex: 'CREATE_TIME',
            key: 'CREATE_TIME',
            render: (text) => formatDateTime(text),
            sorter: (a, b) => a.CREATE_TIME.localeCompare(b.CREATE_TIME), // เปรียบเทียบ string
            ...getColumnSearchProps('CREATE_TIME'),
        },
        {
            title: 'LATEST TIME UPDATE',
            className: 'font_style',
            align: 'center',
            dataIndex: 'UPDATE_TIME',
            key: 'UPDATE_TIME',
            render: (text) => formatDateTime(text),
            sorter: (a, b) => a.UPDATE_TIME.localeCompare(b.UPDATE_TIME), // เปรียบเทียบ string
            ...getColumnSearchProps('UPDATE_TIME'),
        },
        {
            title: 'REQUEST BY',
            className: 'font_style',
            align: 'center',
            dataIndex: 'USER_EMAIL',
            key: 'USER_EMAIL',
            ellipsis: true,
            ...getColumnSearchProps('USER_EMAIL'),
        },
        {
            title: 'STATUS',
            className: 'font_style',
            align: 'center',
            dataIndex: 'TICKET_STATUS',
            key: 'TICKET_STATUS',
            render: (_, record) => (

                record.TICKET_STATUS === "Accepted" ? (
                    <Tag className='TP_font' color="green" > 🟢 {record.TICKET_STATUS} </Tag>
                ) : record.TICKET_STATUS === "Pending" ? (
                    <Tag className='TP_font' color="gold" > 🟡 {record.TICKET_STATUS} </Tag>
                ) : record.TICKET_STATUS === "Reject" ? (
                    <Tag className='TP_font' color="red" > 🔴 {record.TICKET_STATUS} </Tag>
                ) : (
                    <Tag className='TP_font' color="processing" >  🔵 {record.TICKET_STATUS} </Tag>)
            )
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            className: 'customCell_action',
            render: (_, record: DataType) => (
                <button onClick={() => hendle_btn_in_table(record.ID)} className='btn_show' ><FormOutlined /></button>
            )
        },

    ];

    const hendle_btn_in_table = (id: number) => {
        const idString = id.toString();
        sessionStorage.setItem('ID_for_UPDATE', idString);
        window.location.href = url + `/UpdateTicket`;
    }
    useEffect(() => {
        const Filter_Data = Tickets.filter(item => {
            if (selected_filter_btn_value === 'Pending') {
                return item.TICKET_STATUS as string === 'Pending';
            } else if (selected_filter_btn_value === 'Accepted') {
                return item.TICKET_STATUS as string === 'Accepted';
            } else if (selected_filter_btn_value === 'Reject') {
                return item.TICKET_STATUS as string === 'Reject';
            } else if (selected_filter_btn_value === 'Resolved') {
                return item.TICKET_STATUS as string === 'Resolved';
            }
            return true;
        });
        setTicket_for_show_in_table(Filter_Data as [DataType]);
    }, [selected_filter_btn_value, Tickets]);

    return (
        <center>
            <div style={{ height: '90vh', backgroundColor: '#ffffff70', color: '#333', margin: '0.5rem 1rem', padding: '0.05rem 2rem 2rem 2rem', borderRadius: '15px' }}>
                <h2 style={{ backgroundColor: '#EACDA3', padding: '15px', borderRadius: '15px', marginBottom: '1rem', border: '5px solid #ffffff55', width: '40%', color: '#555' }}>
                    My Ticket
                </h2>

                <div className='container_content_admin' >
                    <button onClick={() => handle_select_status_btn('All', '')} className='btn_All' style={{ height: '80px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <img className='icon_in_btn' src='./all.png' alt="btn_All" />
                            <div style={{ display: 'block' }}>
                                <p className='text_in_btn'>{"All"}</p>
                                <p className='small_text_in_btn'>{Tickets.length}</p>
                            </div>
                        </div>
                    </button>
                    {Status.map((status: any) => (
                        <button onClick={() => handle_select_status_btn(status.STATUS_NAME, status)} className={`btn_${status.STATUS_NAME}`} id={status.ID} key={status.ID} style={{ height: '80px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img className='icon_in_btn' src={status.STATUS_IMG} alt="Icon_Padding" />
                                <div style={{ display: 'block' }}>
                                    <p className='text_in_btn'>{status.STATUS_NAME}</p>
                                    <p className='small_text_in_btn'>{Count_Data(status.STATUS_NAME)}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div >
                <div className='container_content_admin' style={{ marginTop: '1rem', padding: '15px', display: 'block', width: '95%' }}>

                    {Show_selected_value && (
                        <div id='title_table_0' className='title_table' >
                            <div id='title_table_1' className='inside_title_table'>
                                <img className='icon_in_btn' src={Show_selected_value.STATUS_IMG} />
                                <h3> {Show_selected_value.STATUS_NAME} : {Count_Data(Show_selected_value.STATUS_NAME)} Item</h3>
                            </div>
                        </div>
                    )}

                    <Table
                        style={{ zIndex: 0 }}
                        scroll={{ x: 1300 }}
                        columns={columns}
                        dataSource={Ticket_for_show_in_table.map(item => ({ ...item, key: item.ID }))}
                        size='middle'
                        bordered
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: false,
                            position: ['bottomCenter'],
                            className: 'TP_pagination_table'
                        }}
                    />

                </div >

                <button onClick={() => window.location.href = url + '/CreateTicket'} className='btn_All'
                    style={{ marginTop: '3rem', height: '80px', width: '600px', border: '3px solid #EACDA3', color: '#555', fontSize: '25px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <div style={{ display: 'block' }}>
                            <p className='text_in_btn'>Create new Ticket</p>
                        </div>
                    </div>
                </button>
            </div >
        </center >
    );
}

export default UserHome;
