import { getSingerDetail } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import Singer from '@/class/Singer';

const singer = {
    state: {
        singer: {}
    },
    mutations: {
        SET_SINGER: (state, singer) => {
            state.singer = singer;
        }
    },
    actions: {
        GetSingerDetail({ commit }, payload) {
            return new Promise((resolve, reject) => {
                getSingerDetail(payload.id).then(res => {
                    if (res.code === ERR_OK) {
                        commit('SET_SINGER', new Singer(res.data.singer_mid, res.data.singer_name));
                        resolve(res.data.list);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

export default singer;
