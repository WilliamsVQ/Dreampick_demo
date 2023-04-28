/**
 * @useCountDown.jsx Copyright(c) 2023 Jalasoft
 * 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
 * Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
 * All rights reserved
 * This software is the confidential and proprietary information of
 * Jalasoft,ConfidentialInformation"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Jalasoft
 */

import { useEffect, useState } from 'react';

/**
 * It takes a target date and returns an object with the number of days, hours, minutes, and seconds
 * until that date.
 * @param {number} targetDate The date time we want to count down.
 * @returns The array of numbers from getReturnValues function.
 */
const useCountDown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    // A function that is called every time the component is rendered.
    useEffect(() => {
        // Sets an interval to update the countDown state every second.
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

/**
 * Gets an array of the days, hours, minutes, and seconds of the counter.
 * @param {number} countDown The date time that is actualized as a state.
 * @returns {[number,number,number,number]} The array of numbers.
 */
const getReturnValues = (countDown) => {
    // Calculate the number of days left until the target date.
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    // Calculate the number of hours left until the target date.
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // Calculate the number of minutes left until the target date.
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    // Calculate the number of seconds left until the target date.
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};

// Exporting the function useCountDown so that it can be imported into other files.
export default useCountDown;
