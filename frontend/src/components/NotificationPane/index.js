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
        console.log('import noti list',list)
        let notificationList = []
        list.map((notification, idx) =>{
            notificationList.push(
                <div key={idx}>
                    <NotificationCard
                        // cardData={notification}
                        eventId={notification.eventId}
                        student={notification.student}
                        employer={notification.employer}
                        eventFlag={notification.eventFlag}
                        jid={notification.jid}
                        date={notification.date}
                        submission={notification.submission}
                        confirm={notification.confirm}
                        resign={notification.resign}
                        offer={notification.offer}
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