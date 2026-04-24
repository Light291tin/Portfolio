const POKEAPI_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

const TYPE_TRANSLATIONS = {
    normal: "Normal",
    fire: "Feu",
    water: "Eau",
    electric: "Electrik",
    grass: "Plante",
    ice: "Glace",
    fighting: "Combat",
    poison: "Poison",
    ground: "Sol",
    flying: "Vol",
    psychic: "Psy",
    bug: "Insecte",
    rock: "Roche",
    ghost: "Spectre",
    dragon: "Dragon",
    dark: "Tenebres",
    steel: "Acier",
    fairy: "Fee"
};

const TYPE_COLORS = {
    normal: "#a8a77a",
    fire: "#ff7a59",
    water: "#4da6ff",
    electric: "#ffd54a",
    grass: "#5ad28a",
    ice: "#7be7ff",
    fighting: "#d86767",
    poison: "#ba7df7",
    ground: "#d8b469",
    flying: "#9eb8ff",
    psychic: "#ff79a9",
    bug: "#9bcf39",
    rock: "#c7b277",
    ghost: "#7a6de8",
    dragon: "#6a8cff",
    dark: "#8b6f5a",
    steel: "#8ba3b8",
    fairy: "#ffb7e1"
};

const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search-input");
const typeFilter = document.getElementById("type-filter");
const resetFiltersButton = document.getElementById("reset-filters");
const resultsCount = document.getElementById("results-count");
const activeFilter = document.getElementById("active-filter");
const pokemonCount = document.getElementById("pokemon-count");

const detailEmpty = document.getElementById("detail-empty");
const detailCard = document.getElementById("detail-card");
const detailId = document.getElementById("detail-id");
const detailName = document.getElementById("detail-name");
const detailGenus = document.getElementById("detail-genus");
const detailImage = document.getElementById("detail-image");
const detailTypes = document.getElementById("detail-types");
const detailDescription = document.getElementById("detail-description");
const detailStats = document.getElementById("detail-stats");
const detailTotal = document.getElementById("detail-total");
const detailMatchups = document.getElementById("detail-matchups");
const detailEvolution = document.getElementById("detail-evolution");

const state = {
    pokemon: [],
    filteredPokemon: [],
    detailsCache: new Map(),
    activeId: null
};

function formatPokemonNumber(id) {
    return `#${String(id).padStart(3, "0")}`;
}

function formatName(name) {
    return name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function translateType(type) {
    return TYPE_TRANSLATIONS[type] || formatName(type);
}

function createTypeChip(type) {
    const chip = document.createElement("span");
    chip.className = "type-chip";
    chip.textContent = translateType(type);
    chip.style.background = `${TYPE_COLORS[type] || "#6c7a89"}22`;
    chip.style.borderColor = `${TYPE_COLORS[type] || "#6c7a89"}55`;
    chip.style.color = TYPE_COLORS[type] || "#f3f7ff";
    return chip;
}

function getStatValue(stats, statName) {
    const stat = stats.find((entry) => entry.stat.name === statName);
    return stat ? stat.base_stat : 0;
}

function buildSummaryPokemon(detail) {
    return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.other["official-artwork"].front_default || detail.sprites.front_default,
        types: detail.types.map((entry) => entry.type.name),
        stats: {
            hp: getStatValue(detail.stats, "hp"),
            attack: getStatValue(detail.stats, "attack"),
            defense: getStatValue(detail.stats, "defense"),
            specialAttack: getStatValue(detail.stats, "special-attack"),
            specialDefense: getStatValue(detail.stats, "special-defense"),
            speed: getStatValue(detail.stats, "speed")
        },
        speciesUrl: detail.species.url
    };
}

function getTotalStats(stats) {
    return Object.values(stats).reduce((total, value) => total + value, 0);
}

function renderLoadingState() {
    pokedex.innerHTML = '<div class="loading">Connexion a PokeAPI et synchronisation du catalogue...</div>';
}

function renderErrorState() {
    pokedex.innerHTML = '<div class="error-state">Impossible de charger les donnees depuis PokeAPI. Verifie la connexion reseau puis recharge la page.</div>';
    resultsCount.textContent = "Chargement indisponible";
}

