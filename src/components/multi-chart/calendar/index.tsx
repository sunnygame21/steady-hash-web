import React, { useContext, useEffect, useRef, useState } from "react";
import moment, { MomentInput } from "moment";
import ReactCalendar from "react-calendar";
import { find, sumBy } from "lodash";
import { GlobalContext } from "@/app/state/global";
import { classNames, formatAmount } from "@/utils/helper";
import { transMonthProfit, transProfit } from "@/utils/profit";
import { CAlENDAR_TYPE } from "@/constant";
import { Profit } from "@/types/info";
import { PreIcon, PreWhiteIcon } from "@/components/Icons";

import styles from "./index.module.css";

const CURRENT = moment().utc().local();

const CalenderViewType = {
  [CAlENDAR_TYPE.month]: {
    key: CAlENDAR_TYPE.month,
    text: "D",
    style: "",
    date: CURRENT.format("YYYY-MM-DD"),
    lastDate: CURRENT.format("MMMM YYYY"),
    curDate: CURRENT.format("MMMM YYYY"),
  },
  [CAlENDAR_TYPE.year]: {
    key: CAlENDAR_TYPE.year,
    text: "M",
    style: styles.yearCalendar,
    date: CURRENT.format("YYYY-MM"),
    // 用来判断 nextBtn 的样式
    lastDate: `${CURRENT.year()}`,
    curDate: `${CURRENT.year()}`,
  },
};

const HistoryData: any = {
  [CAlENDAR_TYPE.month]: {},
  [CAlENDAR_TYPE.year]: {},
};

