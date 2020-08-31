import transform from './transform';

const baseUrl = 'https://akabab.github.io/superhero-api/api/';

// SERVER REQUESTS
export default {
    fetchAllHeroes: function () {
        const result = fetch(`${baseUrl}all.json`)
            .then(response => response.json())
            .then(data => transform.forHeroCard(data))
            .catch(_ => transform.forEmptyHeroCard())
        return result;
    },

    fetchRandomHero: function () {
        return fetch(`${baseUrl}all.json`)
        .then(response => response.json())
        .then(data => transform.forHeroCard(data, 1)[0])
        .catch(_ => transform.forEmptyHeroCard())
    }
};