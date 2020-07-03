<template>
    <div :class="$style.root" :focus="focus">
        <span :class="$style.title">{{title}}</span>
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
export default {
    name: 'jo-input',
    props: {
        title: String,
        value: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data(){
        return {
            focus: false,
        }
    },
    methods: {
        onChange($event){
            this.$emit('change', $event.target.value)
        },
        onFocus(){
            this.$refs.input.focus();
            this.focus = true;
        },
        onBlur($event){
            this.$emit('blur', $event.target.value);
            this.focus = false;
        }
    }
    
}
</script>

<style lang="scss" module>
.root{
    &[focus] .title{
        font-size: var(--main-font-body-small);
    }
    &[focus] .box{
        font-size: var(--main-font-h5);
        
    }
    &[focus] .input{
        border-bottom-color: var(--main-color-1);
    }
}
.title{
    // display: block;
    color: var(--main-bf-color2);
    font-size: var(--main-font-body);
    height: var(--main-font-lead);
    transition: all .2s;
    display: table-cell;
    vertical-align: bottom;
    margin-bottom: 8px; 
    
}
.input{
    display: block;
    border-bottom: 1px solid var(--main-bf-color3);
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