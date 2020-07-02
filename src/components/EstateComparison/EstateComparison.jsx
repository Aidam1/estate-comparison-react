import React, { useState, useEffect } from "react";
import "./estatecomparison.scss";
import EstateCard from "../EstateCard/EstateCard";
import EstateApi from "../../api/EstateApi.js";

const compareData = (first, second) => {
  return Number(first) >= Number(second) ? "first" : "second";
};

const EstateComparison = ({ firstSelectedId, secondSelectedId }) => {
  const [firstEstateData, setFirstEstateData] = useState(null);
  const [secondEstateData, setSecondEstateData] = useState(null);
  const [isLoadingFirst, setIsLoadingFirst] = useState(true);
  const [isLoadingSecond, setIsLoadingSecond] = useState(true);
  const [comparison, setComparison] = useState({});

  useEffect(() => {
    setIsLoadingFirst(true);
    EstateApi.getEstateDetail(
      firstSelectedId,
      setFirstEstateData,
      setIsLoadingFirst
    );
  }, [firstSelectedId]);

  useEffect(() => {
    setIsLoadingSecond(true);
    EstateApi.getEstateDetail(
      secondSelectedId,
      setSecondEstateData,
      setIsLoadingSecond
    );
  }, [secondSelectedId]);

  useEffect(() => {
    if (firstEstateData && secondEstateData) {
      const priceComparison = compareData(
        firstEstateData.prize_czk,
        secondEstateData.prize_czk
      );

      const buildingAreaComparison = compareData(
        firstEstateData.building_area,
        secondEstateData.building_area
      );

      const landAreaComparison = compareData(
        firstEstateData.land_area,
        secondEstateData.land_area
      );
      setComparison({
        priceComparison,
        buildingAreaComparison,
        landAreaComparison,
      });
    }
  }, [firstEstateData, secondEstateData]);

  return (
    <section className="estate-comparison">
      <EstateCard
        estateData={firstEstateData}
        comparison={comparison}
        isLoading={isLoadingFirst}
        order={"first"}
      />
      <EstateCard
        estateData={secondEstateData}
        comparison={comparison}
        isLoading={isLoadingSecond}
        order={"second"}
      />
    </section>
  );
};

export default EstateComparison;
