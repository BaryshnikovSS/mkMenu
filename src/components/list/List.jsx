import React from "react";
import ListItem from "./listItem/ListItem";
import css from "./List.module.css";

const List = ({ arrOfElem }) => (
  <ul className={css.container}>
    {arrOfElem.map((el, idx) => (
      <ListItem 
        key={el.id + idx} 
        elem={{...el, idx: idx}} />
    ))}
  </ul>
);

export default List;
