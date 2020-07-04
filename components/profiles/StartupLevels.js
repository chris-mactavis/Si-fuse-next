import React from "react";
import {getFairness, startupLevel} from "../../helpers";

const StartupProfileLevels = ({startupLevel, levelKeys, index, fairness}) => {

    const getLevelName = (name) => {
        switch (name) {
            case 'problem':
                return 'Problem';
            case 'team':
                return 'Team Capability';
            case 'vision':
                return 'Vision and Value';
            case 'products':
                return 'Product';
            case 'market':
                return 'Market';
            case 'business_model':
                return 'Business Model';
            case 'scale':
                return 'Scalability';
            case 'investor_exit':
                return 'Investor Exit';
        }
    }

    return <div className="row">
        <div className="col-md-12">
            <div className="startup-description">
                <div className="row">
                    <div className="col-md-4">
                        <div className={`d-flex flex-column h-100 justify-content-center text-center side-content ${getFairness(fairness)}`}>
                            <img src={`/images/icon/startup-level-${levelKeys[index]}.svg`}
                                 alt=""/>
                            <p className="p-0 level-name">{getLevelName(levelKeys[index])}</p>
                            <div className="grade">{getFairness(fairness)}</div>
                        </div>

                    </div>

                    <div className="col-md-8">
                        <div className="startup-level-content">
                            <ul>
                                {startupLevel.map((lvl, index) => <li key={index}>{lvl}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default StartupProfileLevels;