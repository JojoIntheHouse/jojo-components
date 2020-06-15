export default {
    props: {
        value: String,
        idx: Number,
        title: String,
        formItemOptions: {
            type: Object,
            default: () => {},
        },
        mode: {
            type: String,
            default: 'view',
        }
    },
}