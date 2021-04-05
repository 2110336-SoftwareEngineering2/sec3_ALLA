import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import JobPane from "../../components/JobPane";
import SearchFilter from "../../components/SearchFilter";
import "./style.scss";

const initCardData = {
    eventId: 1,
    student: "",
    employer: "",
    eventFlag: 1,
    jid: "",
    date: "",
}

const notificationList = [];

const [cardData, setCardData] = useState(initCardData);

return (
    <div className="jobpane-container ">
        {list}
    </div>
)


export default NotificationCard;