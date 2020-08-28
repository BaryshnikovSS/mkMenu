import React, { useContext } from "react";
import Context from "../../../context/context";

const ListItem = ({ elem }) => {
  const { name, id, imgURL, idx, } = elem;
  // context
  const { chooseHero, activeIdx, styles } = useContext(Context);

  return (
    <li 
      className={`
        ${imgURL ? styles.container : styles.NVContainer} 
        ${idx === activeIdx && idx !== 10 && styles.active}
      `} 
      onClick={chooseHero} 
      value={idx}
    >
      {imgURL && <img src={imgURL} alt={name ? name : `hero ${id}`} width="100px" height="100px" />}
      {idx !== 10 && idx === activeIdx && <span>1</span>}
    </li>
  );
};

export default ListItem;