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
  const renderEstateList = () => {
    //JE LEPŠÍ FOR LOOP (KVŮLI BREAK KDYŽ MÁM 120+ OBJEKTŮ V JSONU) NEBO RADŠI MODERNÍ JS (FOREACH / MAP)???
    let list = [];
    for (let i = 0; i < estatesData.length; i++) {
      if (i < 10) {
        let estate = (
          <EstatePreview
            handleSelect={handleSelect}
            key={estatesData[i].id}
            estateData={estatesData[i]}
            firstSelectedId={firstSelectedId}
            secondSelectedId={secondSelectedId}
          />
        );
        list.push(estate);
      } else {
        break;
      }
    }
    return list;
  };

  return (
    <section className="estate-list">
      {estatesData.length > 0 && renderEstateList()}
    </section>
  );
};

export default EstateList;
