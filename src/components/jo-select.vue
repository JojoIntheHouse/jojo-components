<template>  
    <div :class="$style.wrapper">
        <template v-if="data.length">
            <select :class="$style.root" :value="value" @change="onChange">
                <option v-for="o in data" :key="o.value" 
                    :value="o.value">{{o.text}}</option>
            </select>
            <span :class="$style.icon">
                <i class="icon-down-open"></i>
            </span>
        </template>
        <template v-else>
            <div :class="$style.root">
                <slot></slot>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        value: [ String, Number, Boolean ],
        data: Array,
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    computed: {
        current(){
            return this.data.find(i => i.value === this.value).text
        }
    },
    methods: {
        onChange($event){
            this.$emit('change', $event.target.value)
        },
        openSelect(){
            this.$refs.select.click();
        }
    }
}
</script>

<style lang="scss" module>
.wrapper{
    position: relative;
}
.root{
    -webkit-appearance: none;/*兼容苹果手机*/
    width: 100%;
    padding: 15px;
    background-color: var(--main-bf-color6);
    box-shadow: var(--main-shadow-color);
    border: 1px solid transparent;
    text-indent: 2px;
}
.root:focus{
    outline: none;
}
.icon{
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
}

</style>