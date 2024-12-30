import React, { useContext, useEffect, useState } from "react";
import moment, { MomentInput } from "moment";
import ReactCalendar from "react-calendar";
import { find, sumBy } from "lodash";
import { GlobalContext } from "@/app/state/global";
import { classNames, formatAmount } from "@/utils/helper";
import { PreIcon, PreWhiteIcon } from "@/components/Icons";

import styles from "./index.module.css";

const CURRENT = moment().utc().local();

const CalenderViewType = {
  month: {
    key: "month",
    text: "D",
    style: "",
    date: CURRENT.format("YYYY-MM-DD"),
    lastDate: CURRENT.format("MMMM YYYY"),
    curDate: CURRENT.format("MMMM YYYY"),
  },
  year: {
    key: "year",
    text: "M",
    style: styles.yearCalendar,
    date: CURRENT.format("YYYY-MM"),
    // 用来判断 nextBtn 的样式
    lastDate: `${CURRENT.year()}`,
    curDate: `${CURRENT.year()}`,
  },
};

let firstFetch = false;

const Calendar = () => {
  useEffect(() => {}, []);
  const { userShares, messageApi } = useContext(GlobalContext);
  const [month, setMonth] = useState(CURRENT.month());
  const [calenderType, setCalenderType] = useState<any>(CalenderViewType.month);
  const [value, setDate] = useState(calenderType.date);
  const [curDateText, setCurDateText] = useState<any>(calenderType.curDate);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  console.log(
    'format("YYYY-MM-DD")',
    curDateText,
    value,
    calenderType,
    moment().format("YYYY-MM-DD"),
    moment().utc().local().format("YYYY-MM-DD")
  );
  const getMonthData = async () => {
    try {
      if (userShares?.length) {
      
        // setLoading(true);
        messageApi.open({
          type: "loading",
          content: "Loading",
          duration: 0,
        });
        firstFetch = true;
        const startDate = moment(value).startOf("month").format("YYYY-MM-DD");
        const endDate = moment(value).endOf("month").format("YYYY-MM-DD");
        console.log("startDate", startDate, endDate);
        const allPromise = userShares.map((share) => {
          return fetch(
            `/api/user/profit?productId=${share.productId}&startDate=${startDate}&endDate=${endDate}`,
            {
              method: "GET",
            }
          )
            .then((res) => res.json())
            .catch(() => ({ success: false }));
        });
        const allRes = await Promise.allSettled(allPromise);
        const resList = allRes
          .filter((item) => item.status === "fulfilled")
          .map((item) => item.value.data);
        console.log("resList", resList);
        if (resList?.[0]?.length) {
          const daysDifference = moment(endDate).diff(
            moment(startDate),
            "days"
          );

          const sumRes = new Array(4).fill(1).map((item, i) => {
            let dailyprofit = 0;
            let date = "";
            resList.forEach((profit: any, j) => {
              console.log("profit", profit, profit[i]);
              dailyprofit += Number(profit[i].dailyprofit);
              if (!date) {
                date = moment(profit[i].date).format("YYYY-MM-DD");
              }
            });
            return {
              date,
              dailyprofit,
            };
          });
          setResults(sumRes);
        }
      }
      setLoading(false);
      messageApi.destroy();
    } catch (error) {
      console.log("get calendar data error", error);
    }
  };

  const monthChange = (date: MomentInput) => {
    if (date) {
      const res = moment(date).month();
      setMonth(res);
    }
  };

  const tileContent = ({ date }: any) => {
    if (moment(date).isAfter(CURRENT)) {
      return <div className={styles.disable}></div>;
    }
    let className = "";
    const calendarDate = moment(date).format("YYYY-MM-DD");
    const calendarProfit = find(results, (item) => item.date === calendarDate);
    if (!calendarProfit?.dailyprofit || calendarProfit?.dailyprofit === 0) {
      className = "noProfitDate";
    }
    if (calendarProfit?.dailyprofit > 0) {
      className = "profitDate";
    }
    if (calendarProfit?.dailyprofit < 0) {
      className = "lossProfitDate";
    }

    return (
      <div className={styles[className]}>
        <div className={styles.num}>
          {formatAmount(calendarProfit?.dailyprofit || 0)}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!firstFetch) {
      getMonthData();
    }
  }, [userShares.length]);

  useEffect(() => {
    setCurDateText(calenderType.curDate);
  }, [calenderType.key]);

  return (
    <div className={styles.wrap}>
      {/* {loading && <Loading />} */}
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
        onChange={(date) => {
          console.log("onChange", date);
        }}
        showNeighboringMonth={false}
        calendarType="gregory"
        locale="en"
        value={CURRENT.format("YYYY-MM-DD")}
        className={classNames(styles.calendar, calenderType.style)}
        tileClassName={classNames(styles.calendarTile)}
        tileContent={tileContent}
        next2Label={null}
        prev2Label={null}
        navigationLabel={({ date, label, locale, view }) => {
          const num = sumBy(results, "dailyprofit");
          return (
            <div className={styles.navigation}>
              <p>{label}</p>
              <p>{formatAmount(num)}</p>
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
          curDateText == calenderType.lastDate ? (
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
          console.log("onActiveStartDateChange", date, calenderType);
          const { activeStartDate } = date;
          setDate(activeStartDate);
          monthChange(activeStartDate);
          switch (calenderType.key) {
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
        view={calenderType.key}
      />
    </div>
  );
};

export default Calendar;
