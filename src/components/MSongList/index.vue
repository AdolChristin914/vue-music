<template>
    <ul>
        <li
            v-for="(item,index) in songList"
            :key="item.id"
            class="song-item"
            @click="selectPlay(item,index)"
        >
            <div class="rank" v-show="isRank">
                <span :class="getRankCls(index)">{{getRankText(index)}}</span>
            </div>
            <div class="song-item-content">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{getDescContent(item)}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        songList: {
            type: Array,
            default: () => []
        },
        isRank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getDescContent(song) {
            return `${song.singer}·${song.album}`;
        },
        selectPlay(item, index) {
            this.$emit('selectPlay', item, index);
        },
        getRankCls(index) {
            if (index <= 2) {
                return `icon icon${index}`;
            }
            return `text`;
        },
        getRankText(index) {
            if (index > 2) {
                return `${index + 1}`;
            }
            return '';
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/mixin.scss";
@import "~/style/variable.scss";

.song-item {
    display: flex;
    width: 100%;
    height: 64px;
    align-items: center;
    box-sizing: border-box;
    font-size: $font-size-medium;
    .rank {
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
        .icon {
            display: inline-block;
            width: 25px;
            height: 24px;
            background-size: 25px 24px;
            &.icon0 {
                @include bg-image("../../common/images/first");
            }
            &.icon1 {
                @include bg-image("../../common/images/second");
            }
            &.icon2 {
                @include bg-image("../../common/images/third");
            }
        }
        .text {
            color: $color-theme;
            font-size: $font-size-large;
        }
    }
    &-content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;

        .name {
            @include no-wrap();
            color: $color-text;
        }
        .desc {
            @include no-wrap();
            margin-top: 4px;
            color: $color-text-d;
        }
    }
}
</style>
