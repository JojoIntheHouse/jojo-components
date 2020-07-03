<template>
    <div :class="$style.root" :focus="focus">
        <span :class="$style.search">
             <i class="icon-search"></i>
        </span>
        <span :class="$style.input" @click="onFocus" v-tap="onFocus">
            <input ref="input" 
                :placeholder="placeholder"
                :type="type" 
                :class="$style.box" 
                :value="value" 
                @input="onChange" 
                @blur="onBlur"></input>
        </span>
    </div>
</template>

<script>
import joInput from './jo-input.vue';
export default {
    name: 'jo-search',
    extends: joInput,
}
</script>

<style lang="scss" module>
.root{
    border-bottom: 1px solid var(--main-bf-color3);
    display: flex;
    flex-direction: row;
    &[focus] {
        border-bottom-color: var(--main-color-1);
    }
    &[focus] .search{
        color: var(--main-color-1);
    }
}
.search{
    width: 35px;
    height: 35px;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
    color: var(--main-bf-color3);
}
.input{
    flex: 1;
    height: 35px;
    caret-color: var(--main-color-1);
}
.box{
    height: 100%;
    width: 100%;
    background: transparent;
    font-size: var(--main-font-body);
    border: none;
    transition: all .2s;
    padding: 0;
    &:focus{
        outline: none;
    }
}
</style>