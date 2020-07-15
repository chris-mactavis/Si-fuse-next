import {useSelector} from "react-redux";
import React from "react";

const StartupProfileHeader = ({isChecked, isClickable, isActive}) => {
    const currentProfile = useSelector(state => state.profile.currentState);

    const width = () => {
        switch (currentProfile) {
            case 9:
                return '5%';
            case 10:
                return '28%';
            case 11:
                return '55%';
            case 12:
                return '80%';
            default:
                return '105%';
        }
    }

    const labels = ['Company', 'Products', 'Finance', 'Funding', 'Marketing'];

    return <div className="steps-wrapper startup-profile">
        <div className="steps">
            {
                labels.map((label, index) => < div key={label} className={`step ${currentProfile > (index + 8) ? 'is-active is-checked' : ''} ${currentProfile === index ? 'is-clickable' : ''}`}>

                    <p className="label">{label}</p>

                    <div className="circles">
                        <div className="circle"/>
                        <div className={`circle bigger-circle ${currentProfile > (index + 8) ? 'is-active is-checked is-clickable' : ''}`}/>
                    </div>
                </div>)
            }
        </div>
        <div className="progress" style={{width: width()}}/>
    </div>

}

export default StartupProfileHeader;