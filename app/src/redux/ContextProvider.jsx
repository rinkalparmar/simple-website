import { useState } from "react";
import Context from "./Context";


const ContextProvider = (props) => {
    const [getCount, setGetCount] = useState(() => {
        return JSON.parse(localStorage.getItem("orderCount") || 0);

    });

    const updateCount = () => {
        const addCount = getCount + 1;
        setGetCount(addCount);
        localStorage.setItem("orderCount", JSON.stringify(addCount));
    };

    return (
        <Context.Provider value={{ getCount, updateCount }}>
            {props.children}
        </Context.Provider>
    );
};
    
export default ContextProvider; 