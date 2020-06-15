import $style from './jo-smart-list.scss';
const mix ={
    props: {
        items: {
            type: Array,
            required: true
        },
    }
}  
const EmptyList = {
    render(h){
        return h('div', this.$scopedSlots.noData ? this.$scopedSlots.noData() : 'Oops!')
    }
}
const UnorderedList = { 
    mixins: [mix],
    render(h) {
        const childrenFac = (item, idx) => {
            return h('li', this.$scopedSlots.default(item))
        }
        const children = this.items.map(childrenFac)
        return h('ul', {
            'class': [$style.normalizeList,  $style.unorderedList]
        }, children)
    }
}
const OrderedList = { 
    mixins: [mix],
    render(h) {
        const childrenFac = (item, idx) => {
            return h('li', [
                h('div', [h('span', `${idx}`)]),
                ...this.$scopedSlots.default(item)
            ])
        }
        const children = this.items.map(childrenFac)
        return h('ol', {
            'class': [$style.normalizeList, $style.orderlist]
        }, children)
    }
}
export default {
    functional: true,
    props: {
        items: {
            type: Array,
            required: true
        },
        isOrdered: Boolean
    },
    render: function (h, context) {
        function appropriateListComponent () {
            var items = context.props.items

            if (items.length === 0)           return EmptyList
            // if (typeof items[0] === 'object') return TableList
            if (context.props.isOrdered)      return OrderedList

            return UnorderedList
        }
        return h(
            appropriateListComponent(),
            {
                props: context.props,
                scopedSlots: context.scopedSlots,
            },
        )
    }
}