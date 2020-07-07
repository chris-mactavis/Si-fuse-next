// import React from "react";
//
// const InfoBox = ({heading, text}) => {
//     return <div className="info-box-container d-flex align-items-center h-100">
//         <div className="info-box d-flex flex-column justify-content-center text-center">
//             <p>{heading}</p>
//             <span>{text}</span>
//         </div>
//     </div>;
// }
//
// export default InfoBox;
import React from "react";

const InfoBox = ({heading, text}) => {
    return <h4 className="text-center mb-5">{text}</h4>;
}

export default InfoBox;