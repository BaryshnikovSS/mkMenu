import React, { useState, useEffect } from "react";
import Context from "../../context/context";
import List from "../../components/list/List";
import Poster from "../../components/poster/Poster";
import getDragonList from "../../helpers/dragonListCreator";
import css from "./DescriptionPage.module.css";

// styles
const styles = {
  list: {
    container: css.listItemContainer,
    NVContainer: css.listItemNotVisibleContainer,
    active: css.listItemActive,
  },
  poster: {
    rightContainer: {
      right: 0,
      borderLeft: "2px solid #fff",
      transform: "skew(-15deg) translate(15%)",
      title: {
        right: "14%"
      }
    },
    leftContainer: {
      borderRight: "2px solid #fff",
      transform: "skew(-15deg) translate(-15%)",
      title: {
        right: "40%"
      }
    }

  }
};

// component
const DescriptionPage = ({ location: { state } }) => {
  const { hero } = state;
  const [icoList, setIcoList] = useState(getDragonList(6));
  console.log("hero", hero);

  const [activeIdx, setActiveIdx] = useState();

  useEffect(() => {
    const keysList = ["q", "w", "e", "r", "t", "y"];

    const keyDownHendler = (e) => {
      keysList.forEach((el, idx) => {
        if (el === e.key.toLowerCase()) {
          setIcoList(getDragonList(6, idx));
          setActiveIdx(idx);
        }
      });
    };

    window.addEventListener("keydown", keyDownHendler);

    return () => {
      window.removeEventListener("keydown", keyDownHendler);
    };
  }, []);

  function chooseHero(e) {
    const activeIdx = e.currentTarget.value;
    setIcoList(getDragonList(6, activeIdx));
    setActiveIdx(activeIdx);
  }

  return (
    <Context.Provider value={{ chooseHero, activeIdx, styles: styles.list }}>
      <section className={css.baseContainer}>
        <div className={css.container}>
          <h2 className={css.title}>
            Battle <br />
            <span>1</span>
          </h2>
          <img
            className={css.leftLogo}
            src={require("../../assets/images/mkLeftLogo.png")}
            alt="logo"
            width="100px"
            height="100px"
          />
          <img
            className={css.rightLogo}
            src={require("../../assets/images/mkRightLogo.png")}
            alt="logo"
            width="100px"
            height="100px"
          />
          <img
            className={css.vsImage}
            src={require("../../assets/images/description_vs.png")}
            alt="VS"
            width="100px"
            height="100px"
          />
          <List arrOfElem={icoList} />
          <Poster hero={hero} styles={styles.poster.leftContainer} />
          <Poster hero={hero} styles={styles.poster.rightContainer} />
        </div>
        {/* <div className="leftDoor"></div> */}
        {/* <div className="rightDoor"></div> */}
      </section>
    </Context.Provider>
  );
};

export default DescriptionPage;
