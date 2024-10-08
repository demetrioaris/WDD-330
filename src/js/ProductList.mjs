// productList.js

import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  // Method to initialize the product list and filter products
  async init() {
    const list = await this.dataSource.getData();
    // Filter the list to only show four tents
    const filteredList = this.filterProducts(list, 4);
    // Render the filtered list
    this.renderList(filteredList);
  }

  // Method to filter the product list to show only the first 'count' products
  filterProducts(list, count) {
    // Filter products by category and return only the first 'count' products
    return list
      .filter((product) => product.Category === this.category)
      .slice(0, count);
  }

  // Method to render the product list to the DOM
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
