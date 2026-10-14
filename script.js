
const loader = document.querySelector(".spinner");
const main = document.querySelector("#main");
const themeToggle = document.querySelector("#themeToggle");

function setTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);

    document.documentElement.style.colorScheme = isLight
        ? "light"
        : "dark";

    themeToggle.textContent = isLight
        ? "☾ Dark Mode"
        : "☀ Light Mode";

    localStorage.setItem("theme", isLight ? "light" : "dark");
}

const savedTheme = localStorage.getItem("theme");

setTheme(savedTheme === "light");

themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");
    setTheme(!isLight);
});

async function getData() {
    try {
        const response = await fetch("https://dummyjson.com/carts");

        if (!response.ok) {
            throw new Error("Unable to fetch products.");
        }

        const data = await response.json();
        const products = data.carts.flatMap(cart => cart.products);

        if (products.length === 0) {
            main.innerHTML = `
                <p class="message">No products found.</p>
            `;
            return;
        }

        main.innerHTML = products.map(product => `
            <div class="card text-center">
                <img
                    src="${product.thumbnail}"
                    class="card-img-top"
                    alt="${product.title}"
                    loading="lazy"
                >

                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">
                        $${Number(product.price).toFixed(2)}
                    </p>
                </div>
            </div>
        `).join("");

    } catch (error) {
        main.innerHTML = `
            <p class="message">
                Unable to load products. Please check your internet connection and try again.
            </p>
        `;

        console.error(error);
    } finally {
        loader.classList.add("hide");
    }
}

getData();
