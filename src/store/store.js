import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router'

Vue.use(Vuex);

const state={
    product : [],
    isShow: false
}

const mutations={
    addProduct(state,info){
        if(state.product.length < 2){
            state.product.push(info)
            console.log(state.product)
        }else {
            console.log('慢了')
        }
    },
    delectProduct(state){
        state.product = []
    },
    isShow(state, status){
        if(status == '0'){
            state.isShow = false
        }else if(status == '1'){
            state.isShow = true
        }
    },
    returnProductList() {
        let product = state.product
        router.push({
            // path: '/resultComparison'
        })
    }
}

const store = new Vuex.Store({
    state: state,
    mutations: mutations
})

export default store;