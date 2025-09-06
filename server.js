const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Pfad zu products.json
const PRODUCTS_FILE = path.join(__dirname, "data", "products.json");

// Debug-Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// GET - Alle Produkte abrufen
app.get("/api/products", (req, res) => {
  console.log("GET /api/products aufgerufen");

  try {
    // Initialisiere mit leerem Array falls nicht vorhanden
    if (!fs.existsSync(PRODUCTS_FILE)) {
      console.log("products.json existiert nicht, erstelle neue");
      fs.writeFileSync(PRODUCTS_FILE, "[]");
    }

    const fileContent = fs.readFileSync(PRODUCTS_FILE, "utf8");
    console.log("Datei gelesen, Länge:", fileContent.length);

    // Sende explizit JSON
    res.setHeader("Content-Type", "application/json");
    res.send(fileContent || "[]");
  } catch (error) {
    console.error("Fehler:", error);
    res.setHeader("Content-Type", "application/json");
    res.send("[]");
  }
});

// POST - Neues Produkt hinzufügen
app.post("/api/product", (req, res) => {
  console.log("POST /api/product aufgerufen");

  try {
    let products = [];

    if (fs.existsSync(PRODUCTS_FILE)) {
      products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
    }

    products.push(req.body);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

    console.log(`Produkt hinzugefügt. Total: ${products.length}`);

    res.json({
      success: true,
      totalProducts: products.length,
    });
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    res.status(500).json({ error: error.message });
  }
});

// Test-Route
app.get("/test", (req, res) => {
  res.send("Server funktioniert!");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
  console.log(`📁 Products-Datei: ${PRODUCTS_FILE}`);
});
