<template>
    <div class="search">
        <div class="search-wrapper">
            <m-search-box></m-search-box>
        </div>
    </div>
</template>

<script>
import MSearchBox from '@/components/MSearchBox';
export default {
    components: { MSearchBox }
};
</script>

<style lang="scss" scoped>
.search {
    .search-wrapper {
        margin: 20px;
    }
}
</style>
