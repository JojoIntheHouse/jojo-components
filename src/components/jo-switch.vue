<template>
    <span :class="$style.switch" :checked="value" @click="onChange" v-tap="onChange"></span>
</template>

<script>
export default {
    props: {
        groupname: String,
        value: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    methods: {
        onChange(){
            this.$emit('change', !this.value)
        }
    }
}
</script>

<style lang="scss" module>
.switch {
    position: relative;
    display: inline-block; 
    width: 2.2rem;
    height: 1.25rem;
    transition: all .12s linear;
    background-color: var(--main-bf-color3);
    border-radius: 0.8rem;
    padding: 0.125rem;
    box-sizing: border-box;
    cursor: pointer;

    &[checked]{
        background-color: var(--main-color-1);  
    }

    &::after{
        display: block;
        content: "";
        height: 1rem;
        width: 1rem;
        border-radius: 100%;
        background-color: var(--main-bf-color6);
        box-shadow: var(--main-shadow-color);
        transition: all .12s linear;
        transform: translateX(0);
    }

    &[checked]::after{
        transform: translateX(0.95rem); 
    }
}
</style>