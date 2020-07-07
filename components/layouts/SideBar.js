import React, {useCallback, useEffect} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/actions/auth";
import ToggleSideBar from "../../utils/ToggleSideBar";
import Router from 'next/router';
import {User} from "../../utils/User";
import {showNotifier} from "../../store/actions/notifier";
import SingleNotification from "../notifications/single-notification";
import {fetchNotifications} from "../../store/actions/notification";
// import Echo from "laravel-echo";
// import Socketio from 'socket.io-client';

export default function SideBar({isLoggedIn = false}) {
    const dispatch = useDispatch();

    const notifications = useSelector(state => state.notifications).notifications;

    const closeSideBarHandler = () => {
        ToggleSideBar();
    }

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(showNotifier('Logged Out'));
        Router.push('/');
    }

    const loggedInUser = User();

    return <>
        <div className="sidebar">
            <button onClick={closeSideBarHandler}>
                <img src="/images/icon/cancel.svg" alt=""/>
            </button>
            <ul>
                <li>
                    <Link href="/">
                        <a className="active">Home</a>
                    </Link>
                </li>
                {
                    loggedInUser && loggedInUser.user_type.user_type === 'Investor'
                        ? <li>
                            <Link href="/discover">
                                <a>Discover</a>
                            </Link>
                        </li>
                        : null
                }

                <li>
                    <Link href="/about-us">
                        <a>About Us</a>
                    </Link>
                </li>

                <li>
                    <Link href="/blog">
                        <a>Blog</a>
                    </Link>
                </li>

                <li>
                    <Link href="/events">
                        <a>Events</a>
                    </Link>
                </li>

                <li>
                    <Link href="/contact-us">
                        <a>Contact Us</a>
                    </Link>
                </li>

                {
                    !isLoggedIn
                        ? <>
                            <li>
                                <Link href="/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <a>Signup</a>
                                </Link>
                            </li>
                        </>
                        : <li>
                            <a onClick={logoutHandler}>Logout</a>
                        </li>
                }
            </ul>
        </div>
        {
            isLoggedIn
                ? <>
                    <div className="account-container">
                        <ul>
                            <li>
                                <Link href="/profile">
                                    <a><img src="/images/icon/profile-icon.svg" alt=""
                                            className="img-fluid"/> Profile</a>
                                </Link>
                            </li>
                            {
                                loggedInUser && loggedInUser.user_type.user_type === 'Investor'
                                    ? <>
                                        <li>
                                            <Link href="/timeline">
                                                <a><img src="/images/icon/timeline.svg" alt=""
                                                        className="img-fluid"/> My Timeline</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/connections">
                                                <a><img src="/images/icon/connection-icon.svg" alt=""
                                                        className="img-fluid"/> Connections</a>
                                            </Link>
                                        </li>
                                    </>
                                    : null
                            }
                            <li>
                                <Link href="/events">
                                    <a><img src="/images/icon/calendar-icon.svg" alt=""
                                            className="img-fluid"/> Event</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings">
                                    <a><img src="/images/icon/setting.svg" alt="" className="img-fluid"/> Settings</a>
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={logoutHandler}><img src="/images/icon/logout-icon.svg" alt=""
                                                                         className="img-fluid"/> Logout</a>
                            </li>
                        </ul>
                    </div>

                    <div className="notification-container">
                        <h6>Notifications</h6>
                        <ul>
                            {
                                notifications.map((notification, index) => <SingleNotification key={index}
                                                                                               notification={notification}/>)
                            }
                            {
                                notifications.length === 0 && <li>
                                    <p className="head-text"><img src="/images/icon/empty.svg" alt="" /> Notification Empty</p>
                                    <p className="msg-text">Your notifications will appear here.</p>
                                </li>
                            }
                        </ul>
                    </div>
                </>
                : null
        }

    </>
}