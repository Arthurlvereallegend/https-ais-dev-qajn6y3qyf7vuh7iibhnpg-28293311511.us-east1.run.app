import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const app = express();
const PORT = 3000;
const db = new Database("sukarnoppos.db");

// Inicializar base de datos
db.exec(`
  CREATE TABLE IF NOT EXISTS surveys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    frequency TEXT,
    favorite_product TEXT,
    average_spend TEXT,
    pickup_interest INTEGER,
    delivery_interest INTEGER,
    switch_reason TEXT,
    promo_consent TEXT,
    segment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(express.json());

// API: Guardar encuesta
app.post("/api/survey", (req, res) => {
  const { customer } = req.body;
  
  // Lógica de segmentación simple
  let segment = "medium";
  if (customer.averageSpend === "over800") segment = "high";
  if (customer.averageSpend === "under200") segment = "low";

  const stmt = db.prepare(`
    INSERT INTO surveys (
      name, phone, frequency, favorite_product, average_spend, 
      pickup_interest, delivery_interest, switch_reason, promo_consent, segment
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    stmt.run(
      customer.name,
      customer.phone,
      customer.frequency,
      customer.favoriteProduct,
      customer.averageSpend,
      customer.pickupInterest ? 1 : 0,
      customer.deliveryInterest ? 1 : 0,
      customer.switchReason,
      customer.promoConsent,
      segment
    );
    res.json({ success: true, segment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar los datos" });
  }
});

// API: Estadísticas rápidas para el patrón
app.get("/api/stats", (req, res) => {
  const total = db.prepare("SELECT COUNT(*) as count FROM surveys").get();
  const segments = db.prepare("SELECT segment, COUNT(*) as count FROM surveys GROUP BY segment").all();
  res.json({ total: total.count, segments });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SuKarNeppo'S Server running on http://localhost:${PORT}`);
  });
}

startServer();
