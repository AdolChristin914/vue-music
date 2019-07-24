<template>
    <div class="rank" ref="rank">
        <m-scroll :data="topList" class="toplist" ref="toplist">
            <ul>
                <li @click="selectItem(item)" class="item" v-for="item in topList" :key="item.id">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.picUrl" />
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song,index) in item.songList" :key="index">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <m-loading class="loading-container" v-show="!topList.length"></m-loading>
        </m-scroll>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import MScroll from '@/components/MScroll';
import { getTopList } from '@/api/rank';
import { ERR_OK } from '@/api/config';
import MLoading from '@/components/MLoading';
import { playlistmixin } from '~/js/mixin';
export default {
    data() {
        return {
            topList: []
        };
    },
    mixins: [playlistmixin],
    components: { MScroll, MLoading },
    methods: {
        getTopList() {
            getTopList().then(res => {
                if (res.code === ERR_OK) {
                    this.topList = res.data.topList;
                }
            }).catch(err => { console.log(err); });
        },
        selectItem(item) {
            this.$router.push({
                path: `/rank/${item.id}`
            });
            this.$store.commit('SET_TOPSONGITEM', item);
        },
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? 60 : 0;
            this.$refs.rank.style.bottom = bottom + 'px';
            this.$refs.toplist.refresh();
        }
    },
    created() {
        this.getTopList();
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";
@import "~/style/mixin.scss";
.rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist {
        height: 100%;
        overflow: hidden;
        .item {
            display: flex;
            margin: 0 20px;
            padding-top: 20px;
            height: 100px;
            &:last-child {
                padding-bottom: 20px;
            }
            .icon {
                flex: 0 0 100px;
                width: 100px;
                height: 100px;
            }
            .songlist {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 20px;
                height: 100px;
                overflow: hidden;
                background: $color-highlight-background;
                color: $color-text-d;
                font-size: $font-size-small;
            }
            .song {
                @include no-wrap();
                line-height: 26px;
            }
        }
    }
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