function renderEmptyState() {
    pokedex.innerHTML = '<div class="empty-state">Aucun Pokemon ne correspond a la recherche ou au filtre en cours.</div>';
}

function updateResultsMeta() {
    resultsCount.textContent = `${state.filteredPokemon.length} Pokemon affiches sur ${state.pokemon.length}`;

    const selectedType = typeFilter.value;
    const activeLabel = selectedType === "all"
        ? "Tous"
        : translateType(selectedType);

    if (activeFilter) {
        activeFilter.textContent = activeLabel;
    }
}

function setActiveCard(activeId) {
    document.querySelectorAll(".pokemon-card").forEach((card) => {
        card.classList.toggle("is-active", Number(card.dataset.id) === activeId);
    });
}

function renderPokemonList() {
    pokedex.innerHTML = "";

    if (!state.filteredPokemon.length) {
        renderEmptyState();
        updateResultsMeta();
        return;
    }

    const fragment = document.createDocumentFragment();

    state.filteredPokemon.forEach((pokemon, index) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "pokemon-card reveal";
        card.dataset.id = String(pokemon.id);
        card.style.animationDelay = `${Math.min(index * 0.03, 0.45)}s`;

        const accent = TYPE_COLORS[pokemon.types[0]] || "#8cffd6";
        card.style.background = `linear-gradient(160deg, ${accent}24, rgba(255, 255, 255, 0.04))`;

        const totalStats = getTotalStats(pokemon.stats);

        const top = document.createElement("div");
        top.className = "card-top";

        const number = document.createElement("p");
        number.className = "card-number";
        number.textContent = formatPokemonNumber(pokemon.id);

        const score = document.createElement("span");
        score.className = "card-score";
        score.textContent = `${totalStats} pts`;

        top.append(number, score);

        const name = document.createElement("h2");
        name.className = "card-name";
        name.textContent = formatName(pokemon.name);

        const image = document.createElement("img");
        image.className = "card-image";
        image.src = pokemon.image;
        image.alt = formatName(pokemon.name);
        image.loading = "lazy";

        const bottom = document.createElement("div");
        bottom.className = "card-bottom";

        const typeList = document.createElement("div");
        typeList.className = "card-types";
        pokemon.types.forEach((type) => typeList.appendChild(createTypeChip(type)));

        bottom.appendChild(typeList);

        card.append(top, name, image, bottom);
        card.addEventListener("click", () => showPokemonDetails(pokemon.id));
        fragment.appendChild(card);
    });

    pokedex.appendChild(fragment);
    updateResultsMeta();
    setActiveCard(state.activeId);
}

function populateTypeFilter() {
    const allTypes = [...new Set(state.pokemon.flatMap((pokemon) => pokemon.types))].sort();

    allTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = translateType(type);
        typeFilter.appendChild(option);
    });
}

function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;

    state.filteredPokemon = state.pokemon.filter((pokemon) => {
        const matchesQuery = !query
            || pokemon.name.includes(query)
            || String(pokemon.id).includes(query)
            || formatName(pokemon.name).toLowerCase().includes(query);

        const matchesType = selectedType === "all" || pokemon.types.includes(selectedType);

        return matchesQuery && matchesType;
    });

    renderPokemonList();
}

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
    }

    return response.json();
}

function sanitizeFlavorText(text) {
    return text.replace(/\f|\n/g, " ").replace(/\s+/g, " ").trim();
}

function extractFrenchFlavorText(species) {
    const frenchEntry = species.flavor_text_entries.find((entry) => entry.language.name === "fr");
    const fallbackEntry = species.flavor_text_entries.find((entry) => entry.language.name === "en");
    return sanitizeFlavorText((frenchEntry || fallbackEntry || { flavor_text: "Description indisponible." }).flavor_text);
}

function extractGenus(species) {
    const frenchGenus = species.genera.find((entry) => entry.language.name === "fr");
    const fallbackGenus = species.genera.find((entry) => entry.language.name === "en");
    return frenchGenus?.genus || fallbackGenus?.genus || "Pokemon";
}

