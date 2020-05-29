import React from "react";
import Link from "next/link";

export default function SideBar({isLoggedIn = false}) {

    const closeSideBarHandler = () => {
        $('.sidebar').toggleClass('active');
    }

    return (
        !isLoggedIn
            ? <div className="sidebar">
                <button onClick={closeSideBarHandler}>
                    <img src="/images/icon/cancel.svg" alt=""/>
                </button>
                <ul>
                    <li>
                        <Link href="/">
                            <a className="active">Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/discover">
                            <a>Discover</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog">
                            <a>Blog</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </li>
                </ul>
            </div>
            : <div className="account-container">
                <ul>
                    <li>
                        <Link href="profile">
                            <a><img src="/images/icon/profile-icon.svg" alt=""
                                    className="img-fluid"/> Profile</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="message">
                            <a><img src="/images/icon/message-icon.svg" alt=""
                                    className="img-fluid"/> Message</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="connections">
                            <a><img src="/images/icon/connection-icon.svg" alt=""
                                    className="img-fluid"/> Connections</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="events">
                            <a><img src="/images/icon/calendar-icon.svg" alt=""
                                    className="img-fluid"/> Event</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="settings">
                            <a><img src="/images/icon/setting.svg" alt="" className="img-fluid"/> Settings</a>
                        </Link>
                    </li>
                    <li>
                        <a href="#"><img src="/images/icon/logout-icon.svg" alt="" className="img-fluid"/> Logout</a>
                    </li>
                </ul>
            </div>
    )
}