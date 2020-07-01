<template>
    <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"

        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
        :enter-active-class="enterClass"
        :leave-active-class="leaveClass">
            <div v-show="isShow">
                <slot></slot>
            </div>
    </transition>
</template>

<script>
export default {
    props: {
        direction: { type: String, default: 'right' }, 
        isShow: { type: Boolean, default: false }, 
        isOverLap: { type: Boolean, default: false }, 
    },
    data(){
        return {
            isAnimation: false,
        }
    },
    computed: {
        enterClass(){
            const {
                $style, direction
            } = this;
            const transform = $style[`slide-${direction}-enter-active`];
            if(this.isOverLap){
                return [
                    transform, this.$style.overlap
                ].join(' ');
            }
            return transform
        },
        leaveClass(){
            const {
                $style, direction
            } = this;
            const transform = $style[`slide-${direction}-leave-active`];
            if(this.isOverLap){
                return [
                    transform, this.$style.overlap
                ].join(' ');
            }
            return transform
        }
    },
    methods: {
        beforeEnter(el){
            console.log('beforeEnter: ' )

        },
        enter(el){
             console.log('enter: ' )
        },
        afterEnter(el){

        },
        enterCancelled(el){
            console.log('enterCancelled ' )
        },
        beforeLeave(el){

        },
        leave(el){

        },
        afterLeave(el){

        },
        leaveCancelled(el){

        }
    }
}
</script>

<style lang="scss" module>

// .tabpage{
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
// }
.overlap{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
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
