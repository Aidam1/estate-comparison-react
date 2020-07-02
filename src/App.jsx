import React, { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header.jsx";
import EstateList from "./components/EstateList/EstateList.jsx";
import EstateComparison from "./components/EstateComparison/EstateComparison.jsx";
import EstateApi from "./api/EstateApi.js";

function App() {
  const [estatesData, setEstatesData] = useState([]);
  const [firstSelectedId, setFirstSelectedId] = useState(1701473884);
  const [secondSelectedId, setSecondSelectedId] = useState(2769235548);
  const [currentSelection, setCurrentSelection] = useState("A");
  const [isLoading, setIsLoading] = useState(false);

  const getEstatesData = async () => {
    setIsLoading(true);
    EstateApi.getAllEstates(setEstatesData, setIsLoading);
  };

  useEffect(() => {
    getEstatesData();
  }, []);

  const changeSelection = (estateId) => {
    if (currentSelection === "A") {
      if (secondSelectedId === estateId) {
        setSecondSelectedId(estateId);
        setCurrentSelection("B");
      } else {
        setFirstSelectedId(estateId);
        setCurrentSelection("A");
      }
    } else if (currentSelection === "B") {
      if (firstSelectedId === estateId) {
        setFirstSelectedId(estateId);
        setCurrentSelection("A");
      } else {
        setSecondSelectedId(estateId);
        setCurrentSelection("B");
      }
    }
  };

  const handleSelect = (estateId) => {
    changeSelection(estateId);
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="list-loader">Loading estates...</div>
      ) : (
        <EstateList
          firstSelectedId={firstSelectedId}
          secondSelectedId={secondSelectedId}
          estatesData={estatesData}
          handleSelect={handleSelect}
        />
      )}
      <EstateComparison
        firstSelectedId={firstSelectedId}
        secondSelectedId={secondSelectedId}
      />
    </div>
  );
}

export default App;
