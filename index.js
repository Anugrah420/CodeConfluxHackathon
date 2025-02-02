async function fetchCoinData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = new URLSearchParams({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: false
    });

    try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();
        displayCoinInfo(data);
        setupSearch(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function displayCoinInfo(coins) {
    const container = document.getElementById('coins-container');
    container.innerHTML = '';

    coins.forEach(coin => {
        const coinElement = document.createElement('div');
        coinElement.className = 'coin';

        const icon = document.createElement('img');
        icon.src = coin.image;
        icon.alt = coin.name;

        const priceChangeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';

        const info = document.createElement('div');
        info.className = 'coin-info';
        info.innerHTML = `
            <strong>${coin.name} (${coin.symbol.toUpperCase()})</strong><br>
            Current Price: $${coin.current_price}
        `;

        const priceChange = document.createElement('div');
        priceChange.className = `price-change ${priceChangeClass}`;
        priceChange.innerHTML = `
            Price Change (24h): ${coin.price_change_percentage_24h}%
        `;

        coinElement.appendChild(icon);
        coinElement.appendChild(info);
        coinElement.appendChild(priceChange);
        container.appendChild(coinElement);
    });
}

function setupSearch(coins) {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredCoins = coins.filter(coin =>
            coin.name.toLowerCase().includes(query) ||
            coin.symbol.toLowerCase().includes(query)
        );
        displayCoinInfo(filteredCoins);
    });
}

function setupDarkMode() {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeBtn.textContent = '🌞 Dark Mode: On';
        } else {
            darkModeBtn.textContent = '🌙 Dark Mode: Off';
        }
    });
}

function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCoinData();
    setupDarkMode();
    setupBackToTop();
});