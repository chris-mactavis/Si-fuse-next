import React, {useState} from "react";
import Router from "next/router";
import axiosInstance from "../config/axios";
import Token from "../utils/Token";
import {useDispatch} from "react-redux";
import {loader} from "../store/actions/loader";
import StartupProfile from "./profiles/StartupProfile";
import InvestorProfile from "./profiles/InvestorProfile";

const Profile = ({company, services, finance, market, userType, profile, interests, level = null, hasEdit = false, id = null, isConnected = null, profileContent = null, connections = []}) => {

    const [connected, setConnected] = useState(isConnected);

    console.log(services);

    const dispatch = useDispatch();
    const connectHandler = async () => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post(`investors/follows`, {
                follower_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setConnected(true);
            dispatch(loader());
        } catch (e) {
            console.log(e.response.data.message);
            dispatch(loader());
        }

    }

    const disconnectHandler = async () => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post(`investors/unfollow`, {
                follower_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setConnected(false);
            dispatch(loader());
        } catch (e) {
            console.log(e.response.data.message);
            dispatch(loader());
        }
    }

    return <>
        {
            userType.toLowerCase() === 'startup'
                ? <StartupProfile company={company} services={services} finance={finance} level={level} market={market} profile={profile} profileContent={profileContent} hasEdit={hasEdit}/>
                : <InvestorProfile profile={profile} interests={interests} connections={connections}/>
        }
        <style jsx>{`
            .person .has-edit {
                content: '';
                background: url(/images/icon/edit.png);
                width: 30px;
                height: 30px;
                position: absolute;
                background-repeat: no-repeat;
                background-size: contain;
                cursor: pointer;
                top: 5px;
                right: 25px;
            }
        `}</style>
    </>
}

export default Profile;