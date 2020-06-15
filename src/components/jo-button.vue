<template>
    <button :class="className" :disabled="disabled" 
        @click.prevent="onClick"
        v-tap="onClick"
        :no-border="plain">
        <i v-if="icon" :class="[`icon-${icon}`, $style.icon]"></i>
        <slot></slot>
        <svg v-show="loading" ref="loading" 
            :width="svgmeta.width" 
            :height="svgmeta.height" 
            :viewBox="svgmeta.viewBox" :class="$style.loading">
            <path :d="svgmeta.d" stroke-width="4" stroke="#F8B449" fill="transparent"/>
        </svg>
    </button>
</template>

<script>
export default {
    name: 'jo-button',
    props: {
        icon: String,
        color: {
            type: String,
            default: 'secondary',
        },
        size: {
            type: String,
            default: 'normal'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            svgmeta: {
                width: 0,
                height: 0,
                viewBox: '0 0 0 0',
                d: ''
            }
        }
    },
    computed: {
        className(){
            return [
                this.$style.button, 
                this.$style[`button-${this.color}`], 
                this.$style[`button-${this.size}`],
            ]
        },
    },
    mounted(){
        this.$el.addEventListener('animationend', () => {
            this.$el.classList.remove(this.$style['button--click'])
        });
        const {
            width, height
        } = this.$el.getBoundingClientRect();
        const borderWidth = parseInt(window.getComputedStyle(this.$el)['border-width']);
        const padding = 2;
        const w = width + padding + borderWidth*2;
        const h = height + padding + borderWidth*2;
        
        const radius = 9;
        Object.assign(this.svgmeta, {
            width: `${w}px`,
            height: `${h}px`,
            offset: `-${borderWidth}px`,
            viewBox: `0 0 ${w} ${h}`,
            d: `M ${9+padding} ${padding} 
                L ${w-9-padding} ${padding}
                Q ${w-padding} ${padding} ${w-padding} ${9+padding} 
                L ${w-padding} ${h-9-padding} 
                Q ${w-padding} ${h-padding} ${w-9-padding} ${h-padding}
                L ${9+padding} ${h-padding} 
                Q ${padding} ${h-padding} ${padding} ${h-9-padding}
                L ${padding} ${9+padding}
                Q ${padding} ${padding} ${9+padding} ${padding} 
                Z`
        });
        this.$refs.loading.style.left = `-${borderWidth*2+padding/2}px`;
        this.$refs.loading.style.top = `-${borderWidth*2+padding/2}px`;
        // console.log(this.svgmeta.d)
    },
    methods: {
        onClick($event){
            console.log('click')
            if(!this.loading){
                this.$emit('click', $event);
                this.$el.classList.add(this.$style['button--click'])
            }
        }
    },
}
</script>

<style lang="scss" module>
.button {
    border-radius: 9px;
    text-align: center;
    box-sizing: border-box;
    box-shadow: var(--main-shadow-color);
    transition: all .2s;
    position: relative;
    border: none;
    user-select: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);


    &-primary {
        background: var(--main-color-1);
        color: var(--main-bf-color6);  
    }

    &-secondary {
        background: var(--main-bf-color6);
        border: 2px solid var(--main-color-1);
        color: var(--main-color-1);
    }

    &[disabled] {
        background: var(--main-bf-color3);
        color: var(--main-bf-color6);
        border: none;
    }

    &-normal {
        padding: 15px 0;
        font-weight: bold;
        font-size: 16px;
        width: 100%;
    }

    &-small {
        padding: 8px 10px;
        font-weight: normal;
        font-size: 14px;
        border-width: 1px;
        border-radius: 2px;
    }

    &-flat {
        padding: 4px 10px;
        font-weight: normal;
        font-size: 14px;
        border-width: 1px;
        border-radius: 2px;
    }

    &-xss{
        padding: 4px 10px;
        font-size: 12px;
        border-width: 1px;
        border-radius: 8px;
        font-weight: normal;
    }
    &-overlay {
        background: rgba(0,0,0,0.2);
        color: #fff;
        border: 1px solid #fff;
    }

    &:focus{
        outline: none;
    }
    &:active{
        outline: none;
    }

    &::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 9px;
        opacity: 0;
        pointer-events: none;
        
        
    }
    &-primary::after {
        background: rgba(255, 255,255, 0.2);
    }
    &-secondary::after {
        background: var(--subtle-color-1); 
    }

    &--click::after {
        animation: anim-effect-boris .3s forwards;
    }

    &[no-border]{
        border: none;
    }
    .icon{
        font-size: 1.2em;
    }
}
.loading{
    position: absolute;
    left: 0px;
    top: 0px;
    stroke-dasharray: 50% 100%;
    stroke-dashoffset: 50%;
    animation: anim-boundrary 2s infinite;
}
@keyframes anim-effect-boris {
	0% {
        transform: scale3d(0.3, 0.3, 1);
	}
	25%, 50% {
        opacity: 1;
	}
	100% {
		opacity: 0;
        transform: scale3d(1, 1, 1);
	}
}
@keyframes anim-boundrary {
    0% {
        stroke-dashoffset: 50%;
    }
    100% {
        stroke-dashoffset: -100%;
    }
}
</style>