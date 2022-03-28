import Notification from './notification.vue';
import { createApp, h } from 'vue';

Notification.newInstance = properties => {
    const _props = properties || {};

    const Instance = createApp({
        render () {
            return h(Notification, Object.assign({
                ref: 'notification'
            }, _props));
        }
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    Instance.mount(container);
    const notification = Instance._instance.refs.notification;

    return {
        notice (noticeProps) {
            notification.add(noticeProps);
        },
        remove (name) {
            notification.close(name);
        },
        component: notification,
        destroy (element) {
            notification.closeAll();
            setTimeout(function() {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

export default Notification;
