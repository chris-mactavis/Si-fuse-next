import Layout from "../../components/layout";
import Head from "next/head";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import Error from "../../components/UI/ErrorSpan";
import axiosInstance from "../../config/axios";
import {showNotifier} from "../../store/actions/notifier";

const ForgotPassword = () => {

    const {register, handleSubmit, errors} = useForm();

    const [showForm, setShowForm] = useState(true);
    const [showResetMessage, setShowResetMessage] = useState(false);
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const resetPasswordHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('forgot-password', data);
            if (response.message && response.message === 'sent') {
                setEmail(data.email);
                setShowForm(false);
                setShowResetMessage(true);
            }
            dispatch(loader());
            dispatch(showNotifier('Email Sent'));
        } catch (e) {
            dispatch(showNotifier(e.response.data.message, 'danger'));
            console.log(e);
            dispatch(loader());
        }
    }

    const verifyEmailHandler = async email => {
        try {
            const {data: {email_exists}} = await axiosInstance.post('verify-email', {email});
            return !email_exists && 'Email does not exists!';
        } catch (e) {

        }
    }

    return <Layout page="forgotPassword" headerContent={null} headerClass="page-header no-bg" redBar>
        <Head>
            <title>Forgot Password</title>
        </Head>

        <section className="forgot-password">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-12 mx-auto bg-white">
                        {
                            showForm && <form className="profile-details" onSubmit={handleSubmit(resetPasswordHandler)}>
                                <label htmlFor="email">Enter Email Address to reset password</label>
                                <input ref={register({required: 'Email is required!'})} type="email"
                                       className="full-width mb-0" id="email" name="email" placeholder="Email address"/>
                                {errors.email && <Error>{errors.email.message}</Error>}

                                <button className="btn btn-sm w-100 mt-5" type={"submit"}>RESET</button>
                            </form>
                        }

                        {
                            showResetMessage && <p className="reset-password-message text-center">An email has been sent to <strong>{email}</strong>, check your inbox and click on the link provided.</p>
                        }
                    </div>
                </div>

            </div>
        </section>
    </Layout>
}

export default ForgotPassword;