import React from 'react'

export default function JobDetail(props) {
    return (
        <div>
            {props.match.params.Jid}
        </div>
    )
}
