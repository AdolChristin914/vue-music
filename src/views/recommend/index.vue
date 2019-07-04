<template>
    <div class="wrapper">
        <m-scroll class="wrapper-content" :data="discList">
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
                        <li class="recommend-list-item" v-for="item in discList" :key="item.dissid">
                            <div class="recommend-list-icon">
                                <img v-lazy="item.imgurl" />
                            </div>
                            <div class="recommend-list-desc">
                                <h2>{{ item.creator.name }}</h2>
                                <p>{{ item.dissname }}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="loading-container" v-show="!discList.length">
                        <m-loading></m-loading>
                    </div>
                </div>
            </div>
        </m-scroll>
    </div>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import MSlider from '@/components/MSlider';
import { swiperSlide } from 'vue-awesome-swiper';
import MScroll from "@/components/MScroll";
import MLoading from '@/components/MLoading';


export default {
    data() {
        return {
            recommends: [],
            discList: []
        };
    },
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

.wrapper {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;

    &-content {
        height: 100%;
        overflow: hidden;
    }
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

    .loading-container {
        width: 100%;
        text-align: center;
    }
}
</style>
