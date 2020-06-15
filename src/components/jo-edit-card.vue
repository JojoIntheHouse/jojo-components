<template>
    <section :class="$style.root">
        <header :class="$style.header">
            <slot name="title">
                {{ title }}
            </slot>
            <span :class="$style.edit" @click.stop="onClick" v-tap="onClick">
                <i class="icon-pencil-alt"></i>
            </span>
        </header>
        <div>
            <slot></slot>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: String
    },
    methods: {
        onClick(){
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss" module>
.root{
    padding: 15px;
    background-color: var(--main-bf-color6);
    box-shadow: var(--main-shadow-color);
    border: 1px solid transparent;
}
.header{
    font-size: var(--main-font-lead);
    font-weight: bold;
    margin-bottom: 20px;

    & > .edit {
        display: inline-block;
        float: right;
    }
}
</style>