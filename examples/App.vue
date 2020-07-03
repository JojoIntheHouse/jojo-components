<template>
<div style="padding: 0 25px;">
    <jo-header title="Back to My Profile"></jo-header>
    <div :class="$style.linearLayout">
        <div>
            <jo-tabs>
                <jo-tab key="tab1" :selected="true">
                    Tab1
                    <jo-input title="Email Address" type="email" :value="address" placeholder="请输入邮箱" @change="address = $event" @blur="onInputBlur"></jo-input>
                </jo-tab>
                <jo-tab key="tab2" >
                    Tab2
                    <jo-radios groupname="fruit" v-model="fruit">
                        <jo-radio label="Apple" value="apple"></jo-radio>
                        <jo-radio label="Banana" value="banana"></jo-radio>
                        <jo-radio label="Watermelon" value="watermelon"></jo-radio>
                    </jo-radios>
                </jo-tab>
                <jo-tab key="tab3">
                    Tab3
                </jo-tab>
                <jo-tab key="tab4">
                    Tab4
                </jo-tab>
            </jo-tabs>
        </div>
        <jo-button @click="onClick" :loading="loading">Button</jo-button>
        <jo-button @click="onClick" :loading="loading" color="primary">按钮</jo-button>
        
        <jo-button size="small" @click="showDrawer = true" >click!</jo-button>
        <jo-button size="small" icon="plus-1">click!</jo-button>
        <jo-button size="small" icon="plus-1" plain @click="showLoading">click!</jo-button>
        <jo-button :disabled="true">click!</jo-button>
        <jo-input title="Email Address" type="email" v-model="address" placeholder="请输入邮箱"></jo-input>
        <jo-input title="Password" type="password" v-model="password" placeholder="请输入密码"></jo-input>
        <jo-edit-card title="Gallery">
            <jo-upload target="/upload"></jo-upload>
        </jo-edit-card>
        <div>
            <jo-upload target="/upload" :multiple="false" :noText="true"></jo-upload>
        </div>
        <div>
            <jo-chip>279 receipes</jo-chip>
            <jo-chip type="secondary">279 receipes</jo-chip>
        </div>
        <jo-radios groupname="fruit" v-model="fruit">
            <jo-radio label="Apple" value="apple"></jo-radio>
            <jo-radio label="Banana" value="banana"></jo-radio>
            <jo-radio label="Watermelon" value="watermelon"></jo-radio>
        </jo-radios>
        <div>
            <jo-radio :checked="true">Apple</jo-radio>
        </div>
        <div>
            <jo-switch v-model="state"></jo-switch>
        </div>
        <div>
            <jo-select :data="list" v-model="selected">
            </jo-select>
        </div>
        <div>
            <jo-select :data="data" v-model="selected">
                <span>暂无</span>
            </jo-select>
        </div>
        <div>
            <jo-form-list 
                :withIndex="true"
                v-model="formData" 
                :new-component="add"
                :formItemOptions="{placeholder: '请输入行程', type: 'text'}"
                >
                <span slot="addbtn">添加行程</span>
            </jo-form-list>
        </div>
        <div>
            <jo-search v-model="search"></jo-search>
            <jo-emoji-panel :search="search"  @change="onEmojiClick"></jo-emoji-panel>
        </div>
        <!-- <div>
            <jo-list :items="list">
                <div>xxx</div>
            </jo-list>
        </div> -->
        <!-- <div>
            <jo-list :items="list" isOrdered>
                <template v-slot:default="item">
                    {{ item }}{{ item }}{{ item }}{{ item }}{{ item }}{{ item }}
                </template>
                <template slot="noData">
                    no data!
                </template>
            </jo-list>
        </div>
        <jo-modal v-model="show">
            <div slot="title">
                Save to
            </div>
            <div>
                xxxxxx
            </div>
        </jo-modal>
        <jo-drawer v-model="showDrawer">
            <div slot="title">
                Save to
            </div>
            <div>
                <jo-input title="Email Address" type="email" :value="address" placeholder="请输入邮箱" @change="address = $event" @blur="onInputBlur"></jo-input>  
            </div>
        </jo-drawer> -->
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            search: '',
            address: '',
            password: '',
            loading: false,
            show: false,
            fruit: 'apple',
            state: false,
            showDrawer: false,
            selected: undefined,
            list: [
                { value: 'a', text: 'A'},
                { value: 'b', text: 'B'},
                { value: 'c', text: 'C'},
            ],
            data: [],
            formData: [],
            formDataIdx: 0,
        }
    },
    watch: {
        fruit(val){
            console.log(val)
        },
        address(val){
            console.log(val);
        }
    },
    methods: {
        onClick(){
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.show = true;
            }, 1000);
        },
        add(){
            return {
                component: 'jo-form-input',
                name: `${this.formDataIdx++}`,
                value: '',
                title: '编辑行程'
            }
        },
        showLoading(){
            this.$loading.show();
            // setTimeout(() => {
            //     this.$loading.hide();
            // }, 1000);
        },
        onInputBlur(value){
            console.log(value)
        },
        onEmojiClick(emoji){
            console.log(emoji)
        }
    }
}
</script>

<style lang="scss" module>
.linearLayout {
    padding: 20px 0;
}
.linearLayout > *{
    margin-bottom: 20px;
}
</style>