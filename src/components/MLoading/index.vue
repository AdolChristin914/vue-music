<template>
    <div class="m-loading">
        <img :src="imgSrc" />
        <span>{{loadingText}}</span>
    </div>
</template>

<script>
export default {
    props: {
        imgSrc: {
            type: String,
            default: require('~/images/loading.gif')
        },
        loadingText: {
            type: String,
            default: "请稍等"
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";

.m-loading {
    text-align: center;
    img {
        height: 25px;
        width: 25px;
    }

    span {
        color: $color-text-ll;
        font-size: $font-size-small-s;
        display: block;
        margin-top: 5px;
    }
}
</style>
