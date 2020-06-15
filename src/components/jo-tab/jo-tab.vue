<template>
    <div :class="$style.tabpage" :key="name"><slot></slot></div>
</template>

<script>
export default {
    name: 'jo-tab',
    props: {
        name: { required: true },
        selected: { default: false},
    },
}
</script>

<style lang="scss" module>
.tabpage{
    // position: absolute;
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
}
</style>