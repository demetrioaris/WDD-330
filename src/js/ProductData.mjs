function convertToJson(res) {
  if (!res.ok) {
    throw new Error("Bad Response");
  }
  return res.json();
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      return convertToJson(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async findProductById(id) {
    try {
      const products = await this.getData();
      return products.find((item) => item.Id === id);
    } catch (error) {
      console.error(`Error finding product with id: ${id}`, error);
      return null;
    }
  }
}