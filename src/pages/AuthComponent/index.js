/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from './AuthComponent.module.scss';
import classNames from 'classnames/bind';

import axios from "axios";
import Cookies from "universal-cookie";

import SideBar from "../../layouts/SideBar";


const cx = classNames.bind(styles);

// get token generated on login
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function AuthComponent({children}) {

  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");


  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "http://localhost:4000/api/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div id={cx('Administrator')}>

      <SideBar />

      <div className={cx('body_container')}>
        <div className="container-fluid">
            <div className="titlePage text-center">
              <h1>Auth Component</h1>
            </div>

            {/* displaying our message from our API call */}
            {/* <h3 className="text-danger">{message}</h3> */}
            {children}
            
        </div>
      </div>
    </div>
    
  );
}