function parseEvolutionChain(chain) {
    const evolutions = [];

    function walk(node) {
        if (!node) {
            return;
        }

        evolutions.push(formatName(node.species.name));
        node.evolves_to.forEach(walk);
    }

    walk(chain.chain);

    return [...new Set(evolutions)];
}

async function fetchPokemonDetails(summaryPokemon) {
    if (state.detailsCache.has(summaryPokemon.id)) {
        return state.detailsCache.get(summaryPokemon.id);
    }

    const species = await fetchJson(summaryPokemon.speciesUrl);
    const evolutionChain = await fetchJson(species.evolution_chain.url);

    const detailData = {
        ...summaryPokemon,
        description: extractFrenchFlavorText(species),
        genus: extractGenus(species),
        evolution: parseEvolutionChain(evolutionChain)
    };

    state.detailsCache.set(summaryPokemon.id, detailData);
    return detailData;
}

function calculateTypeMatchups(types) {
    const chart = {};

    types.forEach((typeName) => {
        const defenseRelations = TYPE_RELATIONS[typeName];
        if (!defenseRelations) {
            return;
        }

        Object.entries(defenseRelations).forEach(([attackingType, multiplier]) => {
            chart[attackingType] = (chart[attackingType] ?? 1) * multiplier;
        });
    });

    return Object.entries(chart)
        .filter(([, multiplier]) => multiplier !== 1)
        .sort((a, b) => b[1] - a[1]);
}

function renderStats(stats) {
    detailStats.innerHTML = "";

    const statLabels = [
        ["hp", "HP"],
        ["attack", "Attaque"],
        ["defense", "Defense"],
        ["specialAttack", "Atk Spe"],
        ["specialDefense", "Def Spe"],
        ["speed", "Vitesse"]
    ];

    statLabels.forEach(([key, label]) => {
        const value = stats[key];
        const row = document.createElement("div");
        row.className = "stat-row";

        const name = document.createElement("span");
        name.className = "stat-name";
        name.textContent = label;

        const track = document.createElement("div");
        track.className = "stat-track";

        const fill = document.createElement("div");
        fill.className = "stat-fill";
        fill.style.width = `${Math.min((value / 180) * 100, 100)}%`;
        track.appendChild(fill);

        const number = document.createElement("span");
        number.className = "stat-number";
        number.textContent = String(value);

        row.append(name, track, number);
        detailStats.appendChild(row);
    });

    detailTotal.textContent = `${getTotalStats(stats)} points cumules`;
}

function renderMatchups(types) {
    detailMatchups.innerHTML = "";

    const matchups = calculateTypeMatchups(types);

    if (!matchups.length) {
        detailMatchups.innerHTML = '<span class="matchup-chip">Aucune variation notable</span>';
        return;
    }

    matchups.forEach(([type, multiplier]) => {
        const chip = document.createElement("span");
        chip.className = "matchup-chip";
        chip.style.borderColor = `${TYPE_COLORS[type] || "#8cffd6"}55`;

        const label = document.createElement("span");
        label.textContent = translateType(type);

        const value = document.createElement("span");
        value.className = "matchup-value";
        value.textContent = multiplier > 1 ? `x${multiplier}` : `${multiplier}x`;
        value.style.color = multiplier > 1 ? "#ff8a5b" : "#8cffd6";

        chip.append(label, value);
        detailMatchups.appendChild(chip);
    });
}

function renderEvolution(evolutionNames) {
    detailEvolution.innerHTML = "";

    evolutionNames.forEach((name) => {
        const chip = document.createElement("span");
        chip.className = "evolution-chip";
        chip.textContent = name;
        detailEvolution.appendChild(chip);
    });
}

