import React, { useState } from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function NotificationCard(props) {
    const [cardData, setCardData] = useState(props);
    const AuthState = useSelector((state) => state.Auth);
    // AuthState.login_type

    const showtime = () => {
        return (<div className="d-flex flex-row justify-content-between">
            <div>
                <small>
                    date: {props.timestamp.slice(0, 10)}
                </small>
            </div>
            <div>
                <small>
                    time: {(parseInt(props.timestamp.slice(11, 13)) + 7) % 24}{props.timestamp.slice(13, 16)}
                </small>
            </div>
        </div>
        )
    }
    const display = () => {
        // console.log(props)
        switch (props.state) {
            case 1:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> Job Application Submit </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        {props.student.firstName} {props.student.lastName} {" "} applied for {" "}
                                        {props.job.jobTitle} at {props.job.companyName}
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>
                )
            case 2:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> Application {props.addition === true ? "Accept" : "Decline"} </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        You were {props.addition === true ? "accepted" : "declined"}
                                        {" "} for {props.job.jobTitle} at {props.job.companyName}
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>
                )
            case 3:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> Application {props.addition === true ? "Complete" : "Reject"} </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        {cardData.student.firstName} {cardData.student.lastName} {props.addition === true ? "accepted" : "declined"}
                                        {" "} to do {props.job.jobTitle} at {props.job.companyName}
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>
                )
            case 4:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> Job Start </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        {props.student.firstName} {props.student.lastName} {" "} is start working on {" "}
                                        {props.job.jobTitle} at {props.job.companyName}
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>

                )
            case 5:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> Work Submitted </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        {props.student.firstName} {props.student.lastName} {" "}
                                        sent a submission on {props.job.jobTitle} at {props.job.companyName}
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>
                )
            case 6:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> {props.addition === true ?
                                    "Job is Done" : "Submission Declined"}
                                </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        {props.addition === true ?
                                            <div>
                                                You have finish doing {props.job.jobTitle} at {props.job.companyName}
                                            </div> :
                                            <div>
                                                Your submission for {props.job.jobTitle} at {props.job.companyName} were declined
                            </div>
                                        }
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>
                )
            case 7:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> Timeout Alert </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        {props.job.jobTitle} at {props.job.companyName} {" "} is timeout
                                </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>

                )
            case 8:
                return (
                    <div className="cardd-container d-flex flex-column p-2">
                        <div>
                            <div>
                                <h6> Resignation Request </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        {props.student.firstName} {props.student.lastName}
                                        {" "} sent a resignation request for {props.job.jobTitle} at {props.job.companyName}
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>
                )
            case 9:
                return (
                    <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                        <div>
                            <div>
                                <h6> Resignation {props.addition === true ?
                                    "Accepted" : "Declined"} </h6>
                            </div>
                            <div>
                                <div className="message-container">
                                    <text className="message-font">
                                        Your resignation request for {props.job.jobTitle} at {props.job.companyName} is {props.addition === true ?
                                            "accepted" : "declined"}
                                    </text>
                                </div>
                            </div>
                        </div>
                        {showtime()}
                    </div>
                )
        }
    }
        const displayStudent = () => {
            // console.log(props)
            switch (props.state) {
                
                case 2:
                    return (
                        <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                            <div>
                                <div>
                                    <h6> Application {props.addition === true ? "Accept" : "Decline"} </h6>
                                </div>
                                <div>
                                    <div className="message-container">
                                        <text className="message-font">
                                            You were {props.addition === true ? "accepted" : "declined"}
                                            {" "} for {props.job.jobTitle} at {props.job.companyName}
                                        </text>
                                    </div>
                                </div>
                            </div>
                            {showtime()}
                        </div>
                    )
                
                
                case 6:
                    return (
                        <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                            <div>
                                <div>
                                    <h6> {props.addition === true ?
                                        "Job is Done" : "Submission Declined"}
                                    </h6>
                                </div>
                                <div>
                                    <div className="message-container">
                                        <text className="message-font">
                                            {props.addition === true ?
                                                <div>
                                                    You have finish doing {props.job.jobTitle} at {props.job.companyName}
                                                </div> :
                                                <div>
                                                    Your submission for {props.job.jobTitle} at {props.job.companyName} were declined
                                </div>
                                            }
                                        </text>
                                    </div>
                                </div>
                            </div>
                            {showtime()}
                        </div>
                    )
                case 7:
                    return (
                        <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                            <div>
                                <div>
                                    <h6> Timeout Alert </h6>
                                </div>
                                <div>
                                    <div className="message-container">
                                        <text className="message-font">
                                            {props.job.jobTitle} at {props.job.companyName} {" "} is timeout
                                    </text>
                                    </div>
                                </div>
                            </div>
                            {showtime()}
                        </div>

                    )
                
                case 9:
                    return (
                        <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                            <div>
                                <div>
                                    <h6> Resignation {props.addition === true ?
                                        "Accepted" : "Declined"} </h6>
                                </div>
                                <div>
                                    <div className="message-container">
                                        <text className="message-font">
                                            Your resignation request for {props.job.jobTitle} at {props.job.companyName} is {props.addition === true ?
                                                "accepted" : "declined"}
                                        </text>
                                    </div>
                                </div>
                            </div>
                            {showtime()}
                        </div>
                    )
                default:
                    return <></>
            }
        }
            const displayEmployer = () => {
                // console.log(props)
                switch (props.state) {
                    case 1:
                        return (
                            <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                                <div>
                                    <div>
                                        <h6> Job Application Submit </h6>
                                    </div>
                                    <div>
                                        <div className="message-container">
                                            <text className="message-font">
                                                {props.student.firstName} {props.student.lastName} {" "} applied for {" "}
                                                {props.job.jobTitle} at {props.job.companyName}
                                            </text>
                                        </div>
                                    </div>
                                </div>
                                {showtime()}
                            </div>
                        )
                        case 3:
                            return (
                                <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                                    <div>
                                        <div>
                                            <h6> Application {props.addition === true ? "Complete" : "Reject"} </h6>
                                        </div>
                                        <div>
                                            <div className="message-container">
                                                <text className="message-font">
                                                    {cardData.student.firstName} {cardData.student.lastName} {props.addition === true ? "accepted" : "declined"}
                                                    {" "} to do {props.job.jobTitle} at {props.job.companyName}
                                                </text>
                                            </div>
                                        </div>
                                    </div>
                                    {showtime()}
                                </div>
                            )

                    case 4:
                        return (
                            <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                                <div>
                                    <div>
                                        <h6> Job Start </h6>
                                    </div>
                                    <div>
                                        <div className="message-container">
                                            <text className="message-font">
                                                {props.student.firstName} {props.student.lastName} {" "} is now working on {" "}
                                                {props.job.jobTitle} at {props.job.companyName}
                                            </text>
                                        </div>
                                    </div>
                                </div>
                                {showtime()}
                            </div>

                        )
                    case 5:
                        return (
                            <div className="cardd-container d-flex flex-column p-2 justify-content-between">
                                <div>
                                    <div>
                                        <h6> Work Submitted </h6>
                                    </div>
                                    <div>
                                        <div className="message-container">
                                            <text className="message-font">
                                                {props.student.firstName} {props.student.lastName} {" "}
                                                sent a submission on {props.job.jobTitle} at {props.job.companyName}
                                            </text>
                                        </div>
                                    </div>
                                </div>
                                {showtime()}
                            </div>
                        )

                    case 8:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <div>
                                        <h6> Resignation Request </h6>
                                    </div>
                                    <div>
                                        <div className="message-container">
                                            <text className="message-font">
                                                {props.student.firstName} {props.student.lastName}
                                                {" "} sent a resignation request for {props.job.jobTitle} at {props.job.companyName}
                                            </text>
                                        </div>
                                    </div>
                                </div>
                                {showtime()}
                            </div>
                        )
                    default:
                        return <></>
                }


            }
        
    
    const displayy = AuthState.login_type === "STUDENT" ? displayStudent() : displayEmployer()
    return displayy
}