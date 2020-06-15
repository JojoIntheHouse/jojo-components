<template>
    <div class="form-item" @click="onClick" v-tap="onClick">
        <i class="icon-plus-1"></i>
        <span :class="$style.placeholder"><slot></slot></span>
    </div>
</template>

<script>
export default {
    name: 'j-form-list-add-btn',
    methods: {
        onClick(){
            console.log('click')
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss" module>
.placeholder{
    display: inline-block;
    text-indent: .5em;
}
</style>