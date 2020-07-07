import {useSelector} from "react-redux";

const LevelHeader = ({isChecked, isClickable, isActive}) => {
    const currentProfile = useSelector(state => state.profile.currentState);

    const width = () => {
        switch (currentProfile) {
            case 1:
                return '3%';
            case 2:
                return '17%';
            case 3:
                return '30%';
            case 4:
                return '45%';
            case 5:
                return '59%';
            case 6:
                return '74%';
            case 7:
                return '87%';
            default:
                return '100%';
        }
    }

    const labels = ['Problem', 'Vision', 'Product', 'Market', "Model", 'Team', "Scale", 'Exit'];

    return <div className="steps-wrapper">
        <div className="steps">
            {
                labels.map((label, index) => < div key={label} className={`step ${currentProfile > index ? 'is-active is-checked' : ''} ${currentProfile === index ? 'is-clickable' : ''}`}>

                    <p className="label">{label}</p>

                    <div className="circles">
                        <div className="circle"/>
                        <div className={`circle bigger-circle ${currentProfile > index ? 'is-active is-checked is-clickable' : ''}`}/>
                    </div>
                </div>)
            }
        </div>
        <div className="progress" style={{width: width()}}/>
    </div>

}

export default LevelHeader;