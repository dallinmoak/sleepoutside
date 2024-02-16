function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.baseUrl = import.meta.env.VITE_SERVER_URL;
  }
  async getCategoryData() {
    if (this.category) {
      const res = await fetch(
        `${this.baseUrl}products/search/${this.category}`
      );
      const data = await convertToJson(res);
      return data.Result;
    } else return "No category provided";
  }
  async getProductData(id) {
    const res = await fetch(`${this.baseUrl}product/${id}`);
    const data = await convertToJson(res);
    return data.Result;
  }
}
