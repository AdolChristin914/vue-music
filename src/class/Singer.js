/*
 * @Descripttion: Singer类
 * @version: v1.0
 * @Author: yyp
 * @Date: 2019-07-03 17:15:35
 * @LastEditors: yyp
 * @LastEditTime: 2019-07-04 10:56:32
 */

export default class Singer {
    constructor(id, name, avatar) {
        this.id = id;
        this.name = name;
        this.avatar = avatar || `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`;
    }
}