const Calendar = () => {
  const { userShares, messageApi } = useContext(GlobalContext);
  const calenderRef = useRef<any>(null);
  const [calenderInfo, setCalenderInfo] = useState<any>(CalenderViewType.month);
  const [value, setDate] = useState(calenderInfo.date);
  const [curDateText, setCurDateText] = useState<any>(calenderInfo.curDate);
  const [results, setResults] = useState<Profit[]>([]);
  const [disable, setDisable] = useState(false);

  const isNotCurMonth = (date: any) => {
    return date.getMonth() !== moment(value).month();
  };

  const getData = async (date: any) => {
    if (calenderRef?.current?.loading) return;
    const startDate = moment(date).startOf("month").format("YYYY-MM-DD");
    try {
      if (userShares?.length) {
        if (HistoryData?.[calenderInfo.key]?.[startDate]) {
          setResults(HistoryData?.[calenderInfo.key]?.[startDate]);
          return;
        }
        calenderRef.current.loading = true;
        setDisable(true);
        messageApi.open({
          type: "loading",
          content: "Loading",
          duration: 10000,
        });

        let url = "/api/user/daily-profit";
        let endDate = moment(date).endOf("month").format("YYYY-MM-DD");
        if (calenderInfo.key === CAlENDAR_TYPE.year) {
          url = "/api/user/monthly-profit";
          endDate = moment(date).endOf("year").format("YYYY-MM-DD");
        }
        const { success, data = [] } = await fetch(
          `${url}?startDate=${startDate}&endDate=${endDate}`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .catch(() => ({ success: false }));
        const daysDifference = moment(endDate).diff(moment(startDate), "days");
        if (success) {
          let res: any = [];
          if (calenderInfo.key === CAlENDAR_TYPE.month) {
            res = transProfit(data, daysDifference, startDate);
          } else {
            res = transMonthProfit(data);
          }
          setResults(res);
          HistoryData[calenderInfo.key][startDate] = res;
        }

        messageApi.destroy();
        calenderRef.current.loading = false;
        setDisable(false);
      }
    } catch (error) {
      calenderRef.current.loading = false;
      setDisable(false);
      messageApi.destroy();
      console.log("get calendar data error", error);
    }
  };

  const tileContent = ({ date }: any) => {
    let curDate = moment(date).format("YYYY-MM-DD");
    let curProfit: any = find(results, (item) => item.date === curDate);
    let money = formatAmount(curProfit?.profit || 0);
    const monthText = moment(date).format("MMMM".substring(0, 3));

    if (calenderInfo.key === CAlENDAR_TYPE.month) {
      // 上个月的日期显示 -
      if (isNotCurMonth(date) && moment(date).isBefore(value)) {
        return <div className={styles.preMonth}>-</div>;
      }
      // 下个月的日期不显示
      if (isNotCurMonth(date)) {
        return "";
      }
      // 今天之后的日期 只显示数字
      if (moment(date).isAfter(CURRENT)) {
        return (
          <div className={styles.disable}>
            {date.getDate()}
            <p className={styles.num}></p>
          </div>
        );
      }
      // 今天
      if (curDate === moment(value).format("YYYY-MM-DD")) {
        return (
          <div className={styles.activeDate}>
            <p className={styles.date}>{date.getDate()}</p>
            <p className={styles.num}>{disable ? "n/a" : money}</p>
          </div>
        );
      }
    } else {
      curDate = moment(date).format("YYYY-MM");
      curProfit = find(results, (item) => item.date === curDate);
      money = formatAmount(curProfit?.profit || 0);
      if (
        moment(date).month() > moment(CURRENT).month() &&
        moment(date).isAfter(CURRENT)
      ) {
        return <div className={styles.disable}>{monthText}</div>;
      }
      if (moment(CURRENT).format("YYYY-MM") === curDate) {
        return (
          <div className={styles.activeDate}>
            <p className={styles.date}>{monthText}</p>
            <p className={styles.num}>{disable ? "n/a" : money}</p>
          </div>
        );
      }
    }

    let className = "";
    if (!curProfit?.profit || curProfit?.profit === 0) {
      className = "noProfitDate";
    }
    if (curProfit?.profit > 0) {
      className = "profitDate";
    }
    if (curProfit?.profit < 0) {
      className = "lossProfitDate";
    }
    return (
      <div className={styles[className]}>
        <p>
          {calenderInfo.key === CAlENDAR_TYPE.month
            ? date.getDate()
            : monthText}
        </p>
        <p className={styles.num}>{disable ? "n/a" : money}</p>
      </div>
    );
  };

  useEffect(() => {
    if (userShares.length && calenderRef.current) {
      getData(value);
    }
  }, [value, userShares.length, calenderInfo.key]);

  return (
    <div style={{ position: "relative" }} ref={calenderRef}>
      {disable && <div className={styles.mask}></div>}
      <div className={styles.viewWrap}>
        {[CalenderViewType.month, CalenderViewType.year].map((item) => {
          return (
            <p
              className={calenderInfo.key === item.key ? styles.viewActive : ""}
              key={`calender-view-${item.key}`}
              onClick={() => {
                setCalenderInfo(item);
                setCurDateText(item.curDate);
                setDate(CURRENT);
              }}
            >
              {item.text}
            </p>
          );
        })}
      </div>
      <ReactCalendar
        key={calenderInfo.key}
        onChange={(date) => {
          console.log("onChange", date);
        }}
        showNeighboringMonth={true}
        calendarType="gregory"
        locale="en"
        value={value}
        className={classNames(styles.calendar, calenderInfo.style)}
        tileClassName={classNames(styles.calendarTile)}
        tileContent={tileContent}
        next2Label={null}
        prev2Label={null}
        navigationLabel={({ date, label, locale, view }) => {
          const num = sumBy(results, "profit");
          return (
            <div className={styles.navigation}>
              <p>{label}</p>
              <p>{disable ? "n/a" : formatAmount(num)}</p>
            </div>
          );
        }}
        maxDate={new Date()} // 禁用前进按钮
        // minDate={new Date("2024-12-01")}
        prevLabel={
          // curDateText == calenderType.lastDate ? <PreWhiteIcon /> : <PreIcon />
          <PreIcon />
        }
        nextLabel={
          curDateText == calenderInfo.lastDate ? (
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
        }}
        onActiveStartDateChange={(date) => {
          console.log("onActiveStartDateChange", date, calenderInfo);
          const { activeStartDate } = date;
          if (
            moment(activeStartDate).format("YYYY-MM-DD") ===
            CURRENT.format("YYYY-MM-DD")
          ) {
            setDate(CURRENT);
          } else {
            setDate(activeStartDate);
          }

          // monthChange(activeStartDate);
          // getData(activeStartDate);
          switch (calenderInfo.key) {
            case "year":
              setCurDateText(moment(activeStartDate).year());
              break;
            case "month":
              setCurDateText(moment(activeStartDate).format("MMMM YYYY"));
              break;
            default:
              break;
          }
        }}
        view={calenderInfo.key}
      />
    </div>
  );
};

export default Calendar;
