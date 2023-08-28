import React, { useEffect, useState } from 'react';
import '../css/ShowDataTicket.css'
import moment from 'moment';
import { update } from './API_Service';
const Path_for_Update_status = 'UpdateTicket'

const formatDateTime = (dateTime: Date | string) => {
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

function ShowDataTicket(DataTickets: DataType, DataStatus: any) {

    const show_statust_in_tag = () => {
        if (DataTickets.TICKET_STATUS === 'Pending') {
            return "🟡 Pending"
        } else if (DataTickets.TICKET_STATUS === 'Accepted') {
            return "🟢 Accepted"
        } else if (DataTickets.TICKET_STATUS === 'Reject') {
            return "🔴 Reject"
        } else if (DataTickets.TICKET_STATUS === 'Resolved') {
            return "🔵 Resolved"
        } else {
            return " "
        }
    }

    const hendle_status_update = (satatus: any) => {
        const newdata = DataTickets;
        newdata.TICKET_STATUS = satatus.STATUS_NAME;
        update(newdata, Path_for_Update_status + '/' + newdata.ID);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <div className='container_showTicket'>
                <div style={{ display: 'flex', justifyContent: 'left' }}>
                    <div className='content_in_ticket' style={{ width: '75%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '70%' }}>
                            <p style={{ margin: '0' }}> <span>Title: </span> {DataTickets.TITLE} </p>
                            <p style={{ margin: '0' }}> <span>Information: </span>{DataTickets.INFORMATION} </p>
                            <p style={{ margin: '0' }}> <span>Description: </span> {DataTickets.DESCRIPTION} </p>
                        </div>
                    </div>

                    <div className='content_in_ticket' style={{ width: '25%', display: 'flex', alignItems: 'center' }}>
                        <img style={{ width: '100%' }} src='/IMG_IN_CARD.svg' />

                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', marginTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '40%' }}>
                        <p style={{ margin: '0' }}>Create by : {DataTickets.USER_EMAIL} </p>
                        <p style={{ margin: '0' }}>Created : {formatDateTime(DataTickets.CREATE_TIME)} </p>
                        <p style={{ margin: '0' }}>Latest time update: {formatDateTime(DataTickets.UPDATE_TIME)} </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '40%' }}>
                        <p style={{ margin: '0' }}>Contact  </p>
                        <p>{DataTickets.CONTACT}</p>
                    </div>
                    <div className='tagStatus' style={{ width: '20%' }}>
                        {show_statust_in_tag()}
                    </div>
                </div>

            </div>

            <div style={{ marginTop: '10px' }}>
                <img style={{ height: '80px' }} src='/Check_1.svg' />
                <img style={{ height: '80px' }} src='/Check_2.svg' />
            </div>

            <div style={{ backgroundColor: '#FAF0F555', padding: '5px', boxShadow: ' 0px -4px 4px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ margin: '5px 0px 2px 0px' }}> UPDATE STATUS</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
                    {DataStatus.map((status: any) => (
                        <button onClick={() => hendle_status_update(status)} className={`btn_${status.STATUS_NAME}`} id={status.ID} key={status.ID}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img className='icon_in_btn' src={status.STATUS_IMG} alt="Icon_Padding" />
                                <div style={{ display: 'block' }}>
                                    <p className='text_in_btn'>{status.STATUS_NAME}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div >
    );

}

export default ShowDataTicket;