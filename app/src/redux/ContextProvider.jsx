import { useEffect, useState } from "react";
import Context from "./Context";


const ContextProvider = (props) => {
    // const [getCount, setGetCount] = useState(() => {
    //     return JSON.parse(localStorage.getItem("orderCount") || 0);
    // });

    const [getCount, setGetCount] = useState(0);
    // const updateCount = () => {
    //     const addCount = getCount + 1;
    //     setGetCount(addCount);
    //     localStorage.setItem("orderCount", JSON.stringify(addCount));
    // };

    // const removeItem = () => {
    //     if (getCount > 0) {
    //         const newCount = getCount - 1;
    //         setGetCount(newCount);
    //         localStorage.setItem("orderCount", JSON.stringify(newCount));
    //     }
    // };

    const countDisplay = () => {
        // debugger;
        const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
        const userId = loginData?.id;
        console.log("userId", userId);


        if (!userId) {
            setGetCount(0);
            return;
        }

        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        console.log("cartData", cartData);

        const userfind = cartData.find((u) => u.userId === userId);
        console.log("userfind", userfind);

        if (userfind) {
            setGetCount(userfind.items.length);
        }
        else {
            setGetCount(0);
        }
    };
    useEffect(() => {
        countDisplay();
    }, []);

    return (
        <Context.Provider value={{ getCount, setGetCount, countDisplay }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;

