<template>
    <div class="music-view" ref="musicView">
        <div class="music-view-head" @click="back">
            <h1 class="music-view-title">{{ title }}</h1>
            <i class="icon-back"></i>
        </div>
        <div class="title-mask" v-show="showTitleMask"></div>
        <div class="bg-container" ref="bgContainer">
            <div class="bg-img" :style="bgStyle" ref="bgImg">
                <div class="bg-filter" ref="bgFilter"></div>
            </div>
            <div class="bg-play-container" v-if="songList.length" ref="bgPlay" @click="randomPlay">
                <i class="icon-play"></i>
                <span class="play-text">随机播放全部</span>
            </div>
        </div>
        <div class="scroll-mask" ref="scrollMask"></div>
        <m-scroll
            :data="songList"
            class="wrapper-content"
            ref="scrollWrapper"
            :probe-type="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll"
        >
            <div class="wrapper-song-list">
                <m-song-list :songList="songList" @selectPlay="selectPlay"></m-song-list>
            </div>
            <m-loading class="loading-container" v-if="!songList.length"></m-loading>
        </m-scroll>
    </div>
</template>

<script>
import MScroll from '@/components/MScroll';
import MSongList from '@/components/MSongList';
import MLoading from '@/components/MLoading';

const FIXED_HEIGHT = 40;

export default {
    data() {
        return {
            scrollY: 0,
            showTitleMask: false
        };
    },
    props: {
        songList: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        bgImg: {
            type: String,
            default: ''
        }
    },
    computed: {
        bgStyle() {
            return `background-image: url(${this.bgImg})`;
        }
    },
    methods: {
        scroll(pos) {
            this.scrollY = pos.y;
        },
        back() {
            this.$router.back();
        },
        selectPlay(item, index) {
            this.$store.dispatch('SelectPlay', { songList: this.songList, index });
        },
        randomPlay() {
            this.$store.dispatch('RandomPlay', { songList: this.songList });
        }
    },
    components: {
        MScroll, MSongList, MLoading
    },
    created() {
        this.probeType = 3;
        this.listenScroll = true;
    },
    mounted() {
        this.bgImgHeight = this.$refs.bgImg.clientHeight;
        this.$refs.scrollWrapper.$el.style.top = `${this.bgImgHeight}px`;
        this.fixed_offsetY = this.bgImgHeight - FIXED_HEIGHT;  //到固定栏偏移度
    },
    watch: {
        scrollY(newVal) {
            let maskHeight = this.$refs.scrollMask.clientHeight - newVal;  //遮罩高度
            let offsetY = newVal;   //向上偏移度
            let blurVal = 0;
            this.showTitleMask = false; //重置showTitleMask

            this.$refs.bgContainer.style["overflow"] = 'visible';
            if (this.$refs.bgPlay) {
                this.$refs.bgPlay.style.display = "block";
            }
            if (newVal < 0) {
                //卷曲达到顶部固定高度
                if (-newVal >= this.fixed_offsetY) {
                    offsetY = -this.fixed_offsetY;
                    this.$refs.bgImg.style["padding-top"] = 0;
                    this.$refs.bgImg.style["height"] = `${FIXED_HEIGHT}px`;
                    this.$refs.bgImg.style["z-index"] = 20;
                    this.$refs.bgContainer.style["z-index"] = 20;
                    this.$refs.bgContainer.style["overflow"] = 'hidden';
                    this.showTitleMask = true;  //达到顶部的时候设置title的遮盖，遮住图片blur时候边框虚化出现的滚动文字;如果不考虑兼容性,可以使用backdrop-filter,只能在webkit内核看见
                    this.$refs.bgPlay.style.display = "none";
                } else { //没有达到高度
                    offsetY = newVal;
                    this.$refs.bgImg.style["padding-top"] = "70%";
                    this.$refs.bgImg.style["height"] = 0;
                    this.$refs.bgImg.style["z-index"] = 0;
                    this.$refs.bgContainer.style["z-index"] = 0;
                }
                blurVal = 1;
            } else if (newVal >= 0) {
                this.$refs.bgImg.style.transform = `scale(${(this.bgImgHeight + offsetY) / this.bgImgHeight})`;
                this.$refs.bgPlay.style.transform = `translate3d(-50%,${offsetY}px,0)`;
                this.$refs.bgImg.style["z-index"] = 20;
                this.$refs.bgContainer.style["z-index"] = 20;
            }

            this.$refs.bgImg.style.WebkitFilter = `blur(${blurVal}px)`;
            this.$refs.scrollMask.style.transform = `translate3d(0,${offsetY}px,0)`;  //translate3d可以开启GPU加速
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";
@import "~/style/mixin.scss";
.music-view {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $color-background;
    z-index: 100;

    .wrapper-content {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: $color-background;
        z-index: 10;
        .wrapper-song-list {
            padding: 20px 30px;
        }
    }

    .title-mask {
        position: fixed;
        z-index: 15;
        left: 0;
        right: 0;
        top: 0;
        height: 40px;
        background: #222;
    }

    .scroll-mask {
        width: 100%;
        height: 100%;
        background-color: $color-background;
        z-index: 10;
    }
    &-head {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: 40px;
        line-height: 40px;
        z-index: 50;

        .icon-back {
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
            color: $color-theme;
            font-size: 20px;
        }
    }

    &-title {
        margin: 0 auto;
        height: 100%;
        width: 70%;
        z-index: 40;
        @include no-wrap();
        text-align: center;
        font-size: $font-size-large;
        color: $color-text;
    }
    .bg-container {
        position: relative;
        width: 100%;

        .bg-img {
            width: 100%;
            padding-top: 70%;
            background-size: cover;
            transform-origin: top;

            .bg-filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(7, 17, 27, 0.4);
            }
        }

        .bg-play-container {
            position: absolute;
            left: 50%;
            border: 1px solid $color-theme;
            bottom: 20px;
            padding: 7px 0;
            transform: translateX(-50%);
            width: 135px;
            color: $color-theme;
            font-size: $font-size-small;
            border-radius: 100px;
            z-index: 50;
            text-align: center;

            .icon-play {
                font-size: $font-size-medium-x;
                margin-right: 5px;
                vertical-align: middle;
            }

            .play-text {
                vertical-align: middle;
            }
        }
    }
}
</style>
