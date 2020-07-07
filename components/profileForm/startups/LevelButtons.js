import React from "react";
import {decrementCurrentState} from "../../../store/actions/profile";
import {useDispatch} from "react-redux";

const LevelButtonsComponent = ({noPrev = false, nextHandler = null}) => {
    const dispatch = useDispatch();

    return <div className="d-flex mt-5">
        {!noPrev && <button className="btn prev mr-auto" type="button" onClick={() => dispatch(decrementCurrentState())}>
            <span/> Prev</button>}
        <button className="btn next ml-auto" type="submit" onClick={nextHandler}>Next <span/></button>
    </div>
}

export default LevelButtonsComponent;