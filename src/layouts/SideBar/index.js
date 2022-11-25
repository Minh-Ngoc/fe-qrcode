/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Nhan data { userId: result.data.userId } tu '/login' qua useLocation
import { useLocation } from "react-router-dom";

import { Link } from 'react-router-dom';
import ItemSideBar from "../../components/ItemSideBar";
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import { motion } from "framer-motion";
import { faRightToBracket, faListUl } from '@fortawesome/free-solid-svg-icons';

import Cookies from "universal-cookie";
import config from '../../config';
import { linkItems } from './linkItems';

import {
  sideContainerVariants,
  sidebarVariants,
  profileVariants,
  FucUserName
} from './constSideBar';

const cx = classNames.bind(styles);
const cookies = new Cookies();

export default function SideBar() {

  // get data from /login
  const location = useLocation();

  let userId = location.state.userId;
  let nameUser = location.state.user;
  
  // Send userId to children
  const [userData, setUserData] = useState(userId);
  const [userName, setUserName] = useState(nameUser);
  
    // console.log(userId)

  const navigate = useNavigate();

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    navigate(config.routes.login)
  }

  const [open, setOpen] = useState(true);

  const handleToggle = () => {
      setOpen(!open);
    };

  return (
      <motion.div
        data-open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className={cx('sidebar_container')}
      >
        {/* sidebar div */}
        <motion.div
          className={cx('sidebar')}
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          <div className={cx('sidebar-item')}>
            {/* lines_icon */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: 180,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(3.5px)",
                WebkitBackdropFilter: "blur(3.5px)",
                transition: {
                  delay: 0.1,
                  duration: 0.2,
                },
              }}
              onClick={handleToggle}
              className={cx('lines_icon')}
            >
              <ItemSideBar icon={faListUl} />
            </motion.div>
            {/* profile */}
            <Link to={config.routes.auth} state={{userId: userData, user: userName}}>
              <motion.div
                layout
                initial={`${open}`}
                animate={`${open}`}
                variants={profileVariants}
                className={cx('profile')}
                transition={{ duration: 0.4 }}
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  backdropFilter: "blur(5.5px)",
                  WebkitBackdropFilter: "blur(5.5px)",
                  border: "1px solid rgba( 255, 255, 255, 0.18 )",
                  cursor: "pointer",
                }}
              >
                  <img
                    src="https://w7.pngwing.com/pngs/907/970/png-transparent-white-house-logo-computer-icons-home-house-home-blue-angle-text.png"
                    alt="profile_img"
                  />
              </motion.div>
            </Link>
            <motion.div
              className="text-center userName"
              initial={`${open}`}
              animate={`${open}`}
              variants={FucUserName}
            >
             {userName}
            </motion.div>
            <hr/>
            {/* groups */}
            <div className={cx('groups')}>
              {/* group 1 */}
                {linkItems.map((linkItem, index) => {
                  return (
                  <Link to={linkItem.path} key={index} state={{userId: userData, user: userName}}> 
                    <ItemSideBar icon={ linkItem.icon } name={linkItem.name} /> 
                  </Link>
                  )
                })}
            </div>
          </div>
            
          {/* group 3 */}
          <div className={cx('group')} onClick={() => logout() }>
            <hr/>
            <ItemSideBar icon={faRightToBracket} name="Logout" />
          </div>
        </motion.div>
      </motion.div>

        
  );
}