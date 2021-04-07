import React from 'react';
import JobCard from '../JobCard';
import ResultCard from '../ResultCard';
import ResponseCard from '../ResponseCard';
import StudentCard from '../StudentCard';
import './style.scss'
import ContractCard from '../ContractCard';
import NotificationCard from "../../components/NotificationCard";

const NotificationPane = (props) => {

    const getList = (list) => {
        //console.log('import noti list',list)
        let notificationList = []
        list.map((notification, idx) =>{
            notificationList.push(
                <div key={idx}>
                    <NotificationCard
                        // cardData={notification}
                        state={notification.state}
                        student={notification.student}
                        employer={notification.employer}
                        job={notification.job}
                        timestamp={notification.timestamp}
                        addition={notification.addition}
                    />
                </div>
            )
        })
        return notificationList
    }

    const sendList = getList(props.list)

    return (
        <div>
            {sendList}
        </div>
    )
}

export default NotificationPane