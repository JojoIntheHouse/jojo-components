import './base/global.css'
import joButton from './components/jo-button.vue'
import joInput from './components/jo-input.vue'
import joSearch from './components/jo-search.vue'
import joHeader from './components/jo-header.vue'
import joUpload from './components/jo-upload.vue'
import joRadio from './components/jo-radio.vue'
import joRadios from './components/jo-radios.vue'
import joSwitch from "./components/jo-switch.vue";
import joModal from './components/jo-modal.vue';
import joDrawer from './components/jo-drawer.vue';
import joEditCard from './components/jo-edit-card.vue';
import joSelect from './components/jo-select.vue';
import joChip from './components/functional/jo-chip.js'
import joFormList from './components/j-form-list/jo-form-list.vue';
import joFormListAddBtn from './components/j-form-list/jo-form-list-add-btn.vue';
import joFormInput from './components/j-form-list/jo-form-input.vue';
import joAutogrowTextarea from './components/jo-autogrow-textarea.vue';
import joLoading from './components/singleton/jo-loading.vue';
import joTabs from './components/jo-tab/jo-tabs.js';
import joTab from './components/jo-tab/jo-tab.vue';
import joList from './components/jo-list/jo-smart-list';
import joEmojiPanel from './components/j-emoji-select/jo-emoji-panel.vue';


import hammerTouch from './directive/hammer-touch.js'
export default {
    install(Vue, options){
        options = Object.assign({
            touchenable: false
        }, options || {})
        Vue.component('jo-button', joButton);
        Vue.component('jo-input', joInput);
        Vue.component('jo-search', joSearch);
        Vue.component('jo-header', joHeader);

        Vue.component('jo-modal', joModal);
        Vue.component('jo-drawer', joDrawer);
        Vue.component('jo-upload', joUpload);

        Vue.component('jo-radio', joRadio);
        Vue.component('jo-radios', joRadios);
        Vue.component('jo-switch', joSwitch);
        Vue.component('jo-edit-card', joEditCard);
        Vue.component('jo-select', joSelect)
        // Vue.prototype.$openModal = function() {
        //     joModal
        // }
        Vue.component('jo-emoji-panel', joEmojiPanel);

        Vue.component('jo-chip', joChip);
        Vue.component('jo-textarea', joAutogrowTextarea);
        Vue.component('jo-form-list', joFormList);
        Vue.component('jo-form-list-add-btn', joFormListAddBtn);
        Vue.component('jo-form-input', joFormInput);

        Vue.component('jo-tabs', joTabs);
        Vue.component('jo-tab', joTab);

        Vue.component('jo-list', joList);
        
        const joLoadingConstruction = Vue.extend(joLoading);
        const loadingInstance = new joLoadingConstruction().$mount();
        document.body.appendChild(loadingInstance.$el);
        Vue.$loading = loadingInstance;
        Vue.prototype.$loading = loadingInstance;

        Vue.use(hammerTouch, options)
    
    }
}