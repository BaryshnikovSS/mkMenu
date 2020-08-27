import shortId from 'shortid'

export default function getList(count, idx) {
    const list = [];
    while (list.length < count) list.push({
        id: shortId.generate(),
        imgURL: list.length === idx ? 'https://picsum.photos/200' : require('../assets/images/icons/dragon-solid.svg')
    });
    return list;
}