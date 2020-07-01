import React, { useState, useEffect } from "react";
import "./estatecomparison.scss";
import EstateCard from "../EstateCard/EstateCard";
import { BASE_URL } from "../../api/estateApi.js";

const compareData = (first, second) => {
  return Number(first) >= Number(second) ? "first" : "second";
};

const EstateComparison = ({ firstSelectedId, secondSelectedId }) => {
  const [firstEstateData, setFirstEstateData] = useState(null);
  const [secondEstateData, setSecondEstateData] = useState(null);

  const getEstateData = async (estateId, setDataToState) => {
    const response = await fetch(`${BASE_URL}/detail.php?id=${estateId}`);
    const data = await response.json();
    setDataToState(data);
  };

  useEffect(() => {
    firstSelectedId && getEstateData(firstSelectedId, setFirstEstateData);
  }, [firstSelectedId]);

  useEffect(() => {
    secondSelectedId && getEstateData(secondSelectedId, setSecondEstateData);
  }, [secondSelectedId]);

  ///NĚJAK ZABALIT DO FUNKCE???

  const priceComparison = compareData(
    firstEstateData?.prize_czk,
    secondEstateData?.prize_czk
  );

  const buildingAreaComparison = compareData(
    firstEstateData?.building_area,
    secondEstateData?.building_area
  );

  const landAreaComparison = compareData(
    firstEstateData?.land_area,
    secondEstateData?.land_area
  );

  /// MÁ SMYSL TO DÁVAT DO OBJEKTU ABYCH TO POSLAL PŘES PROPS, NEBO JE HEZČÍ TO VYPSAT ROVNOU?
  const comparison = {
    priceComparison,
    buildingAreaComparison,
    landAreaComparison,
  };

  return (
    <section className="estate-comparison">
      {
        <EstateCard
          estateData={firstEstateData}
          comparison={comparison}
          order={"first"}
        />
      }
      {
        <EstateCard
          estateData={secondEstateData}
          comparison={comparison}
          order={"second"}
        />
      }
    </section>
  );
};

export default EstateComparison;
