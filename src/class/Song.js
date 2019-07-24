/*
 * @Descripttion:歌曲类
 * @version: v1.0
 * @Author: yyp
 * @Date: 2019-07-09 10:20:22
 * @LastEditors: yyp
 * @LastEditTime: 2019-07-24 10:25:39
 */
import { getLyric } from '@/api/song';
import { ERR_OK } from '@/api/config';
import { Base64 } from 'js-base64';
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

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric);
        }

        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric);
                    resolve(this.lyric);
                } else {
                    reject('no lyric');
                }
            });
        });
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
        url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=9891906600&vkey=5B29C20876F55E8B039169B5271872E0B0E602E7F4A7F4F0E2FB4004622DD71354F4ACD5351B85EA6C1A53EBAC82F777D0F61B000940E7A1&uin=0&fromtag=38`
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
