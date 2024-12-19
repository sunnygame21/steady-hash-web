import React, { useEffect, useState } from "react";
import moment, { MomentInput } from "moment";
import ReactCalendar from "react-calendar";
import { classNames, formatAmount } from "@/utils/helper";
import { BarIcon, CalendarIcon } from "@/components/Icons";

import styles from "./index.module.css";

const CalenderViewType = {
  month: {
    key: "month",
    text: "D",
    style: ''
  },
  year: {
    key: "year",
    text: "M",
    style: styles.yearCalendar
  },
};
const shortMonthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const Calendar = () => {
  useEffect(() => {}, []);
  const currentDate = moment().utc().format("YYYY-MM-DD");
  const [date, setDate] = useState(currentDate);
  const [calenderType, setCalenderType] = useState<any>(CalenderViewType.month);

  const isNotStart = (date: any) => {
    return (
      date.getMonth() !== moment(currentDate).month() &&
      date.getMonth() !== moment(currentDate).month() - 1
    );
  };

  const tileContent = ({ date }: any) => {
    if (moment(date).format("YYYY-MM-DD") === currentDate) {
      return <div className={styles.activeDate}>{date.getDate()}</div>;
    }
    // if (isNotStart(date)) {
    //   return "";
    // }
    const result: any = {};
    if (result) {
      return (
        <div className={styles.dateData}>
          <div className={styles.num}>{formatAmount(1212)}</div>
        </div>
      );
    }
    // return date.getDate();
  };

  const onClickDay = (date: MomentInput) => {};

  return (
    <>
      <div className={styles.viewWrap}>
        {[CalenderViewType.month, CalenderViewType.year].map((item) => {
          return (
            <p
              className={calenderType.key === item.key ? styles.viewActive : ""}
              key={`calender-view-${item.key}`}
              onClick={() => {
                setCalenderType(item)
              }}
            >
              {item.text}
            </p>
          );
        })}
      </div>
      <ReactCalendar
        onChange={() => {}}
        showNeighboringMonth={false}
        calendarType="gregory"
          locale="en"
        value={date}
        className={classNames(styles.calendar, calenderType.style)}
        tileClassName={styles.calendarTile}
        onClickDay={onClickDay}
        tileContent={tileContent}
        next2Label={null}
        prev2Label={null}
        navigationLabel={({ date, label, locale, view }) => {
          console.log("<div>asdsad</div>", date, label, locale, view);
          return (
            <div className={styles.navigation}>
              <p>{label}</p>
              <p>+123</p>
            </div>
          );
        }}
        formatMonth={(locale, date) =>
        {
         return   date.toLocaleString(locale, { month: "short" }) // "Jan", "Feb", etc.
        }
        }
        onClickYear={(date, event) => {
         
          event.preventDefault(); // 阻止默认行为
          console.log("Year clicked:", date.getFullYear());
        }}
        view={calenderType.key}
      />
    </>
  );
};

export default Calendar;
