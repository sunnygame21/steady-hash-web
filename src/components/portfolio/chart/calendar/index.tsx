import React, { useEffect, useState } from "react";
import moment, { MomentInput } from "moment";
import ReactCalendar from "react-calendar";
import { classNames, formatAmount } from "@/utils/helper";
import { BarIcon, CalendarIcon } from "@/components/Icons";

import styles from "./index.module.css";

const ChartType = {
  calendar: "calendar",
  bar: "bar",
};

const Calendar = () => {
  useEffect(() => {}, []);
  const currentDate = moment().utc().format("YYYY-MM-DD");
  const [date, setDate] = useState(currentDate);
  const [type, setType] = useState(ChartType.calendar);

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

  const typeChange = (type: string) => {
    setType(type);
  };

  return (
    <ReactCalendar
      onChange={() => {}}
      showNeighboringMonth={false}
      calendarType="gregory"
      value={date}
      className={styles.calendar}
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
      onClickYear={(date, event) => {
        event.preventDefault(); // 阻止默认行为
        console.log("Year clicked:", date.getFullYear());
      }}
      view="month"
    />
  );
};

export default Calendar;
