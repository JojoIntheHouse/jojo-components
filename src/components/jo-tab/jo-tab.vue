<template>
    <div :class="$style.tabpage"><slot></slot></div>
</template>

<script>
export default {
    name: 'jo-tab',
    props: {
        // key: { required: true },
        selected: { default: false},
    },
}
</script>

<style lang="scss" module>
.tabpage{
    // position: absolute;
    position: relative;
    // background-color: #fff;
    left: 0;
    top: 0;
    width: 100%;
    
}
</style>