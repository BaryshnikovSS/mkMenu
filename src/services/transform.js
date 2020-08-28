import shortId from 'shortid';

const refs = {
    emptyHeroImgs: [
        'https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/md/no-portrait.jpg',
        'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/no-portrait.jpg'
    ],
    emptyImgIdx: [14, 20, 21, 27]
}

export default {
    forHeroCard: function (heroes = []) {
        const currentHeroes = this.selectItems(heroes);

        return currentHeroes.map((hero, idx) => (idx === 10 ? {
            id: shortId.generate(),
            imgURL: require('../assets/images/mortalKombatLogo.png'),
            name: 'logo'
        } : {
            id: `${shortId.generate()}_${hero.id}`,
            imgURL: refs.emptyImgIdx.some(el => el === idx) ? '' : hero.images.md,
            name: refs.emptyImgIdx.some(el => el === idx) ? 'empty' : hero.name
        }));
    },

    selectItems: function (items = []) {

        const acc = [];

        while (acc.length < 28) {
            const nextIdx = getRandomInRange(0, items.length);
            
            acc.every(el => el.id !== items[nextIdx].id) &&
                refs.emptyHeroImgs.every(el => el !== items[nextIdx].images.md) &&
                    acc.push(items[nextIdx])
        }

        function getRandomInRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return acc;
    }

}