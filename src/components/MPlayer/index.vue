<template>
    <div class="player-container" v-show="playlist.length>0">
        <transition
            name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen" ref="normalPlayer">
                <div class="background">
                    <img :src="currentSong.image" />
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdImgWrapper">
                            <div class="cd" :class="cdCls">
                                <img :src="currentSong.image" />
                            </div>
                        </div>
                    </div>
                    <div class="playing-lyric-wrapper"></div>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper"></div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{formatTime(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <m-progress-bar :percent="percent" @percentChange="onProgressBarChange"></m-progress-bar>
                        </div>
                        <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i class="icon-prev" @click="prevSong"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i :class="normalPlayIcon" @click.stop="togglePlayingState()"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i class="icon-next" @click="nextSong"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open" ref="miniPlayer">
                <div class="icon">
                    <div class="img-wrapper">
                        <img :src="currentSong.image" :class="cdCls" />
                    </div>
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <i :class="miniPlayIcon" @click.stop="togglePlayingState()"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio
            :src="currentSong.url"
            ref="musicAudio"
            @canplay="audioReady"
            @error="audioError"
            @timeupdate="audioTimeUpdate"
        ></audio>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MProgressBar from '@/components/MProgressBar';
export default {
    data() {
        return {
            isAudioReady: false,
            currentTime: 0
        };
    },
    components: {
        MProgressBar
    },
    computed: {
        ...mapGetters([
            'fullScreen', 'playlist', 'currentSong', 'playing', 'currentIndex'
        ]),
        cdCls() {
            return this.playing ? 'playing' : 'playing pause';
        },
        normalPlayIcon() {
            return this.playing ? 'icon-pause' : 'icon-play';
        },
        miniPlayIcon() {
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
        },
        disableCls() {
            return this.isAudioReady ? '' : 'disable';
        },
        percent() {
            return this.currentTime / this.currentSong.duration;
        }
    },
    methods: {
        back() {
            this.$store.commit("SET_FULLSCREEN", false);
        },
        open() {
            this.$store.commit("SET_FULLSCREEN", true);
        },
        enter(el, done) {
            this.$refs.cdImgWrapper.style.animation = "moveToPos 0.4s"; //添加动画
            this.enterDoneF = done;
            this.$refs.cdImgWrapper.addEventListener('animationend', done); //给动画完成事件添加监听,完成后会出发done事件回调，执行afterEnter函数
        },
        afterEnter() {
            this.$refs.cdImgWrapper.style.animation = ''; //手动清除样式
            this.$refs.cdImgWrapper.removeEventListener('animationend', this.enterDoneF); //清除绑定监听
        },
        leave(el, done) {
            this.$refs.cdImgWrapper.style.animation = "leaveToPos 0.4s"; //添加动画
            this.leaveDoneF = done;
            this.$refs.cdImgWrapper.addEventListener('animationend', done); //给动画完成事件添加监听,完成后会出发done事件回调，执行afterLeave函数
        },
        afterLeave() {
            this.$refs.cdImgWrapper.style.animation = ''; //手动清除样式
            this.$refs.cdImgWrapper.removeEventListener('animationend', this.leaveDoneF); //清除绑定监听
        },
        getTransOffset() {
            const mini_paddingLeft = 20;
            const mini_width = 40;
            const mini_paddingBottom = 10;
            const mini_pos = {
                x: mini_paddingLeft + mini_width / 2,
                y: window.innerHeight - mini_paddingBottom - mini_width / 2
            };

            const normal_width = window.innerWidth * 0.8;
            const normal_paddingLeft = window.innerWidth * 0.1;
            const normal_paddingTop = 80;
            const normal_pos = {
                x: normal_paddingLeft + normal_width / 2,
                y: normal_paddingTop + normal_width / 2
            };

            const trans_x = -(normal_pos.x - mini_pos.x);
            const trans_y = mini_pos.y - normal_pos.y;

            const scale = mini_width / normal_width;

            return { trans_x, trans_y, scale };
        },
        togglePlayingState() {
            const toggle_state = this.playing ? false : true;
            this.$store.commit('SET_PLAYING', toggle_state);
        },
        prevSong() {
            if (!this.isAudioReady) {
                return;
            }
            let index = this.currentIndex;
            if (index === 0) {
                index = this.playlist.length - 1;
            } else {
                index--;
            }
            this.$store.commit('SET_CURRENTINDEX', index);
            if (!this.playing) {
                this.togglePlayingState();
            }
            this.isAudioReady = false;
        },
        nextSong() {
            if (!this.isAudioReady) {
                return;
            }
            let index = this.currentIndex;
            if (index === this.playlist.length - 1) {
                index = 0;
            } else {
                index++;
            }
            this.$store.commit('SET_CURRENTINDEX', index);
            if (!this.playing) {
                this.togglePlayingState();
            }
            this.isAudioReady = false;
        },
        audioReady() {
            this.isAudioReady = true;
        },
        audioError() {
            this.isAudioReady = true;
        },
        audioTimeUpdate(e) {
            this.currentTime = e.target.currentTime;
        },
        formatTime(time) {
            time = time | 0;
            const minutes = time / 60 | 0;
            const seconds = this.padLeft(time % 60 | 0);
            return minutes + ':' + seconds;
        },
        padLeft(time, n = 2) {
            const len = time.toString().length;
            if (len < n) {
                time = '0'.repeat(n - len) + time.toString();
            }
            return time;
        },
        onProgressBarChange(percent) {
            const currentTime = this.currentSong.duration * percent;
            this.$refs.musicAudio.currentTime = currentTime;
            if (!this.playing) {
                this.togglePlayingState();
            }
        }
    },
    mounted() {
        const { trans_x, trans_y, scale } = this.getTransOffset();
        //动态生成css样式表,只初始化一次，因为每次transition事件触发会多次创建
        document.styleSheets[0].insertRule(`@keyframes moveToPos{
                    0% {
                        transform: translate3d(${trans_x}px, ${trans_y}px, 0) scale(${scale})
                    }
                    60% {
                        transform: translate3d(0, 0, 0) scale(1.1)
                    }
                    100% {
                        transform: translate3d(0, 0, 0) scale(1)
                    }
        `);

        document.styleSheets[0].insertRule(`@keyframes leaveToPos{
                    0% {
                        transform: translate3d(0, 0, 0) scale(1)
                    }
                    100% {
                        transform: translate3d(${trans_x}px, ${trans_y}px, 0) scale(${scale})
                    }
         }`);
    },
    watch: {
        currentSong(newVal) {
            this.$nextTick(() => {
                this.$refs.musicAudio.play();
            });
        },
        playing(newVal) {
            this.$nextTick(() => {
                const audio = this.$refs.musicAudio;
                newVal ? audio.play() : audio.pause();
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";
@import "~/style/mixin.scss";

.player-container {
    .normal-player {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background: $color-background;
        .background {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px);
            img {
                height: 100%;
                width: 100%;
            }
        }
        .top {
            position: relative;
            margin-bottom: 25px;
            .back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
                .icon-back {
                    display: block;
                    padding: 9px;
                    font-size: $font-size-large-x;
                    color: $color-theme;
                    transform: rotate(-90deg);
                }
            }
            .title {
                width: 70%;
                text-align: center;
                margin: 0 auto;
                font-size: $font-size-large;
                color: $color-text;
                height: 40px;
                line-height: 40px;
                @include no-wrap();
            }
            .subtitle {
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-text;
            }
        }
        .middle {
            position: fixed;
            left: 0;
            right: 0;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            .middle-l {
                position: relative;
                height: 0;
                padding-top: 80%; //保证高度与图片高度一直
                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    height: 100%;
                    box-sizing: border-box;
                    .cd {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        img {
                            width: 100%;
                            height: 100%;
                            border: 10px solid hsla(0, 0%, 100%, 0.1);
                            box-sizing: border-box;
                            border-radius: 50%;
                        }
                        &.playing {
                            animation: playRotate 20s linear infinite;
                        }
                        &.pause {
                            animation-play-state: paused;
                        }
                    }
                }
            }
            .playing-lyric-wrapper {
                width: 80%;
                margin: 30px auto 0;
                overflow: hidden;
                text-align: center;
            }
        }
        .bottom {
            position: absolute;
            bottom: 50px;
            width: 100%;
            .dot-wrapper {
                text-align: center;
            }
            .progress-wrapper {
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0;
                .time {
                    color: $color-text;
                    font-size: $font-size-small;
                    flex: 0 0 40px;
                    line-height: 30px;
                    width: 40px;
                    &.time-l {
                        text-align: left;
                    }
                    &.time-r {
                        text-align: right;
                    }
                }
                .progress-bar-wrapper {
                    flex: 1;
                }
            }
            .operators {
                display: flex;
                align-items: center;
                .icon {
                    flex: 1;
                    color: $color-theme;
                    i {
                        font-size: 30px;
                    }
                    .icon-play {
                        font-size: 40px;
                    }
                    .icon-pause {
                        font-size: 40px;
                    }
                    &.disable {
                        color: $color-theme-d;
                    }
                }
                .i-left {
                    text-align: right;
                }
                .i-center {
                    text-align: center;
                    margin: 0 20px;
                }
                .i-right {
                    text-align: left;
                }
            }
        }
        &.normal-enter-active,
        &.normal-leave-active {
            transition: all 0.4s;
            .top,
            .bottom {
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
            }
        }
        &.normal-enter,
        &.normal-leave-to {
            opacity: 0;
            .top {
                transform: translate3d(0, -100px, 0);
            }
            .bottom {
                transform: translate3d(0, 100px, 0);
            }
        }
    }
    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: $color-highlight-background;
        &.mini-enter-active,
        &.mini-leave-active {
            transition: all 0.4s;
        }
        &.mini-enter,
        &.mini-leave-to {
            opacity: 0;
        }

        .icon {
            width: 40px;
            height: 40px;
            flex: 0 0 40px;
            padding: 0 10px 0 20px;
            .img-wrapper {
                height: 100%;
                width: 100%;
                img {
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    &.playing {
                        animation: playRotate 10s linear infinite;
                    }
                    &.pause {
                        animation-play-state: paused;
                    }
                }
            }
        }
        .text {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            line-height: 20px;
            overflow: hidden;
            .name {
                margin-bottom: 2px;
                @include no-wrap();
                font-size: $font-size-medium;
                color: $color-text;
            }
            .desc {
                @include no-wrap();
                font-size: $font-size-small;
                color: $color-text-d;
            }
        }
        .control {
            flex: 0 0 30px;
            width: 30px;
            padding: 0 10px;
            .icon-play-mini,
            .icon-pause-mini,
            .icon-playlist {
                font-size: 30px;
                color: $color-theme-d;
            }
            .icon-mini {
                font-size: 32px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
    @keyframes playRotate {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>
