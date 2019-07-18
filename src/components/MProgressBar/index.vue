<template>
    <div class="progress-bar" ref="progressBar" @click.stop="progressBarClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div
                class="progress-btn"
                ref="progressBtn"
                @touchstart.prevent="progressBtnTouchStart"
                @touchmove.prevent="progressBtnTouchMove"
                @touchend="progressBtnTouchEnd"
            ></div>
        </div>
    </div>
</template>

<script>
const progressBtnWidth = 16;
export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    methods: {
        progressBtnTouchStart(e) {
            this.touch.init = true;
            this.touch.startPageX = e.touches[0].pageX;
            this.touch.startProgressWidth = this.$refs.progress.clientWidth;
        },
        progressBtnTouchMove(e) {
            if (!this.touch.init) {
                return;
            }
            const progressBarWidth = this.$refs.progressBar.clientWidth;
            let deltaX = e.touches[0].pageX - this.touch.startPageX;
            let offsetX = deltaX < 0 ? Math.max(0, this.touch.startProgressWidth + deltaX) : Math.min(progressBarWidth, this.touch.startProgressWidth + deltaX);
            this.offsetMove(offsetX);
        },
        progressBtnTouchEnd() {
            this.touch.init = false;
            this.triggerPercent();
        },
        progressBarClick(e) {
            this.offsetMove(e.offsetX);
            this.triggerPercent();
        },
        triggerPercent() {
            const progressBarWidth = this.$refs.progressBar.clientWidth;
            const progressWidth = this.$refs.progress.clientWidth;
            const percent = progressWidth / progressBarWidth;
            this.$emit('percentChange', percent);
        },
        offsetMove(offset) {
            this.$refs.progress.style.width = `${offset}px`;
            this.$refs.progressBtn.style.transform = `translate3d(${offset}px,0,0)`;
        }
    },
    created() {
        this.touch = {};
    },
    watch: {
        percent(newVal) {
            if (newVal >= 0 && !this.touch.init) {
                let offset = newVal * this.$refs.progressBar.clientWidth;
                this.offsetMove(offset);
            }

        }
    }
};
</script>

<style lang="scss" scoped>
@import "~/style/variable.scss";
.progress-bar {
    height: 30px;
    .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        .progress {
            position: absolute;
            height: 100%;
            background: $color-theme;
        }
        .progress-btn {
            position: absolute;
            left: -8px;
            top: -6px;
            width: 16px;
            height: 16px;
            border: 3px solid $color-text;
            border-radius: 50%;
            background: $color-theme;
            box-sizing: border-box;
        }
    }
}
</style>
