import joLoading from './jo-loading.vue';

modalInstance.$mount();
document.body.appendChild(modalInstance.$el);

export default {
  functional: true,

  render(h, context) {
    console.log(context.props.visible);
    Object.assign(modalInstance._props, context.props);
    modalInstance.$once("update:visible", (...args) => {
      context.listeners["update:visible"].apply(null, args);
    });
    modalInstance.$slots.default = context.slots().default;
    modalInstance.$forceUpdate();
    return null;
  }
};

export default {
    install(Vue){
        const SingletonModal = Vue.extend(joLoading);
        const instance = new SingletonModal();
        instance.$mount();
        document.body.appendChild(instance.$el);

        Vue.component()
    }
}