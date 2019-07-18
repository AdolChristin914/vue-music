<template>
    <div id="app">
        <m-header></m-header>
        <m-tab></m-tab>
        <keep-alive>
            <router-view />
        </keep-alive>
        <m-player></m-player>
    </div>
</template>

<script>
import MHeader from '@/components/MHeader';
import MTab from '@/components/MTab';
import MPlayer from '@/components/MPlayer';
export default {
    components: { MHeader, MTab, MPlayer }
};
</script>


