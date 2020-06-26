import React from "react";
import {decrementCurrentState} from "../../../store/actions/profile";
import {useDispatch} from "react-redux";

const LevelButtonsComponent = ({noPrev = false, nextHandler = null}) => {
    const dispatch = useDispatch();

    return <div className="row">
        <div className="col-md-8">
            <div className="d-flex mt-5">
                {!noPrev && <button className="btn mr-2 prev" type="button" onClick={() => dispatch(decrementCurrentState())}><span/> Previous</button>}
                <button className="btn ml-2 next" type="submit" onClick={nextHandler}>Next <span/></button>
            </div>
        </div>
    </div>
}

export default LevelButtonsComponent;