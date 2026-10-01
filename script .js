
const products = [
  {
    name: "Air Max 270",
    brand: "Nike",
    category: "Sports",
    gender: "Men",
    price: 7999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    name: "Superstar Classic",
    brand: "Adidas",
    category: "Casual",
    gender: "Men",
    price: 5999,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600"
  },
  {
    name: "RS-X Sneakers",
    brand: "Puma",
    category: "Sports",
    gender: "Men",
    price: 6999,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600"
  },
  {
    name: "Classic Leather",
    brand: "Reebok",
    category: "Casual",
    gender: "Men",
    price: 4999,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=600"
  },
  {
    name: "Gel Running",
    brand: "ASICS",
    category: "Running",
    gender: "Men",
    price: 8999,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"
  },
  {
    name: "Go Walk",
    brand: "Skechers",
    category: "Casual",
    gender: "Women",
    price: 4499,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600"
  },
  {
    name: "574 Classic",
    brand: "New Balance",
    category: "Casual",
    gender: "Men",
    price: 7999,
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=600"
  },
  {
    name: "Old Skool",
    brand: "Vans",
    category: "Casual",
    gender: "Men",
    price: 5499,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600"
  },
  {
    name: "Air Force Style",
    brand: "Nike",
    category: "Casual",
    gender: "Women",
    price: 7999,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600"
  },
  {
    name: "Running Pro",
    brand: "Adidas",
    category: "Running",
    gender: "Men",
    price: 6499,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600"
  },
  {
    name: "Street Style",
    brand: "Puma",
    category: "Casual",
    gender: "Women",
    price: 3999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"
  },
  {
    name: "Sport Flex",
    brand: "ASICS",
    category: "Sports",
    gender: "Women",
    price: 5999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  }
];

let favourites = [];

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const category = document.getElementById("categoryFilter");
const brand = document.getElementById("brandFilter");
const sort = document.getElementById("sortFilter");

function showProducts() {
  let list = [...products];

  const query = search.value.toLowerCase();

  list = list.filter(product =>
    `${product.name} ${product.brand} ${product.category} ${product.gender}`
      .toLowerCase().includes(query)
  );

  if (category.value !== "All") {
    list = list.filter(p =>
      p.category === category.value || p.gender === category.value
    );
  }

  if (brand.value !== "All") {
    list = list.filter(p => p.brand === brand.value);
  }

  if (sort.value === "low") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort.value === "high") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort.value === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  document.getElementById("resultCount").textContent =
    `Showing ${list.length} shoes`;

  document.getElementById("noResults").hidden = list.length !== 0;

  grid.innerHTML = list.map((p, index) => {
    const originalIndex = products.indexOf(p);
    const isFav = favourites.includes(originalIndex);

    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${p.image}" alt="${p.brand} ${p.name}" loading="lazy"
               onerror="this.src='https://placehold.co/500x350?text=Shoe'">

          <button class="fav-btn ${isFav ? "active" : ""}"
                  data-fav="${originalIndex}"
                  aria-label="Add to favourites">
            ${isFav ? "♥" : "♡"}
          </button>
        </div>

        <div class="product-info">
          <span class="product-brand">${p.brand}</span>
          <h3>${p.name}</h3>
          <p>${p.category} Shoes · ${p.gender}</p>

          <div class="product-bottom">
            <span class="price">₹${p.price.toLocaleString("en-IN")}</span>
            <span class="category-label">${p.gender}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

search.addEventListener("input", showProducts);
category.addEventListener("change", showProducts);
brand.addEventListener("change", showProducts);
sort.addEventListener("change", showProducts);

// Favourite buttons
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-fav]");
  if (!button) return;

  const id = Number(button.dataset.fav);

  if (favourites.includes(id)) {
    favourites = favourites.filter(item => item !== id);
  } else {
    favourites.push(id);
  }

  document.getElementById("favCount").textContent = favourites.length;
  showProducts();
});

// Category cards
document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    category.value = button.dataset.category;
    brand.value = "All";
    showProducts();
    document.getElementById("shop").scrollIntoView();
  });
});

// Brand buttons
document.querySelectorAll("[data-brand]").forEach(button => {
  button.addEventListener("click", () => {
    brand.value = button.dataset.brand;
    category.value = "All";
    showProducts();
    document.getElementById("shop").scrollIntoView();
  });
});

// Mobile menu
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open");
  });
});

// YOUR WHATSAPP NUMBER
// Replace with your country code + number, without + or spaces.
const whatsappNumber = "918655741848";

document.getElementById("whatsappBtn").href =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Ansh, I visited your shoe collection website."
  )}`;

showProducts();
