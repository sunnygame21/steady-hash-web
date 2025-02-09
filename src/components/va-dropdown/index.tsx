"use client";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "antd";
import { ArrowIcon, BackIcon } from "@/components/Icons";
import { GlobalContext } from "@/app/state/global";
import { classNames } from "@/utils/helper";

import styles from "./index.module.css";


const users = ["Jillian", "Jasmin", "Beatty"];

const VADropDown = ({ curUser, seCurUser, className, text, overlayClassName,  }: any) => {
  const { productProfitData, setProductProfitData, productsList, setPage } =
    useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const changeUser = (name: string) => {
    setOpen(false);
    seCurUser(name);
  };
  return (
    <Dropdown
      key={"holding"}
      trigger={["click"]}
      className={classNames(styles.dropdown, className)}
      overlayClassName={overlayClassName}
      placement="bottomRight"
      open={open}
      dropdownRender={() => {
        return (
          <div className={styles.userList}>
            {users.map((item) => {
              return (
                <div
                  className={styles.userItem}
                  onClick={() => changeUser(item)}
                  key={item}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      }}
    >
      <div className={styles.label} onClick={() => setOpen(!open)}>
        {text || 'VA Holdings'} <ArrowIcon className={styles.colIcon} />
      </div>
    </Dropdown>
  );
};

export default VADropDown;
