<template>
    <header :class="$style.root">
        <span :class="$style.backBtn" @click="backForward" v-tap="backForward">
            <i class="icon-left-open"></i>
        </span>
        <span>{{title}}</span>
    </header>
</template>

<script>
export default {
    name: 'jo-header',
    props: {
        title: String,
    },
    methods: {
        backForward(){
            
        }
    }
}
</script>

<style lang="scss" module>
.root{
    margin: 0 -25px;
    color: var(--main-bf-color2);
    font-size: var(--main-font-body-small);
    padding: 0 25px;
     
    .backBtn{
        display: inline-block;
        padding: 15px 5px 15px 0;
    }
}
</style>