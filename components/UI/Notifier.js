import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleNotifier} from "../../store/actions/notifier";

const Notifier = () => {
    const dispatch = useDispatch();
    const {showNotifier, type, message} = useSelector(state => state.notifier);

    return <div className={`notification ${showNotifier ? 'show' : ''} ${type}`} onClick={() => dispatch(toggleNotifier())}>
        <span>{message}</span>
    </div>
}

export default Notifier;