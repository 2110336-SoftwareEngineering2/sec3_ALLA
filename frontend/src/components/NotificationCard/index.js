import React, { useState } from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function NotificationCard(props){ 
    const [cardData, setCardData] = useState(props);
    
    return (
        <div className="d-flex flex-column">
            <div>
                {cardData.eventId}
            </div>
            <div>
                {cardData.student}
            </div>
            <div>
                {cardData.eventFlag}
            </div>
            <div>
                {cardData.jid}
            </div>
            <div>
                {cardData.employer}
            </div>
            <div>
                {cardData.date}
            </div>
        </div>
        // switch (eventFlag){
        //     case "1":
        //         switch (eventId){
        //             case "1":
        //             case "2":
        //             case "3":
        //         }
        //     case "2":
        //         switch (eventId){
        //             case "1":
        //             case "2":
        //             case "3":
        //             case "4":
        //             case "5":
        //             case "6":
        //         }
        // }
    )
}