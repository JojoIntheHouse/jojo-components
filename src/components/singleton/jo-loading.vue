<template>
    <transition
        :enter-active-class="$style.enter"
        :leave-active-class="$style.leave">
        <div :class="$style.fullscreen" v-if="visible">
            <div :class="$style['lds-ring']"><div></div><div></div><div></div><div></div></div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: false
        }
    },
    methods: {
        show(){
            this.visible = true;
        },
        hide(){
            this.visible = false;
        }
    }
}
</script>

<style lang="scss" module>
.fullscreen{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-overlay-color);
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid var(--main-color-1);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--main-color-1) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.enter{
    animation: fade-in .3s ease-in;
}
.leave{
    animation: fade-in .3s ease-in reverse;
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>