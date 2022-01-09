const fs = require("fs");
class Contenedor {
  #fileName;

  constructor(fileName) {
    this.#fileName = fileName;
  }

  async getPreviousState() {
    try {
      let products = await fs.promises.readFile(this.#fileName, "utf-8");
      return products ? JSON.parse(products) : [];
    } catch (e) {
      console.log("Se ha producido un error", e);
    }
  }
  async getAll() {
    try {
      let products = await this.getPreviousState();
      return products ? products : [];
    } catch (e) {
      console.log("Se ha producido un error", e);
    }
  }
  async save(product) {
    try {
      let prevArray = await this.getPreviousState();
      let newProduct = { ...product, id: prevArray.length + 1 };
      prevArray.push(newProduct);
      const file = await fs.promises.writeFile(this.#fileName, JSON.stringify(prevArray), "utf-8");
    } catch (e) {
      console.log("Se ha producido un error", e);
    }
  }
  async getById(id) {
    try {
      let fileProducts = await this.getPreviousState();
      if (!fileProducts) {
        return null;
      }
      return fileProducts.find((product) => product.id == id) || null;
    } catch (e) {
      console.log("Se ha producido un error", e);
    }
  }
  async deleteById(id) {
    try {
      let products = await this.getPreviousState();
      if (!products) {
        return null;
      }
      let index = products.findIndex((product) => product.id == id);
      if (index > -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(this.#fileName, JSON.stringify(products), "utf-8");
      }
    } catch (e) {
      console.log("Se ha producido un error", e);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.#fileName, "", "utf-8");
    } catch (e) {
      console.log("Se ha producido un error", e);
    }
  }
}
module.exports = Contenedor;
