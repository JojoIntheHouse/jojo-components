<template>
    <transition
        :enter-active-class="$style.enter"
        :leave-active-class="$style.leave">
        <div :class="$style.root" v-if="visible" @click="onCancel" v-tap="onCancel">
            <div :class="$style.overlayer" @click.stop  v-tap:stop>
                <div :class="$style.title">
                    <slot name="title"></slot>
                    <span :class="$style.iconCancel" @click="onCancel" v-tap="onCancel">
                        <i class="icon-cancel"></i>
                    </span>
                </div>
                <div :class="$style.body"> 
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name: 'jo-modal',
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: 'visible',
        event: 'toggle',
    },
    methods: {
        onCancel(){
            console.log('cancel')
            this.$emit('toggle', false);
        },
    }
}
</script>

<style lang="scss" module>
.root{
    position: fixed;
    z-index: 999;
    background-color: var(--main-overlay-color);
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 45px;
    box-sizing: border-box;
}

.overlayer{
    width: 100%;
    max-width: 631px;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 9px;
    box-shadow: var(--main-shadow-color);
}
.title{
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding-right: 23px;
    font-size: var(--main-font-h4);
    margin-bottom: 1em;
    .iconCancel {
        position: absolute;
        right: 0;
        top: 0;
        font-size: var(--main-font-h4);
    }
}
.body{

}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
.enter{
    animation: opacity-in .5s;

    .overlayer{
        animation: float-in .5s;
    }
}
.leave{
    animation: opacity-in .5s reverse;

    .overlayer{
        animation: float-in .5s reverse;
    }
}

@keyframes opacity-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes float-in {
    0% {
        transform: translateY(20px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>