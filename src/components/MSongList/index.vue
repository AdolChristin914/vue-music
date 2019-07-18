<template>
    <ul>
        <li
            v-for="(item,index) in songList"
            :key="item.id"
            class="song-item"
            @click="selectPlay(item,index)"
        >
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
        }
    },
    methods: {
        getDescContent(song) {
            return `${song.singer}·${song.album}`;
        },
        selectPlay(item, index) {
            this.$emit('selectPlay', item, index);
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
