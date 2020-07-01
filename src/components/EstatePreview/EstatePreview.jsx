import React from "react";
import "./estatepreview.scss";

const EstatePreview = (props) => {
  const { estateData, handleSelect, firstSelectedId, secondSelectedId } = props;
  const markSelectedEstate = () => {
    let selectLetter = "";
    if (firstSelectedId === estateData.id) {
      selectLetter = "A";
    } else if (secondSelectedId === estateData.id) {
      selectLetter = "B";
    } else return null;

    return (
      <>
        <div className="estate-preview__select-border"></div>
        <div className="estate-preview__select-letter">{selectLetter}</div>
      </>
    );
  };

  return (
    <div
      key={estateData.id}
      className="estate-preview"
      onClick={() => handleSelect(estateData.id)}
    >
      <img
        src={estateData.images[0]}
        alt="test"
        className="estate-preview__img"
      />
      {markSelectedEstate()}
      <div className="estate-preview__description">
        {estateData.name_extracted} {estateData.locality}
      </div>
    </div>
  );
};

export default EstatePreview;
