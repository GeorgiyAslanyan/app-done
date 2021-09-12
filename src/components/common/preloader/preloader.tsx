import load from "../../../assets/images/preloader.gif";
import React from "react";

type PropsType = {

}

const Preloader: React.FC<PropsType> = () => {
    return <div>
            <img src={load} alt=""/>
    </div>
}

export default Preloader