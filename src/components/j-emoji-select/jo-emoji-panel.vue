<template>
    <div>
        <div v-for="c in categorieList" :key="c">
            <h2>{{c}}</h2>
            <div :class="$style.emojiContainer">
                <span v-for="emo in emojiList[c]" :key="emo.id" 
                    @click.prevent="() => onClick(emo.unified)"
                    v-tap="() => onClick(emo.unified)">
                    <span>
                        {{ emo.unified}}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { appleEmojiMap, categories } from './data/data'
const debounce = (func, delay) => {
    let inDebounce
    return function() {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}
export default {
    props: {
        search: String
    },
    data(){
        return {
            categorieList: categories,
            emojiList: appleEmojiMap,
            timeout: null,
            throttleSearch: debounce(this.onSearch, 250)
        }
    },
    watch: {
        search(){
           this.throttleSearch();
        }
    },
    methods: {
        onSearch(){
            if(!this.search) {
                this.categorieList = categories;
                this.emojiList = appleEmojiMap;
            } else {
                const categorieSet = new Set();
                const filteredEmojis = Object.values(appleEmojiMap).map(l => l.filter(emoji => {
                    const contain = emoji.search.includes(this.search);
                    if(contain){
                        categorieSet.add(emoji.category)
                    }
                    return contain;
                }));
                const p = {};
                Object.keys(appleEmojiMap).forEach((k, idx) => {
                    p[k] = filteredEmojis[idx];
                })
                console.log(p)
                this.emojiList = p;
                this.categorieList = Array.from(categorieSet)
            }
        },
        onClick(emoji){
            this.$emit('change', emoji)
        }
    }
}
</script>

<style lang="scss" module>
.emojiContainer{
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    font-size: 24px;
}
.emojiContainer > span {
    display: inline-block;
    padding: 6px;
}
.emojiContainer > span > span{
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 1.15;
}
</style>