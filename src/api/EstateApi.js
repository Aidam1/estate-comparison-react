export default class EstateApi {
  static baseUrl = "https://estate-comparison.codeboot.cz";

  static getAllEstates = async (setData, setIsLoading) => {
    //get only 10 estates:
    const response = await fetch(`${this.baseUrl}/list.php?limit=9`);
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  static getEstateDetail = async (estateId, setData, setIsLoading) => {
    const response = await fetch(`${this.baseUrl}/detail.php?id=${estateId}`);
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };
}
