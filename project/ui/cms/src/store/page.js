import axios from "axios";
import {defineStore} from "pinia";

export const pageStore = defineStore('page', {
    state: () => ({
        collectionTypePages: [],
        singleTypePages: []
    }),
    getters: {
        _collectionTypePages: (state) => state.collectionTypePages || [],
        _singleTypePages: (state) => state.singleTypePages || [],
    },
    actions: {
        async getSingleTypePages(){
            this.singleTypePages = (await axios.get('http://172.17.20.174:3001/api/admin/page/all', { params: {pageType : "singleType"} }))?.data;
        },
        async getCollectionTypePages(){
            this.collectionTypePages = (await axios.get('http://172.17.20.174:3001/api/admin/page/all', { params: {pageType : "collectionType"} }))?.data;
        }
    }
})
