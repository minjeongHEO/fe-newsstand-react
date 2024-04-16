import React, { useEffect, useState } from 'react';
import style from '../../css/components/header/Dates.module.scss';
export default function Dates() {
    const [date, setDate] = useState('🕓');

    useEffect(() => {
        setInterval(() => {
            const today = new Intl.DateTimeFormat('ko-KR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'Asia/Seoul',
            }).format(new Date());

            setDate(today);
        }, 1000);
    }, [date]);

    return (
        <div className={style.date} id="header-date">
            {date}
        </div>
    );
}
