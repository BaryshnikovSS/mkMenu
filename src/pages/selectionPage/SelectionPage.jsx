import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/context";
import services from "../../services/api";
import List from "../../components/list/List";
import Fighter from "../../components/fighter/Fighter";
import css from "./SelectionPage.module.css";

// component
const SelectionPage = () => {
  let history = useHistory();

  const [isEnterDone, setIsEnterDone] = useState(false);

  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    services.fetchAllHeroes().then(data => setHeroes(data));
  }, []);

  const [styleActive, setStyleActive] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentActiveStyle =
        styleActive === css.listItemActiveHeroLightGreen
          ? css.listItemActiveHeroDarkGreen
          : css.listItemActiveHeroLightGreen;
      !isEnterDone && setStyleActive(currentActiveStyle);
    }, 100);
    return () => clearInterval(interval);
  }, [styleActive, isEnterDone]);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const keyDownHendler = (e) => {
      let gorizontIterableValue = 1;
      let verticalIterableValue = 7;

      switch (e.key) {
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          if (activeIdx - gorizontIterableValue >= 0) {
            while (!heroes[activeIdx - gorizontIterableValue].imgURL)
              gorizontIterableValue += 1;
            setActiveIdx(activeIdx - gorizontIterableValue);
          }

          break;

        case "Right": // IE/Edge specific value
        case "ArrowRight":
          if (activeIdx + gorizontIterableValue < heroes.length - 1) {
            while (!heroes[activeIdx + gorizontIterableValue].imgURL)
              gorizontIterableValue += 1;
            setActiveIdx(activeIdx + gorizontIterableValue);
          }

          break;

        case "Up": // IE/Edge specific value
        case "ArrowUp":
          if (activeIdx - verticalIterableValue >= 0) {
            while (!heroes[activeIdx - verticalIterableValue].imgURL)
              verticalIterableValue += 1;
            setActiveIdx(activeIdx - verticalIterableValue);
          }

          break;

        case "Down": // IE/Edge specific value
        case "ArrowDown":
          if (activeIdx + verticalIterableValue < heroes.length) {
            while (!heroes[activeIdx + verticalIterableValue].imgURL)
              verticalIterableValue += 1;
            heroes[activeIdx + verticalIterableValue] &&
              setActiveIdx(activeIdx + verticalIterableValue);
          }

          break;

        case "Enter":
          setIsEnterDone(true);
          setStyleActive(css.listItemActiveHeroLightGreen);
          setTimeout(() => {
            history.push({
              pathname: "/description",
              state: { hero: heroes[activeIdx] },
            });
          }, 570);
          break;

        default:
          return;
      }
    };

    window.addEventListener("keydown", keyDownHendler);

    return () => {
      window.removeEventListener("keydown", keyDownHendler);
    };
  }, [activeIdx, heroes, history]);

  function chooseHero(e) {
    let nextIdx = e.currentTarget.value;
    const emptyBoxIdx = [14, 20, 21, 27];
    emptyBoxIdx.every((el) => el !== nextIdx) && setActiveIdx(nextIdx);
  }

  const styles = {
    container: css.listItemContainer,
    NVContainer: css.listItemNotVisibleContainer,
    active: styleActive,
  };

  return (
    <Context.Provider value={{ chooseHero, activeIdx, styles }}>
      <section className={css.baseContainer}>
        <div className={css.container}>
          <h2 className={css.title}>Select your figther</h2>
          <div className={css.menuContainer}>
            {heroes.length > 0 && <List arrOfElem={heroes} />}
            {heroes[activeIdx] && <Fighter hero={{ ...heroes[activeIdx] }} />}
          </div>
        </div>
      </section>
    </Context.Provider>
  );
};

export default SelectionPage;
