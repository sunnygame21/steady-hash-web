import React, { useEffect, useState } from "react";
import moment, { MomentInput } from "moment";
import ReactCalendar from "react-calendar";
import { classNames, formatAmount } from "@/utils/helper";
import {
  BarIcon,
  CalendarIcon,
  PreIcon,
  PreWhiteIcon,
} from "@/components/Icons";

import styles from "./index.module.css";

const CURRENT = moment().utc();

const CalenderViewType = {
  month: {
    key: "month",
    text: "D",
    style: "",
    date: CURRENT.format("YYYY-MM-DD"),
    lastDate: CURRENT.format("MMMM YYYY"),
  },
  year: {
    key: "year",
    text: "M",
    style: styles.yearCalendar,
    date: CURRENT.format("YYYY-MM"),
    lastDate: `${CURRENT.year()}`,
  },
};

const Calendar = () => {
  useEffect(() => {}, []);
  const currentDate = moment().utc().format("YYYY-MM-DD");

  const [calenderType, setCalenderType] = useState<any>(CalenderViewType.month);
  const [date, setDate] = useState(calenderType.date);
  const [curDateText, setCurDateText] = useState<string>("");

  const isNotStart = (date: any) => {
    return (
      date.getMonth() !== moment(currentDate).month() &&
      date.getMonth() !== moment(currentDate).month() - 1
    );
  };

  const tileContent = ({ date }: any) => {
    if (moment(date).format("YYYY-MM-DD") === calenderType.date) {
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
                setCalenderType(item);
              }}
            >
              {item.text}
            </p>
          );
        })}
      </div>
      <ReactCalendar
        onChange={setDate}
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
          setTimeout(() => {
            setCurDateText(label);
          }, 200);
          return (
            <div className={styles.navigation}>
              <p>{label}</p>
              <p>+123</p>
            </div>
          );
        }}
        maxDate={new Date()} // 禁用前进按钮
        prevLabel={<PreIcon />}
        nextLabel={
          curDateText === calenderType.lastDate ? (
            <PreWhiteIcon className={styles.nextBtn} />
          ) : (
            <PreIcon className={styles.nextBtn} />
          )
        }
        formatMonth={(locale, date) => {
          return date.toLocaleString(locale, { month: "short" }); // "Jan", "Feb", etc.
        }}
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
