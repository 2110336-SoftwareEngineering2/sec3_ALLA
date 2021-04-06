import React, { useState } from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function NotificationCard(props) {
    const [cardData, setCardData] = useState(props);
    console.log(props)
    const display = () => {
        switch (cardData.eventFlag) {
            case 1:
                switch (cardData.eventId) {
                    case 1:
                        return (<div className="cardd-container d-flex flex-column p-2">
                            <div>
                                <h6> Job Application Submit </h6>
                            </div>
                            {cardData.student} {" "} applies for {cardData.jid}
                        </div>
                        )
                    case 2:
                        //wait for backend to send offer component
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> Application {cardData.offer} </h6>
                                </div>
                                You were {cardData.offer === "accept" ?
                                    "accepted" : "declined"} for {cardData.jid}
                            </div>
                        )
                    case 3:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> Application {cardData.confirm === "accept" ?
                                        "Complete" : "Reject"}
                                    </h6>
                                </div>
                                {cardData.student} {cardData.confirm} to do {cardData.jid}
                            </div>
                        )
                }
            case 2:
                switch (cardData.eventId) {
                    case 1:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> Job Start </h6>
                                </div>
                                {cardData.student} {" "} is start working on {cardData.jid}
                            </div>
                        )
                    case 2:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> Work Submitted </h6>
                                </div>
                                {cardData.student} {" "} sent a submission on {cardData.jid}
                            </div>
                        )
                    case 3:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> {cardData.submission === "accept" ?
                                        "Job is Done" : "Submission Declined"}
                                    </h6>
                                </div>
                                {cardData.submission === "accept" ?
                                    <div>
                                        You have finish doing {cardData.jid}
                                    </div> :
                                    <div>
                                        Your submission for {cardData.jid} were declined
                                    </div>
                                }
                            </div>
                        )
                    case 4:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> Timeout Alert </h6>
                                </div>
                                {cardData.jid} {" "} is timeout
                            </div>
                        )
                    case 5:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> Resignation Request </h6>
                                </div>
                                {cardData.student} {" "} sent a resignation request for {cardData.jid}
                            </div>
                        )
                    case 6:
                        return (
                            <div className="cardd-container d-flex flex-column p-2">
                                <div>
                                    <h6> Resignation {cardData.resign === "accept" ?
                                        "Accepted" : "Declined"} </h6>
                                </div>
                                Your resignation request for {cardData.jid} is {cardData.resign === "accept" ?
                                    "accepted" : "declined"}
                            </div>
                        )
                }
        }
    }
    return display()

}