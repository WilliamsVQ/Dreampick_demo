/**
 * @CountDownTimer.jsx Copyright(c) 2023 Jalasoft
 * 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
 * Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
 * All rights reserved
 * This software is the confidential and proprietary information of
 * Jalasoft,ConfidentialInformation'). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Jalasoft
 */

import useCountDown from '../helpers/useCountDown';

/**
 * This component just define a message that says 'Meeting Time'.
 * @returns A React component.
 */
const ExpiredNotice = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Meeting Time</h1>
        </div>
    );
};

/**
 * ShowCounter is a function that takes in an object with four properties (days, hours, minutes,
 * seconds) and returns a component that displays the values of those properties in an specific format.
 * @param {number} days Represents the count of days.
 * @param {number} hours Represents the count of hours.
 * @param {number} minutes Represents the count of minutes.
 * @param {number} seconds Represents the count of seconds.
 * @returns A React component that displays the days, hours, minutes, and seconds.
 */

// eslint-disable-next-line react/prop-types
const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{days}d : {hours}h : {minutes}m : {seconds}s </h1>
        </div>
    );
};

/**
 * If the timer ends the counting, then return the ExpiredNotice componet message,
 * otherwise return the ShowCounter component because is still counting.
 * @param {number} targetDate The date time that represents the count.
 * @returns A React component.
 */
// eslint-disable-next-line react/prop-types
const CountDownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountDown(targetDate);

    // console.log('hola');
    /**
     * This is a conditional statement that checks if the days + hours + minutes + seconds is less than
     * or equal to 0. If it is, then it returns the ExpiredNotice component, otherwise it returns the
     * ShowCounter component.
     */
    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
    }
};

// Export the CountDownTimer component.
export default CountDownTimer;
