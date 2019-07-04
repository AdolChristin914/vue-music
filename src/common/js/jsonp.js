/*
 * @Descripttion:jsonp封装
 * @version: v1.0
 * @Author: yyp
 * @Date: 2019-07-01 14:42:03
 * @LastEditors: yyp
 * @LastEditTime: 2019-07-02 09:53:15
 */

import _jp from 'jsonp';
import qs from 'qs';

export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + qs.stringify(data);
    return new Promise((resolve, reject) => {
        _jp(url, option, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);

        });
    });
}
