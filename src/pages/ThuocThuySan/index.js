/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//Library react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ThuocThuySan.module.scss';

import AddThuocThuySan from './addThuocThuySan';
import GetThuocThuySanList from './getThuocThuySanList';

const cx = classNames.bind(styles);


function ThuocThuySan() {

    useEffect(() => {
        document.title = "Thuốc thủy sản"
     }, []);
        
    return (
        <>  
            <div className={cx('nav-bar-btn')}>
                <Tabs
                    defaultActiveKey='GetThuocThuySanList'
                    id="fill-tab-example"
                    className={'mb-3'}
                    fill
                >
                    <Tab eventKey="GetThuocThuySanList" title="Danh sách thuốc thủy sản">
                        <GetThuocThuySanList />
                    </Tab>
                    <Tab eventKey="AddThuocThuySan" title="Thêm thuốc thủy sản">
                        <AddThuocThuySan />
                    </Tab>
                </Tabs>
            </div>

            <ToastContainer/>
                {/* Same as */}
        </>
    );
}

export default ThuocThuySan;
