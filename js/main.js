// Lade Produkte aus JSON
async function loadProducts() {
  try {
    const response = await fetch("data/products.json");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Fehler beim Laden der Produkte:", error);
  }
}

// Zeige Produkte an
function displayProducts(products) {
  const container = document.getElementById("products-container");

  products.forEach((product) => {
    const card = `
            <div class="product-card">
                <span class="trend-badge">🔥 Trend ${product.trendScore}/100</span>
                <h2>${product.headline}</h2>
                <p>${product.intro}</p>
                <div class="price">${product.price}€</div>
                <a href="${product.affiliateLink}" class="cta-button" target="_blank" rel="nofollow">
                    Jetzt ansehen →
                </a>
            </div>
        `;
    container.innerHTML += card;
  });
}

// Starte beim Laden der Seite
loadProducts();
