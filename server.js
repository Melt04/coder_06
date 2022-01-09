const PORT = "8080";
const Contenedor = require("./Contenedor/contenedor.js");
const productFile = new Contenedor("./products.json");

const express = require("express");
const app = express();

app.get("/products", async (_, res) => {
  try {
    const allProducts = await productFile.getAll();
    res.status(200).json(allProducts);
  } catch {
    res.status(500).json({ error: "Falla servidor" });
  }
});
app.get("/productRandom", async (_, res) => {
  try {
    const allProduct = await productFile.getAll();
    const randomNumber = Math.round(Math.random() * (allProduct.length - 1));
    const product = allProduct[randomNumber];
    res.status(200).json(product);
  } catch {
    res.status(500).json({ error: "Falla servidor" });
  }
});

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
