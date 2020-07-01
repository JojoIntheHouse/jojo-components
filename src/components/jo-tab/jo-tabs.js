import $style from './jo-tabs.scss'
import tabTransition from './tab-transition.vue'

function pruneCacheEntry(cache, key){
    const cached = cache[key]
    cached.componentInstance.$destroy()
    cache[key] = null
}
export default {
    components: {
       'tab-transition': tabTransition
    },
    name: 'jo-tabs',
    computed: {
        tabs(){
            return this.$slots.default.filter( node => {
                return /jo\-tab/.test(node.tag)
            })
        }
    },
    data(){
        return {
            lastView: null,
            currentView: 0,
            tabindex: 0,
            orientation: 'right',
        }
    }, 
    created () {
        this.cache = this.$slots.default;
    },
    methods: {
        selectTab(tab) {
            return (e) => {
                let currIndex = this.currentView
                this.lastView = currIndex
                let index = this.cache.indexOf(tab)
                this.tabindex = this.tabs.indexOf(tab)
                this.orientation = currIndex > index ? 'left': 'right';
                this.currentView = index;
            }
        },
        extractData(vnode){
            return vnode.data
        },
        renderHeaders(h){
            return this.tabs.map( (tab, idx) => {
                const name = this.extractData(tab).key
                const clickHanlder = this.selectTab(tab);
                return h('a', {
                    'class': {
                        [$style.tab]: true,
                        [$style.active]: this.tabindex === idx,
                        [$style.last]: idx === this.tabs.length-1
                    },
                    attrs: {
                        href: '#',
                    },
                    directives: [
                        {
                            name: 'tap',
                            value: clickHanlder,
                        }
                    ],
                    on:{
                        click: clickHanlder
                    }
                }, name)
            });
        },
        renderItems(h){
            return this.tabs.map(( tab, idx ) => {
                return h('tab-transition', 
                    {
                        props: {
                            direction: this.orientation,
                            isShow: this.tabindex === idx,
                            isOverLap: this.tabindex === idx,
                        },
                    }, 
                    [ tab ]);  
            })
        },
    },
    destroyed () {
        for (const key in this.cache) {
            pruneCacheEntry(this.cache, key)
        }
    },
    render(h){

        const underline = h('div', {
            'class': [ $style.underline ], 
            style: {
                width: `${(1/this.tabs.length * 100)}%`,
                transform: `translateX(${100 * this.tabindex}%)`
            }
        })
        
        
        let head = h('div', {
            'class': [$style.grow]
        }, [
            ...this.renderHeaders(h),
            underline
        ])

        const vnode = h('div',[
            head, 
            h('div',
                {
                    'class': [$style.container],
                },
                this.renderItems(h),
            )
        ]);
        vnode.data = {
            keepAlive: true
        }
        return vnode;
    }
}
