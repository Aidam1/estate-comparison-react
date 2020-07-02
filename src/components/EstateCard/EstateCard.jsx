import React from "react";
import "./estatecard.scss";

const formatNumber = (input) => {
  return Number(input).toLocaleString("cs");
};

const EstateCard = (props) => {
  const { estateData, comparison, order, isLoading } = props;

  let cardContent = null;

  if (isLoading) {
    cardContent = <div className="estate-card-loader">Loading...</div>;
  } else {
    const priceFormatted = formatNumber(estateData.prize_czk);
    const buildingAreaFormatted = formatNumber(estateData.building_area);
    const landAreaFormatted = formatNumber(estateData.land_area);

    const {
      priceComparison,
      buildingAreaComparison,
      landAreaComparison,
    } = comparison;

    cardContent = (
      <div className="estate-card">
        <img src={estateData.images[0]} alt={estateData.name} />
        <div className="estate-card__table">
          <div className="estate-card__row">{estateData.name}</div>
          <div
            className={`estate-card__row ${
              priceComparison === order
                ? "estate-card__row--green"
                : "estate-card__row--red"
            }`}
          >
            <span className="estate-card__data estate-card__data--bold">
              Price
            </span>
            <span className="estate-card__data">{priceFormatted} Kč</span>
          </div>
          <div className="estate-card__row">
            <span className="estate-card__data estate-card__data--bold">
              Locality
            </span>
            <span className="estate-card__data">{estateData.locality}</span>
          </div>
          <div
            className={`estate-card__row ${
              buildingAreaComparison === order
                ? "estate-card__row--green"
                : "estate-card__row--red"
            }`}
          >
            <span className="estate-card__data estate-card__data--bold">
              Floor area
            </span>
            <span className="estate-card__data">
              {buildingAreaFormatted} m²
            </span>
          </div>
          <div
            className={`estate-card__row ${
              landAreaComparison === order
                ? "estate-card__row--green"
                : "estate-card__row--red"
            }`}
          >
            <span className="estate-card__data estate-card__data--bold">
              Land area
            </span>
            <span className="estate-card__data">{landAreaFormatted} m²</span>
          </div>
          <div className="estate-card__company">
            <img
              src={estateData.company_logo}
              alt={estateData.company_name}
              className="estate-card__company__logo"
            />
            <span className="estate-card__company__name">
              {estateData.company_name}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return cardContent;
};

export default EstateCard;
