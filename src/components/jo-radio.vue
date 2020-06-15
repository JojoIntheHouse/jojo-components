<template>
    <span>
        <input :value="value"
            :checked="value === model || checked"
            :class="$style.radio" 
            type="radio" 
            :id="uniqueId" 
            :name="groupname"
            @change="onChange" />
        <label :for="uniqueId">
            <slot>{{ label }}</slot>
        </label>
    </span>
</template>
<script>
let uniqueId = 0;
export default {
    props: {
        label: String,
        value: [String, Number, Boolean],
        checked: Boolean,
    },

    inject: {
        model: {
            from: 'value',
            default: '',
        },
        groupname: {
            from: 'groupname',
            default: '',
        },
        onChangeValue: {
            from: 'onChangeValue',
            default: () => (() => {})
        }
    },
    computed: {
        uniqueId(){
            return `${this.groupname}(${uniqueId++})`;
        }
    },
    methods: {
        onChange($event){
            this.onChangeValue($event.target.value);
            this.$emit('change', $event.target.checked);
        }
    }

}
</script>
<style lang="scss" module>
.radio{
    appearance: none;
}

.radio:checked,
.radio:not(:checked) {
    position: absolute;
    left: -9999px;
}
.radio:checked + label,
.radio:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
.radio:checked + label:before,
.radio:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid var(--main-color-1);
    border-radius: 100%;
    background: #fff;
}
.radio:checked + label:after,
.radio:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: var(--main-color-1);
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
.radio:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
.radio:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}
</style>
