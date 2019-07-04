<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <slot name="slide" />
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    data() {
        return {
            swiperOption: {
                // some swiper options/callbacks
                // 所有的参数同 swiper 官方 api 参数
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                }
            }
        };
    },
    components: {
        swiper
    },
    activated() {
        //此组件被keepalive,所以在再次载入组件的时候开启轮播
        this.$refs.mySwiper.swiper.autoplay.start();
    },
    deactivated() {
        //此组件被keepalive,所以在离开组件的时候关闭轮播
        this.$refs.mySwiper.swiper.autoplay.stop();
    }
};
</script>

<style lang="scss" scoped>
</style>
