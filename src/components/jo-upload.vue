<template>
    <div class="form-item" @click="openFileExplore" v-tap="openFileExplore">
        <i :class="loading ? 'icon-spin2 animate-spin' :'icon-plus-1'"></i>
        <slot></slot>
        <span v-if="!noText" :class="$style.tip">上传图片或打开相机</span>
        <input ref="file" style="display: none;" :accept="fileAccept" type="file" :name="uploadName" @change="onFileChange" :multiple="multiple">
        <span :class="$style.progress" :style="`width: ${progress}%`" :isError="isError"></span>
    </div>
</template>

<script>
export default {
    name: 'jo-upload',
    props: {
        target: {
            type: String
        },
        action: {
            type: String,
            default: 'POST'
        },
        alias: {
            type: String
        },
        accept: {
            type: String,
            default: 'image',
        },
        uploadName: {
            type: String,
            default: 'fileUpload'
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        noText: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            loading: false,
            progress: 0,
            isError: false,
            response: undefined,
        }
    },
    computed: {
        fileAccept(){
            return "audio/*|video/*|image/*|MIME_type" 
        }
    },
    watch: {
        progress(val){
            console.log(val)
        }
    },
    methods: {
        openFileExplore(){
            this.$refs.file.click()
        },
        emitter (event, data) {
            this.$emit(event, data)
        },
        uploadProgress (oEvent) {
            let vm = this
            if (oEvent.lengthComputable) {
                let percentComplete = Math.round(oEvent.loaded * 100 / oEvent.total)
                this.$nextTick(() => vm.progress = percentComplete);
            } else {
                // Unable to compute progress information since the total size is unknown
                vm.progress = undefined;
            }
        },
        onFileChange (e) {
            let vm = this
            if (!this.target || this.target === '') {
                console.log('Please provide the target url')
            } else if (!this.action || this.action === '') {
                console.log('Please provide file upload action ( POST / PUT )')
            } else if (this.action !== 'POST' && this.action !== 'PUT') {
                console.log('File upload component only allows POST and PUT Actions')
            } else {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) {
                    return
                };
                let formData = new FormData()
                Array.prototype.forEach.call(files, (file, idx) => {
                    formData.append(`${this.uploadName}[]`, file)
                });
                
                var xhr = new XMLHttpRequest()
                xhr.open(this.action, this.target)
                // xhr.setRequestHeader("X-XSRF-TOKEN", vm.getCookie('XSRF-TOKEN'));
                xhr.onloadstart = function (e) {
                    vm.loading = true;
                    vm.progress = 0;
                    vm.isError = false;
                }
                xhr.onloadend = function (e) {
                    vm.$emit('uploaded', JSON.parse(e.target.response));
                    vm.loading = false;
                    setTimeout(() => {
                        vm.progress = 0;
                    }, 1000);
                }
                xhr.onerror = function (e) {
                    console.log(e)
                    vm.loading = false;
                    vm.progress = 100;
                    vm.isError = true;
                    setTimeout(() => {
                        vm.progress = 0;
                    }, 1000);
                }
                xhr.upload.onprogress = vm.uploadProgress
                xhr.send(formData)
            }
        }
    }
    
}
</script>

<style lang="scss" module>
.progress{
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    border-radius: 9px;
    background: var(--subtle-color-1);
    transition: .3s all;
    width: 0;

    &[isError]{
        background: var(--subtle-color-2);
    }
}
.tip{
    text-indent: .5em;
    display: inline-block;
}
</style>