import {useSelector} from "react-redux";

const LevelHeader = ({isChecked, isClickable, isActive}) => {
    const currentProfile = useSelector(state => state.profile.currentState);

    const width = () => {
        switch (currentProfile) {
            case 1:
                return '3.5%';
            case 2:
                return '15.5%';
            case 3:
                return '27.5%';
            case 4:
                return '39.5%';
            case 5:
                return '51.5%';
            case 6:
                return '63.5%';
            case 7:
                return '75.5%';
            default:
                return '100%';
        }
    }

    const labels = ['Problem', 'Team Capabilities', 'Vision & Value Proposition', 'Products', 'Market', "Business Model", "Scale", 'Investor Exit'];

    return <div className="level-header container-fluid">
        <div className="category-wizard self-assessment-base__wizard">
            <div className="category-wizard__container">
                <div className="category-wizard__steps">
                    <div className="category-wizard__steps-container">
                        {
                            labels.map((label, index) => <div key={label}
                                                              className={`category-wizard-step ${currentProfile > index ? 'is-active is-checked' : ''} ${currentProfile === index ? 'is-clickable' : ''}`}>
                                <p
                                    className="category-wizard-step__label">{label}</p>
                                <div className="category-wizard-step__circles">
                                    <div
                                        className="category-wizard-step__circle category-wizard-step__circle--point"/>
                                    <div
                                        className={`category-wizard-step__circle category-wizard-step__circle--bigger ${currentProfile > index ? 'is-active is-checked is-clickable' : ''}`}
                                    />
                                </div>
                            </div>)
                        }


                    </div>
                    <div className="category-wizard__progress" style={{width: width()}}/>
                </div>
            </div>
        </div>
    </div>
}

export default LevelHeader;