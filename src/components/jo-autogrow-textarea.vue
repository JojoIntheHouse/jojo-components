<template>
    <textarea rows="1" :value="value" 
        :placeholder="placeholder"
        @input="OnInput"
        @blur="$emit('blur')"></textarea>
</template>

<script>
export default {
    props: {
        placeholder: String,
        width: String,
        height: String,
        value: String,
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    mounted(){
        const el = this.$el;
        el.setAttribute('style', `height:${this.height};width:${this.width};overflow-y:hidden;line-height: 1.5em;`);
        this.OnInput(undefined, true);
    },
    methods: {
        OnInput($event, forbid){
            const el = this.$el;
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight || this.height) + 'px';
            if(!forbid)
                this.$emit('change', $event.target.value);
        },
        focus(){
            this.$el.focus();
            this.$el.addEventListener('transitionend', () => {
                this.OnInput(undefined, true);
            }, { once: true });
           
        }
    }
}
</script>

<style>

</style>