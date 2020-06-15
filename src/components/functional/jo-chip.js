import styles from './jo-chip.scss';
export default {
    functional: true,
    props: {
        type: {
            type: String,
            default: 'primary'
        }
    },
    render(createElement, context){
        let classNames = [styles["jo-chip"]];
        if(context.props.type === 'secondary'){
            classNames.push(styles["secondary"])
        }
        return createElement('span', {
            class: classNames,
        }, context.children)
    }
}