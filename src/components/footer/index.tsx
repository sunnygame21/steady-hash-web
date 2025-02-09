import React, { useEffect, useState } from "react";
import {
  PortfolioIcon,
  HomeIcon,
  LoadingIcon,
  ProfileIcon,
  HomeIconActive,
  PortfolioIconActive,
  ProfileIconActive,
} from "@/components/Icons";
import { classNames } from "@/utils/helper";
import styles from "./index.module.css";
import { useRouter, usePathname } from "next/navigation";
import { find } from "lodash";
const MenuList = [
  {
    link: "/",
    title: "Home",
    icon: <HomeIcon />,
    activeIcon: <HomeIconActive />,
  },
  {
    link: "/portfolio",
    title: "Portfolio",
    icon: <PortfolioIcon />,
    activeIcon: <PortfolioIconActive />,
  },
  {
    link: "/account",
    title: "Account",
    icon: <ProfileIcon />,
    activeIcon: <ProfileIconActive />,
  },
];

const Footer: React.FC<{}> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<string>(MenuList[0].link);

  useEffect(() => {
    const current = pathname;
    const targetMenu = find(MenuList, { link: current });
    setActive(targetMenu?.link || "");
  }, [pathname]);
  
  return (
    <div className={classNames(styles.footerWrap)}>
      <div className={styles.content}>
        {MenuList.map((menu) => {
          return (
            <div
              key={`footer-menu-${menu.link}`}
              className={classNames(
                styles.menuItem,
                active === menu?.link ? styles.active : ""
              )}
              onClick={() => router.push(menu.link)}
            >
              {active === menu?.link ? menu.activeIcon : menu.icon}
              <p>{menu.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
