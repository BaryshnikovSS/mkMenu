import transform from './transform';

const baseUrl = 'https://akabab.github.io/superhero-api/api/';

// SERVER REQUESTS
export default {
    fetchAllHero: function() {
        const result = fetch(`${baseUrl}all.json`)
            .then(response => response.json())
            .then(data => transform.forHeroCard(data))
            .catch(err => new Error(err));
        return result;
    }
};