<template>
    <div class="nav-tab">
        <router-link
            tag="div"
            class="nav-tab-item"
            to="/recommend"
        ><span class="nav-tab-text">推荐</span></router-link>
        <router-link
            tag="div"
            class="nav-tab-item"
            to="/singer"
        ><span class="nav-tab-text">歌手</span></router-link>
        <router-link
            tag="div"
            class="nav-tab-item"
            to="/rank"
        ><span class="nav-tab-text">排行</span></router-link>
        <router-link
            tag="div"
            class="nav-tab-item"
            to="/search"
        ><span class="nav-tab-text">搜索</span></router-link>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";

.nav-tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;
    &-item {
        flex: 1;
        text-align: center;

        .nav-tab-text {
            color: $color-text-l;
            padding-bottom: 5px
        }
    }

    &-item.router-link-active .nav-tab-text{
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
    }
}
</style>


