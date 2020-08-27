import React from "react";
import css from "./Fighter.module.css";

const Fighter = ({ hero }) => {
  const { name, id, imgURL } = hero;

  return (
    <div className={css.container}>
      {imgURL && name !== "logo" && (
        <div className={css.imgContainer}>
          <img
            src={imgURL}
            alt={name ? name : `hero ${id}`}
          />
        </div>
      )}
      {name && name !== "logo" && <span>{name}</span>}
    </div>
  );
};

export default Fighter;
