<template>
    <transition
        mode='out-in' 
        :enter-active-class="$style[`slide-${direction}-enter-active`]"
        :leave-active-class="$style[`slide-${direction}-leave-active`]">
            <slot></slot>
    </transition>
</template>

<script>
export default {
    props: {
        direction: { type: String, default: 'right' }, 
    },

}
</script>

<style lang="scss" module>

.tabpage{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}

.slide-right-enter-active{
    z-index: 99;
    animation: slide-right-in .3s ease-out;
}
.slide-right-leave-active{
    z-index: 98;
    animation: slide-right-out .3s ease-out;
}

.slide-left-enter-active{
    z-index: 98;
    animation: slide-left-in .3s ease-out;
}
.slide-left-leave-active{
    z-index: 99;
    animation: slide-left-out .3s ease-out;
}

@keyframes slide-right-in {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
    }
}
@keyframes slide-right-out {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-30%);
    }
}
@keyframes slide-left-in {
    0% {
        transform: translateX(-30%);
    }
    100% {
        transform: translateX(0);
    }
}
@keyframes slide-left-out {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100%);
    }
} 
</style>
import $style from './jo-tabs.scss'
export default {
    functional: true,
    render: function (createElement, context) {
        const direction = context.props.direction;
        console.log(context)
        const data = {
            props: {
                'enter-active-class': $style[`slide-${direction}-enter-active`],
                'leave-active-class': $style[`slide-${direction}-leave-active`],
                mode: 'out-in' 
            },
        }
        return createElement('transition', data, context.children)
    }
}