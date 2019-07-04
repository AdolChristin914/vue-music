<template>
    <div class="wrapper">
        <m-scroll class="wrapper-content" :data="data">
            <ul class="list-group">
                <li v-for="group in data" :key="group.title">
                    <h2 class="group-title">{{ group.title }}</h2>
                    <ul>
                        <li class="group-item" v-for="item in group.item" :key="item.id">
                            <img v-lazy="item.avatar" />
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </m-scroll>
    </div>
</template>

<script>
import MScroll from '@/components/MScroll';
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        MScroll
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
        height: 100%;
        overflow: hidden;
    }
}

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
</style>
