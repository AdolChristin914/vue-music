/*
 * @Descripttion:歌曲类
 * @version: v1.0
 * @Author: yyp
 * @Date: 2019-07-09 10:20:22
 * @LastEditors: yyp
 * @LastEditTime: 2019-07-17 16:16:44
 */

export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}


export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=9891906600&vkey=1C2A00D7AC813921B2141634F8734C453D16C3CCAEA97EE0077B8ABA104BAB1035906CCBD29BF39BB22ACA6878165DE10ED0312B51644A41&uin=0&fromtag=38`
    });
}


function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return '';
    }
    singer.forEach((s) => {
        ret.push(s.name);
    });
    return ret.join('/');
}