async function showPokemonDetails(pokemonId) {
    const summaryPokemon = state.pokemon.find((pokemon) => pokemon.id === pokemonId);
    if (!summaryPokemon) {
        return;
    }

    state.activeId = pokemonId;
    setActiveCard(pokemonId);

    detailEmpty.classList.add("hidden");
    detailCard.classList.remove("hidden");
    detailDescription.textContent = "Chargement de la fiche detaillee...";
    detailName.textContent = formatName(summaryPokemon.name);
    detailId.textContent = formatPokemonNumber(summaryPokemon.id);
    detailGenus.textContent = "Synchronisation des donnees biologiques";
    detailImage.src = summaryPokemon.image;
    detailImage.alt = formatName(summaryPokemon.name);
    detailTypes.innerHTML = "";
    summaryPokemon.types.forEach((type) => detailTypes.appendChild(createTypeChip(type)));
    renderStats(summaryPokemon.stats);
    renderMatchups(summaryPokemon.types);
    detailEvolution.innerHTML = '<span class="evolution-chip">Chargement...</span>';

    try {
        const fullDetails = await fetchPokemonDetails(summaryPokemon);

        if (state.activeId !== pokemonId) {
            return;
        }

        detailDescription.textContent = fullDetails.description;
        detailGenus.textContent = fullDetails.genus;
        renderEvolution(fullDetails.evolution);
    } catch (error) {
        console.error(error);

        if (state.activeId !== pokemonId) {
            return;
        }

        detailDescription.textContent = "Impossible de charger les informations complementaires pour ce Pokemon.";
        detailGenus.textContent = "Donnees secondaires indisponibles";
        detailEvolution.innerHTML = '<span class="evolution-chip">Evolution indisponible</span>';
    }
}

async function loadPokedex() {
    renderLoadingState();

    try {
        const listData = await fetchJson(POKEAPI_LIST_URL);
        const detailPromises = listData.results.map((pokemon) => fetchJson(pokemon.url));
        const details = await Promise.all(detailPromises);

        state.pokemon = details
            .map(buildSummaryPokemon)
            .sort((a, b) => a.id - b.id);

        state.filteredPokemon = [...state.pokemon];
        if (pokemonCount) {
            pokemonCount.textContent = String(state.pokemon.length);
        }
        populateTypeFilter();
        renderPokemonList();

        const firstPokemon = state.pokemon[0];
        if (firstPokemon) {
            await showPokemonDetails(firstPokemon.id);
        }
    } catch (error) {
        console.error(error);
        renderErrorState();
    }
}

searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);

resetFiltersButton.addEventListener("click", () => {
    searchInput.value = "";
    typeFilter.value = "all";
    applyFilters();
});

const TYPE_RELATIONS = {
    normal: { fighting: 2, ghost: 0 },
    fire: { fire: 0.5, water: 2, grass: 0.5, ice: 0.5, ground: 2, bug: 0.5, rock: 2, steel: 0.5, fairy: 0.5 },
    water: { fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, steel: 0.5 },
    electric: { electric: 0.5, ground: 2, flying: 0.5, steel: 0.5 },
    grass: { fire: 2, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, poison: 2, ground: 0.5, flying: 2, bug: 2 },
    ice: { fire: 2, ice: 0.5, fighting: 2, rock: 2, steel: 2 },
    fighting: { flying: 2, psychic: 2, bug: 0.5, rock: 0.5, dark: 0.5, fairy: 2 },
    poison: { grass: 0.5, fighting: 0.5, poison: 0.5, ground: 2, psychic: 2, bug: 0.5, fairy: 0.5 },
    ground: { water: 2, electric: 0, grass: 2, ice: 2, poison: 0.5, rock: 0.5 },
    flying: { electric: 2, grass: 0.5, fighting: 0.5, ground: 0, bug: 0.5, rock: 2 },
    psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2 },
    bug: { fire: 2, grass: 0.5, fighting: 0.5, ground: 0.5, flying: 2, rock: 2 },
    rock: { normal: 0.5, fire: 0.5, water: 2, grass: 2, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, steel: 2 },
    ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
    dragon: { fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, dragon: 2, fairy: 2 },
    dark: { fighting: 2, psychic: 0, bug: 2, ghost: 0.5, dark: 0.5, fairy: 2 },
    steel: { normal: 0.5, fire: 2, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5 },
    fairy: { fighting: 0.5, poison: 2, bug: 0.5, dragon: 0, dark: 0.5, steel: 2 }
};

loadPokedex();