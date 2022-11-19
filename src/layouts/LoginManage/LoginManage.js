import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import styles from './LoginManage.module.scss';

const cx = classNames.bind(styles);

function LoginManage({ children }) {
    // const $ = document.querySelector.bind(document);

    // const $$ = document.querySelectorAll.bind(document);

    // const tabs = $$('.' + cx('tab-item'));

    // const tabActive = $('.' + cx('tab-item'));

    // const line = $('.' + cx('tab') + ' .' + cx('line') );

    // tabs.forEach((tab, index) => {

    //     tab.onclick = function() {
            
    //         $('.' + cx('tab-item') + '.' + cx('active')).classList.remove(cx('active'));

    //         line.style.left = this.offsetLeft + 'px'
    //         line.style.width = this.offsetWidth + 'px'

    //         this.classList.add(cx('active'));

    //     }
    // })

    const navLinkStyle = ({ isActive }) => ({
        opacity: isActive ? 1 : '',
      })

    return (
        <div className="container-fluid">
            <div className={'d-flex justify-content-center ' + cx('container-login')}>
                <div className={'row align-content-center ' + cx('container-form')}>
                    <div className={cx('tabs')}>
                        <NavLink style={navLinkStyle} to={config.routes.login} className={'nav-link ' + cx('tab-item')}>
                            <FontAwesomeIcon icon={faRightToBracket} className={cx('tab-icon')} />
                            <span>Đăng nhập</span>
                        </NavLink>
                        <NavLink style={navLinkStyle} to={config.routes.register} className={'nav-link ' + cx('tab-item')}>
                            <FontAwesomeIcon icon={faUserPlus} className={cx('tab-icon')} />
                            <span>Đăng ký</span>
                        </NavLink>
                        <div className={cx('line')}></div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

LoginManage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoginManage;
