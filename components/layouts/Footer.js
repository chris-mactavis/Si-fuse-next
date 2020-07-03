import Link from "next/link";
import React from "react";
import {User} from "../../utils/User";

export default function Footer() {
    return <footer>
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <h5>About</h5>

                    <ul>
                        <li>
                            <Link href="/about-us">
                                <a> About us </a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/disclaimer">
                                <a>Disclaimer </a>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col-md-3">
                    <h5>Support</h5>

                    <ul>
                        <li>
                            <Link href="/contact-us">
                                <a>Contact us</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/faqs">
                                <a> FAQs </a>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col-md-3">
                    <h5>Resources</h5>

                    <ul>
                        <li>
                            <Link href="/blog">
                                <a> Blog </a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/events">
                                <a> Events </a>
                            </Link>
                        </li>

                        {
                            User() && User().user_type === 'Investor'
                                ? <li>
                                    <Link href="/discover">
                                        <a> Discover</a>
                                    </Link>
                                </li>
                                : null
                        }
                    </ul>
                </div>

                <div className="col-md-3 d-flex align-items-start justify-content-end">
                    <Link href="/">
                        <a className="logo">
                            <img className="logo img-fluid" src="/images/logo.png" alt=""/>
                        </a>
                    </Link>

                    <div className="social-icons">
                        <Link href="">
                            <a target="_blank">
                                <img src="/images/icon/facebook.svg" alt=""/>
                            </a>
                        </Link>

                        <Link href="">
                            <a target="_blank">
                                <img src="/images/icon/twitter.svg" alt=""/>
                            </a>
                        </Link>

                        <Link href="">
                            <a target="_blank">
                                <img src="/images/icon/instagram.svg" alt=""/>
                            </a>
                        </Link>

                        <Link href="">
                            <a target="_blank">
                                <img src="/images/icon/linkedIn.svg" alt=""/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}