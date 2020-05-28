import React from "react";
import Link from "next/link";

export default function TopBar({redBar = false, isLoggedIn = false, whiteAccount = false}) {
    return <nav className="navbar navbar-expand-lg">
        {
            !isLoggedIn
                ? <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="signup">
                            <a className="nav-link">Signup</a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href="login">
                            <a className="nav-link">Login</a>
                        </Link>
                    </li>
                </ul>
                : (
                    !whiteAccount
                        ? <button id="account-profile" className="menu-btn">
                            <img src="/images/icon/account.svg" alt="" className="img-fluid"/>
                        </button>
                        : <button id="account-profile" className="menu-btn active-bar">
                            <img src="/images/icon/account-white.svg" alt="" className="img-fluid"/>
                        </button>
                )
        }

        <div className="logo-container">
            <img className="clip" src="/images/clip.png" alt=""/>

            <Link href="/">
                <a className="navbar-brand">
                    <img src="/images/logo.png" alt=""/>
                </a>
            </Link>
        </div>

        <button id="open-btn" className="menu-btn">
            {
                redBar
                    ? <img src="/images/icon/button-red.svg" alt=""/>
                    : <img src="/images/icon/button.svg" alt=""/>
            }
        </button>
    </nav>
}