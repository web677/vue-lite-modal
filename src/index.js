import { render, h } from 'vue'
import Modal from './modal.vue'

const createElement = () => typeof document !== 'undefined' && document.createElement('div')

const mount = (component, { props, children, element, app } = {}) => {
    let el = element || createElement()

    let vNode = h(component, props, children)
    if (app && app._context) {
        vNode.appContext = app._context
    }

    render(vNode, el)

    const destroy = () => {
        if (el) {
            render(null, el)
        }
        el = null
        vNode = null
    }

    return { vNode, destroy, el }
}

Modal.install = (app) => {
    const methods = {
        open (options = {}) {
            return new Promise((resolve, reject) => {
                const _options = Object.assign({}, options, {
                    onClose: ({ action }) => {
                        resolve({ action })
                    }
                })
                mount(Modal, {
                    props: { ..._options }
                })
            })
        },
        alert (options = {}) {
            return this.open(Object.assign({
                showCancelButton: false
            }, options))
        },
        confirm (options = {}) {
            return this.open(Object.assign({
                showCancelButton: true
            }, options))
        }
    }
    app.$modal = methods
    app.config.globalProperties.$modal = methods
}

export { Modal }
export default Modal
