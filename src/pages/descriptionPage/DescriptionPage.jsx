import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Context from "../../context/context";
import List from "../../components/list/List";
import Poster from "../../components/poster/Poster";
import getDragonList from "../../helpers/dragonListCreator";
import services from "../../services/api";
import css from "./DescriptionPage.module.css";
import "../../transitions/slideFromLeftTransition.css";
import "../../transitions/slideFromRightTransition.css";

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
        right: "14%",
      },
    },
    leftContainer: {
      borderRight: "2px solid #fff",
      transform: "skew(-15deg) translate(-15%)",
      title: {
        left: "34%",
      },
    },
  },
};

// component
const DescriptionPage = ({ location: { state } }) => {
  const { hero } = state;

  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push({
        pathname: "/"
      });
    }, 10000);
  })

  const [oppositeHero, setOppositeHero] = useState(null);

  useEffect(() => {
    services.fetchRandomHero().then(data => setOppositeHero(data));
  }, [])

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    hero && oppositeHero && setIsLoading(true);
  }, [hero, oppositeHero])

  const [icoList, setIcoList] = useState(getDragonList(6));

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
          <CSSTransition
            in={isLoading}
            timeout={1000}
            classNames="slideFromLeft"
            mountOnEnter
            unmountOnExit
          >
            <Poster hero={hero} styles={styles.poster.leftContainer} />
          </CSSTransition>
          <CSSTransition
            in={isLoading}
            timeout={1000}
            classNames="slideFromRight"
            mountOnEnter
            unmountOnExit
          >
            <Poster hero={oppositeHero} styles={styles.poster.rightContainer} />
          </CSSTransition>
        </div>
      </section>
    </Context.Provider>
  );
};

export default DescriptionPage;
