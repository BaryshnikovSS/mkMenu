import React from "react";
import css from './Poster.module.css'

const Poster = ({ hero, styles }) => {
  console.log('hero', hero)
  const { imgURL, name } = hero;
  return (
    <div className={css.container} style={styles}>
      <img src={imgURL} alt="hero" />
      <h3 style={styles.title}>{name}</h3>
    </div>
  );
};

export default Poster;
