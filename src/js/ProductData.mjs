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
  async getData() {
    const res = await fetch(`${this.baseUrl}products/search/${this.category}`);
    const data = await convertToJson(res);
    return data;
  }
  async findProductById(id) {
    const data = await this.getData();
    const products = data.Result;
    return products.find((item) => item.Id === id);
  }
}
