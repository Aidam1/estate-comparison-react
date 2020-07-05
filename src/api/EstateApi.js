export default class EstateApi {
  static baseUrl = "https://estate-comparison.codeboot.cz";

  static getAllEstates = async (setData, setIsLoading) => {
    try {
      //get only 10 estates:
      const response = await fetch(`${this.baseUrl}/list.php?limit=9`);
      if (!response.status) throw Error(response.statusText);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (e) {
      console.log("There was an error when trying to fetch the data.", e);
    }
  };

  static getEstateDetail = async (estateId, setData, setIsLoading) => {
    try {
      const response = await fetch(`${this.baseUrl}/detail.php?id=${estateId}`);
      if (!response.status) throw Error(response.statusText);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (e) {
      console.log("There was an error when trying to fetch the data.", e);
    }
  };
}
