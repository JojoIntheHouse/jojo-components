<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'jo-radios',
    provide(){
        return {
            groupname: this.groupname,
            value: this.value,
            onChangeValue: this.onChangeValue
        }  
    },
    props: {
        groupname: String,
        value: String
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    methods: {
        onChangeValue(val){
            this.$emit('change', val)
        }
    }
}
</script>