/**
 * @Package: useMobileScreen.jsx
 * @Date   : Dec 23rdd, 2021
 * @Author : Xiao Ling   
 * @Docs   : https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto
 *
 *
*/



import {useEffect, useState} from "react";

/**
 * 
 * @use: compute width of the window
 * 
 */ 
const useCheckMobileScreen = (maxWidth) => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    let wd = trivialNum(maxWidth) ? 768 : maxWidth
    // return (width <= maxWidth);
    return (width <= wd);
}

const trivialNum = (n) => {
    return (n === undefined || n === null || isNaN(n) )
}



export default useCheckMobileScreen