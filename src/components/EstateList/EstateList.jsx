import React from "react";

import "./estatelist.scss";
import EstatePreview from "../EstatePreview/EstatePreview";

const EstateList = (props) => {
  const {
    estatesData,
    handleSelect,
    firstSelectedId,
    secondSelectedId,
  } = props;

  return (
    <section className="estate-list">
      {estatesData.length > 0 &&
        estatesData.map((estateData) => (
          <EstatePreview
            handleSelect={handleSelect}
            key={estateData.id}
            estateData={estateData}
            firstSelectedId={firstSelectedId}
            secondSelectedId={secondSelectedId}
          />
        ))}
    </section>
  );
};

export default EstateList;
