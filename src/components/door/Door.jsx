import React from 'react';

const Door = ({ imgURL }) => (
    <div className={container}>
        <img src={require(imgURL)} alt="hero"/>
    </div>
);

export default Door;