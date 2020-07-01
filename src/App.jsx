import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import EstateList from "./components/EstateList/EstateList.jsx";
import EstateComparison from "./components/EstateComparison/EstateComparison.jsx";
import { BASE_URL } from "./api/estateApi.js";

function App() {
  const [estatesData, setEstatesData] = useState([]);
  const [firstSelectedId, setFirstSelectedId] = useState(1701473884);
  const [secondSelectedId, setSecondSelectedId] = useState(2769235548);
  const [currentSelection, setCurrentSelection] = useState("A");
  const [isLoading, setIsLoading] = useState(false);

  const getEstatesData = async () => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/list.php`);
    const data = await response.json();
    setEstatesData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getEstatesData();
  }, []);

  /////JAK UDĚLAT ABYCH SE NEOPAKOVAL???
  const changeSelection = (estateId) => {
    if (currentSelection === "A") {
      if (firstSelectedId === estateId) {
        //setFirstSelectedId(null);
      } else if (!firstSelectedId && !secondSelectedId) {
        setFirstSelectedId(estateId);
        setCurrentSelection("B");
      } else if (!firstSelectedId && secondSelectedId) {
        setFirstSelectedId(estateId);
        setCurrentSelection("A");
      } else if (firstSelectedId) {
        if (secondSelectedId === estateId) {
          setSecondSelectedId(estateId);
          setCurrentSelection("B");
        } else {
          setFirstSelectedId(estateId);
          setCurrentSelection("A");
        }
      }
    } else if (currentSelection === "B") {
      if (secondSelectedId === estateId) {
        //setSecondSelectedId(null);
      } else if (!secondSelectedId && !firstSelectedId) {
        setSecondSelectedId(estateId);
        setCurrentSelection("A");
      } else if (!secondSelectedId && firstSelectedId) {
        setSecondSelectedId(estateId);
        setCurrentSelection("B");
      } else if (firstSelectedId) {
        if (firstSelectedId === estateId) {
          setFirstSelectedId(estateId);
          setCurrentSelection("A");
        } else {
          setSecondSelectedId(estateId);
          setCurrentSelection("B");
        }
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
