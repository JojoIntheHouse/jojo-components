<template>
    <div :class="$style.root" :focus="focus">
        <div :class="$style.header">
            
            <span style="float: right;">
                <span :class="[$style.operations, $style.trash]"
                    @click="onRemove"
                    v-tap="onRemove">
                    <i class="icon-trash"></i>
                </span>
                <span :class="[$style.operations, $style.write]"
                    :mode="mode" 
                    @click="onEdit"
                    v-tap="onEdit">
                    <i class="icon-pencil-alt"></i>
                </span>
            </span>
            <span :class="$style.title">{{ mode === 'edit' ? title : value}}</span>
        </div>
        <transition
            :enter-active-class="$style.showon"
            :leave-active-class="$style.showoff">
            <span v-if="mode==='edit'" :class="$style.input" @click="onFocus" v-tap="onFocus">
                <jo-textarea ref="input" 
                    height="1em"
                    width="100%"
                    :placeholder="formItemOptions.placeholder"
                    :class="$style.box" 
                    :value="value" 
                    @change="onChange" 
                    @blur="onBlur"></jo-textarea>
            </span>
        </transition>
    </div>
</template>

<script>
import propmixin from './form-list-props-mixin';
export default {
    mixins: [propmixin],
    data(){
        return {
            focus: false,
        }
    },
    methods: {
        onChange($event){
            this.$emit('content-block-value-change', $event)
        },
        onFocus(){
            this.$refs.input.focus();
            this.focus = true;
        },
        onBlur(){
            this.focus = false;
            this.$emit('content-block-mode-change', 'view')
        },
        onRemove(){
            this.$emit('content-block-remove');
        },
        onEdit(){
            this.$emit('content-block-mode-change', 'edit');
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
    word-break: break-all;
    color: var(--main-bf-color2);
    font-size: var(--main-font-body);
    height: var(--main-font-lead);
    transition: all .2s;
    
}
.header{
    font-size: var(--main-card-h1);
}

.operations{
    text-align: right;
    width: 24px;
    display: inline-block;
    font-size: var(--main-card-h1);
}
.trash {
    color:var(--main-color-2)
}
.write{
    color: var(--main-bf-color2);
}
.write[mode="edit"]{
     color: var(--main-color-1);
}
.input{
    display: block;
    border-bottom: 1px solid var(--main-bf-color3);
    caret-color: var(--main-color-1);
}
.box{
    // height: 100%;
    // width: 100%;
    background: transparent;
    font-size: var(--main-font-body);
    border: none;
    transition: all .2s;
    padding: 0;
    &:focus{
        outline: none;
    }
}
.showon{
    animation: showon .3s ease-out;
}
.showoff{
    animation: showon .3s ease-out reverse;
}
@keyframes showon {
    0%{
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>