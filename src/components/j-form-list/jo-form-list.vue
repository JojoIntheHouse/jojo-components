<template>
    <div>
        <div :class="$style.block" :table-mode="withIndex"  v-for="(item, idx) in list" :key="item.name">
            <div v-if="withIndex" :class="$style.listIndex">
                <span>{{idx}}</span>
            </div>
            <div>
                <component 
                    :is="item.component" 
                    :title="item.title"
                    :value="item.value" 
                    :mode="item.mode"
                    :formItemOptions="formItemOptions"
                    :idx="idx" 
                    @content-block-remove="remove(idx)"
                    @content-block-mode-change="changeMode(item, $event)"
                    @content-block-value-change="onChange(item, $event)"/>
            </div>
        </div>
        <jo-form-list-add-btn @click="add">
            <slot name="addbtn"></slot>
        </jo-form-list-add-btn>
    </div>
</template>

<script>
export default {
    props: {
        withIndex: {
            type: Boolean,
            default: false
        },
        list: Array,
        newComponent: Function,
        formItemOptions: {
            type: Object,
            default: () => {},
        },
    },
    model: {
        prop: 'list',
        event: 'change',
    },
    data(){
        return {

        }
    },
    methods:{
        remove(idx){
            console.log('content-block-remove', idx)
            this.list.splice(idx, 1);
            this.$emit('change', this.list)
        },
        add(){
            this.list.push({
                ...this.newComponent(),
                mode: 'edit'
            });
            this.$emit('change', this.list)
        },
        edit(item){
            item.mode = 'edit';
        },
        onChange(item, value){
            item.value = value;
        },
        changeMode(item, mode){
            console.log(item, mode)
            item.mode = mode
        }
    }
}
</script>

<style lang="scss" module>
.block{
    margin-bottom: 15px;
    &[table-mode]{
        display: table;
        width: 100%;
    }
    .listIndex{
        display: table-cell;
        width: 30px;
        span {
            display: inline-block;
            width: 1.8em;
            height: 1.8em;
            border-radius: 100%;
            border: 1px solid var(--main-color-1);
            text-align: center;
            padding: 0;
            color: var(--main-color-1);
            line-height: 2em;
            line-height: 1.8em;
            font-weight: bold;
            font-size: 12px;
        }

    }
}
</style>