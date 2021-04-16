<template>
    <div :class="['vue-lite-modal', customClass]">
        <div :class="['modal-main', { hidden: !active }]">
            <p class="modal-title" v-if="title">{{ title }}</p>
            <div class="modal-content" v-html="content"></div>
            <div class="modal-btns">
                <a
                    v-if="showCancelButton"
                    href="javascript:void(0);"
                    class="modal-btn"
                    data-action="cancel"
                    @click="close"
                    >{{ cancelButtonText }}</a
                >
                <a
                    href="javascript:void(0);"
                    class="modal-btn"
                    data-action="confirm"
                    @click="close"
                    >{{ confirmButtonText }}</a
                >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            active: false
        }
    },
    props: {
        title: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: true
        },
        customClass: {
            type: String,
            default: ''
        },
        showCancelButton: {
            type: Boolean,
            default: true
        },
        cancelButtonText: {
            type: String,
            default: 'Cancel'
        },
        confirmButtonText: {
            type: String,
            default: 'Confirm'
        },
        onClose: {
            type: Function,
            default: () => { }
        }
    },
    methods: {
        show () {
            this.addElement()
            this.active = true
        },
        addElement () {
            document.body.appendChild(this.$el)
        },
        destroyElement () {
            setTimeout(() => {
                this.$el.parentNode.removeChild(this.$el)
            }, 300)
        },
        close (e) {
            const { action = 'confirm' } = e.target.dataset
            this.active = false
            this.destroyElement()
            this.onClose({ action })
        }
    },
    mounted () {
        this.show()
    }
}
</script>
<style lang="less" scoped>
html {
    font-size: 50px;
}

.vue-lite-modal {
    position: fixed;
    display: flex;
    width: 100%;
    width: 100vw;
    height: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    .modal-main {
        display: block;
        width: 6rem;
        padding: 0.2rem 0 0;
        border-radius: 0.2rem;
        box-sizing: border-box;
        background: #fff;
        font-size: 0.26rem;
        transform: translateY(-0.4rem);
        animation: slideUp 0.3s ease forwards;
        text-align: center;
        &.hidden {
            animation: slideDown 0.25s ease forwards;
        }
        .modal-title {
            line-height: 0.45rem;
            margin: 0.2rem auto;
            font-size: 0.32rem;
            color: #111;
        }
        .modal-content {
            margin: 0.3rem 0.5rem 0.5rem;
            line-height: 0.4rem;
            font-size: 0.28rem;
            text-align: left;
            color: #111;
        }
        .modal-title + .modal-content {
            line-height: 0.37rem;
            font-size: 0.26rem;
        }
        .modal-btns {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid #ebebeb;
            border-top-width: 0.7px;
            .modal-btn {
                display: block;
                flex: 1;
                line-height: 0.87rem;
                border-right: 1px solid #ebebeb;
                border-right-width: 0.7px;
                font-size: 0.32rem;
                color: #999;
                &:last-child {
                    border: 0;
                    color: #fd4700;
                    font-weight: 500;
                }
            }
        }
    }
}
@keyframes slideUp {
    to {
        transform: translateY(0);
    }
}
@keyframes slideDown {
    from {
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-0.4rem);
    }
}
</style>
