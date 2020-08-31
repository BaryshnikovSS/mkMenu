import shortId from 'shortid';
import getRandomInRange from '../helpers/randomNumberGenerator'

const refs = {
    localLogoImg: {
        id: shortId.generate(),
        imgURL: require('../assets/images/mortalKombatLogo.png'),
        name: 'logo'
    },
    emptyHeroImgs: [
        'https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/md/no-portrait.jpg',
        'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/no-portrait.jpg'
    ],
    emptyImgIdx: [14, 20, 21, 27]
}

export default {
    forHeroCard: function (heroes = [], count = 28) {
        const currentHeroes = this.filterItems(heroes, count);

        return currentHeroes.map((hero, idx) => (idx === 10 ? refs.localLogoImg : {
            id: `${shortId.generate()}_${hero.id}`,
            imgURL: refs.emptyImgIdx.some(el => el === idx) ? '' : hero.images.md,
            name: refs.emptyImgIdx.some(el => el === idx) ? 'empty' : hero.name
        }));
    },

    filterItems: function (items = [], count) {

        const acc = [];

        if (items.length !== 0) {
            while (acc.length < count) {
                const nextIdx = getRandomInRange(0, items.length - 1);

                acc.every(el => el.id !== items[nextIdx].id) &&
                    refs.emptyHeroImgs.every(el => el !== items[nextIdx].images.md) &&
                    acc.push(items[nextIdx])
            }
        }

        return acc;
    },

    forEmptyHeroCard: function (count = 28) {
        const emptyHeroes = [];

        while (emptyHeroes.length < count) {
            emptyHeroes.push({
                id: shortId.generate(),
                images: {
                    md: require('../assets/images/no-portrait.jpg')
                },
                name: 'hero_undefined'
            })
        }

        return this.forHeroCard(emptyHeroes);
    }
}