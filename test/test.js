const assert = require('assert').strict;

describe('Helpers function', function () {
    describe('Randomizer number', function () {

        const testsCount = 10000
        const min = 0;
        const max = 10;
        const mean = (max - min) / 2;

        it('generate random number', function () {
            let sum = 0;
            
            for (let i = 0; i < testsCount; i++) {
                sum += Math.round(Math.random() * (max - min + 1)) + min;
            }

            const averageValueOfSum = Math.floor(sum / testsCount);
            
            assert.strictEqual(mean, averageValueOfSum);
        })


    })

    describe('Dragon list creator', function () {
        it('create array with object for dragon list', function () {
            const exampleList = [{
                    id: 0,
                    imgURL: '../assets/images/icons/dragon-solid.svg'
                },
                {
                    id: 1,
                    imgURL: `https://picsum.photos/200?random=1`
                },
                {
                    id: 2,
                    imgURL: '../assets/images/icons/dragon-solid.svg'
                },
            ];

            const list = [];
            const count = 3;
            const idx = 1;

            while (list.length < count) list.push({
                id: list.length,
                imgURL: list.length === idx ? `https://picsum.photos/200?random=${idx}` : '../assets/images/icons/dragon-solid.svg'
            });

            assert.deepStrictEqual(list, exampleList);
        }, );

    });
});