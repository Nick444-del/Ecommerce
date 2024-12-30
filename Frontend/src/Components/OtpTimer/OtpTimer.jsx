import React from 'react'
import CountDown from 'react-countdown'

const OtpTimer = () => {
    return (
        <div className="my-3 timer">
            <CountDown date={Date.now()+1*60*1000} />
        </div>
    )
}

export default OtpTimer