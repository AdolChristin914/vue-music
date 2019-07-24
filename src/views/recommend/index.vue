<template>
    <div>
        <m-scroll class="wrapper-content" :data="discList" ref="scroll">
            <div>
                <!-- 轮播图 -->
                <div class="mslider-container" v-if="this.recommends.length">
                    <m-slider>
                        <swiper-slide slot="slide" v-for="item in recommends" :key="item.id">
                            <!-- a标签跳转并显示图片 -->
                            <a :href="item.linkUrl">
                                <img class="mslider-img" :src="item.picUrl" />
                            </a>
                        </swiper-slide>
                    </m-slider>
                </div>
                <div class="recommend-list">
                    <!-- list-title -->
                    <h1 class="recommend-list-title">热门歌单推荐</h1>
                    <!-- list主体 -->
                    <ul v-show="discList.length">
                        <li
                            class="recommend-list-item"
                            v-for="item in discList"
                            :key="item.dissid"
                            @click="getDisc(item.dissid,item)"
                        >
                            <div class="recommend-list-icon">
                                <img v-lazy="item.imgurl" />
                            </div>
                            <div class="recommend-list-desc">
                                <h2>{{ item.creator.name }}</h2>
                                <p>{{ item.dissname }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <m-loading v-show="!discList.length" class="loading-container"></m-loading>
        </m-scroll>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import MSlider from '@/components/MSlider';
import { swiperSlide } from 'vue-awesome-swiper';
import MScroll from "@/components/MScroll";
import MLoading from '@/components/MLoading';
import { playlistmixin } from '~/js/mixin';


export default {
    data() {
        return {
            recommends: [],
            discList: []
        };
    },
    mixins: [playlistmixin],
    methods: {
        getRecommend() {
            getRecommend().then(res => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            }).catch(err => {
                console.log("error:" + err);
            });
        },
        getDiscList() {
            getDiscList().then(res => {
                if (res.code === ERR_OK) {
                    this.discList = res.data.list;
                }
            }).catch(err => {
                console.log("error:" + err);
            });
        },
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? 60 : 0;
            this.$refs.scroll.$el.style.bottom = bottom + 'px';
            this.$refs.scroll.refresh();
        },
        getDisc(id, item) {
            this.$router.push({
                path: `/recommend/${id}`
            });
            this.$store.commit('SET_DISC', item);
        }
    },
    components: {
        MSlider,
        MScroll,
        MLoading,
        swiperSlide
    },
    created() {
        this.getRecommend();
        this.getDiscList();
    }
};
</script>


<style lang="scss" scoped>
@import "~/style/variable.scss";

.wrapper-content {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: hidden;
}

.mslider-container {
    width: 100%;
    .mslider-img {
        width: 100%;
        height: 150px;
    }
}

.recommend-list {
    position: relative;
    &-item {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        height: 76px;
        align-items: center;
        padding: 10px 20px 10px 20px;
    }

    &-title {
        height: 65px;
        line-height: 65px;
        color: $color-theme;
        font-size: $font-size-medium;
        text-align: center;
    }

    &-item &-icon {
        flex: 0 0 60px;
    }

    &-item &-desc {
        display: flex;
        flex-direction: column;
        height: 60px;
        flex: 1;
        padding-left: 15px;
        padding-top: 5px;
        font-size: $font-size-medium;
        overflow: hidden;

        > h2 {
            color: $color-text;
            margin-bottom: 15px;
        }

        > p {
            color: $color-text-d;
        }
    }

    &-item &-icon > img {
        height: 60px;
        width: 60px;
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
