<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input type="text" class="search-input" v-model="searchTxt" :placeholder="placeholder" />
        <i class="icon-dismiss" @click="clear()" v-show="searchTxt"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTxt: ''
        };
    },
    props: {
        placeholder: {
            type: String,
            default: '搜索歌曲、歌手'
        }
    },
    methods: {
        clear() {
            this.searchTxt = '';
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";
.search-box {
    display: flex;
    width: 100%;
    height: 40px;
    padding: 0 6px;
    border-radius: 6px;
    background-color: #333;
    box-sizing: border-box;
    align-items: center;
    .icon-search {
        font-size: 24px;
        color: #222;
    }
    .icon-dismiss {
        font-size: 16px;
        color: #222;
    }
    .search-input {
        flex: 1;
        background-color: #333;
        border: none;
        color: #fff;
        margin: 0 5px;
        outline: 0;
        font-size: $font-size-medium;
    }
}
</style>
