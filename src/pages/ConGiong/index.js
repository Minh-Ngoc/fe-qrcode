/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//Library react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ConGiong.module.scss';

import AddConGiong from './addConGiong';
import GetConGiongList from './getConGiongList';

const cx = classNames.bind(styles);


function ConGiong() {

    useEffect(() => {
        document.title = "Con giống"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetConGiongList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetConGiongList" title="Danh sách con giống">
                        <GetConGiongList />
                    </Tab>
                    <Tab eventKey="AddConGiong" title="Thêm con giống">
                        <AddConGiong />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default ConGiong;
