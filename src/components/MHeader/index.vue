<template>
    <div class="app-head">
        <div class="app-head-logo"></div>
        <h1 class="app-head-title">Music App</h1>
    </div>
</template>

<style lang="scss" scoped>
@import "~/style/variable.scss";
@import "~/style/mixin.scss";

.app-head {
    height: 44px;
    text-align: center;
    color: $color-theme;

    &-logo {
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 32px;
        margin-right: 12px;
        margin-top: 6px;
        background-size: 30px 32px;
        @include bg-image("../../common/images/logo");
    }

    &-title {
        display: inline-block;
        vertical-align: top;
        line-height: 44px;
        font-size: $font-size-large;
    }
}
</style>

