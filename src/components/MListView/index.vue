<template>
    <div class="wrapper" ref="wrapper">
        <m-scroll
            class="wrapper-content"
            :data="data"
            ref="mscroll"
            @scroll="scroll"
            :listenScroll="true"
            :probe-type="probeType"
        >
            <ul class="list-group">
                <li v-for="group in data" :key="group.title" ref="mgroup">
                    <h2 class="group-title">{{ group.title }}</h2>
                    <ul class="group-ul">
                        <li
                            class="group-item"
                            v-for="item in group.item"
                            :key="item.id"
                            @click="selectSinger(item)"
                        >
                            <img v-lazy="item.avatar" />
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div
                class="list-shortcut"
                @touchstart.stop.prevent="onShortCutTouchStart"
                @touchmove.stop.prevent="onShortCutTouchMove"
            >
                <ul>
                    <li
                        class="list-shortcut-li"
                        :class="{'current-highlight':currentIndex === index}"
                        v-for="(item,index) in shortcutList"
                        :key="item"
                        :data-index="index"
                    >{{item}}</li>
                </ul>
            </div>
            <!-- 固定列表头 -->
            <div class="list-fixed" v-show="fixedTitle" ref="fixedTitle">
                <div class="fixed-title">{{ fixedTitle }}</div>
            </div>

            <m-loading class="loading-container" v-show="!data.length"></m-loading>
        </m-scroll>
    </div>
</template>

<script>
import MScroll from '@/components/MScroll';
import MLoading from '@/components/MLoading';
import { playlistmixin } from '~/js/mixin';

const TITLE_HEIGHT = 30;
const ANCHOR_HEIGHT = 18;

export default {
    data() {
        return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        };
    },
    mixins: [playlistmixin],
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        MScroll, MLoading
    },
    computed: {
        shortcutList() {
            return this.data.map(item => item.title.slice(0, 1));
        },
        fixedTitle() {
            if (this.scrollY > 0) {
                return '';
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
        }
    },
    methods: {
        onShortCutTouchStart(e) {
            let anchorIndex = e.target.getAttribute('data-index');
            let firstTouch = e.touches[0];
            this.touch.y1 = firstTouch.pageY;
            this.touch.anchorIndex = anchorIndex;

            this.scrollTo(anchorIndex);
        },
        onShortCutTouchMove(e) {
            let firstTouch = e.touches[0];
            this.touch.y2 = firstTouch.pageY;
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta;

            this.scrollTo(anchorIndex);
        },
        scrollTo(index) {
            if (!index && index !== 0) {
                return;
            }

            if (index < 0) {
                index = 0;
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2;
            }
            this.$refs.mscroll.scrollToElement(this.$refs.mgroup[index], 0);
        },
        scroll(pos) {
            this.scrollY = pos.y;
        },
        calculateHeight() {
            this.listHeight = [];
            let height = 0;
            this.listHeight.push(height);
            let list = this.$refs.mgroup;
            for (let i = 0; i < list.length; i++) {
                height += list[i].clientHeight;
                this.listHeight.push(height);
            }
        },
        selectSinger(item) {
            this.$emit('select', item);
        },
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? 60 : 0;
            this.$refs.wrapper.style.bottom = bottom + 'px';
            this.$refs.mscroll.refresh();
        }
    },
    created() {
        this.probeType = 3; //关系到scroll事件的执行时机，详情见api
        this.touch = {};
        this.listHeight = [];
    },
    watch: {
        data() {
            this.$nextTick(() => {
                this.calculateHeight();
            });
        },
        scrollY(newY) {
            // 当滚动到顶部，newY>0
            if (newY > 0) {
                this.currentIndex = 0;
                return;
            }

            //在中间滚动
            for (let i = 0; i < this.listHeight.length - 1; i++) {
                let top = this.listHeight[i];
                let bottom = this.listHeight[i + 1];
                if (-newY >= top && -newY < bottom) {
                    this.currentIndex = i;
                    this.diff = bottom + newY;
                    return;
                }
            }
            // 当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = this.listHeight.length - 2;
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
            //有些情况下不用修改dom，不用频繁操作;
            if (this.fixedTop === fixedTop) {
                return;
            }
            this.fixedTop = fixedTop;
            //修改dom
            this.$refs.fixedTitle.style.transform = `translate3d(0,${fixedTop}px,0)`;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";

.wrapper {
    position: fixed;
    top: 88px;
    bottom: 0;

    width: 100%;

    &-content {
        position: relative;
        height: 100%;
        overflow: hidden;

        .list-group {
            width: 100%;
            background: $color-background;

            .group-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: $font-size-small;
                color: $color-text-l;
                background: $color-highlight-background;
            }

            .group-ul {
                padding: 5px 0;
            }

            .group-item {
                display: flex;
                align-items: center;
                padding: 10px 0 10px 30px;

                img {
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                    flex: 0 0 50px;
                    margin-right: 15px;
                }

                span {
                    color: $color-text-l;
                    font-size: $font-size-medium;
                    flex: 1;
                }
            }
        }

        .list-shortcut {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            background: $color-background-d;
            font-family: Helvetica;
            text-align: center;
            .list-shortcut-li {
                padding: 3px;
                line-height: 1;
                color: $color-text-l;
                font-size: $font-size-small;
            }
            .current-highlight {
                color: $color-theme;
            }
        }

        .list-fixed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            .fixed-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: $font-size-small;
                color: $color-text-l;
                background: $color-highlight-background;
            }
        }
    }
}
</style>
