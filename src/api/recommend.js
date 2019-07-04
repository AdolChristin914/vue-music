import jsonp from '~/js/jsonp';
import { commonParams, options } from './config';
import axios from 'axios';


/**
 * 获取推荐页的数据
 */
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'; //url地址

    //拼接参数
    const data = {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
        ...commonParams
    };

    return jsonp(url, data, options);
}

export function getDiscList() {
    const url = '/getDiscList';
    const data = {
        ...commonParams,
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    };

    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        console.log(err);
        return Promise.reject(err);
    });
}
