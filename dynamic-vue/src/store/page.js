import axios from "axios";
import {defineStore} from "pinia";

export const pageStore = defineStore('page', {
    state: () => ({
        collectionTypePages: [],
        singleTypePages: []
    }),
    actions: {
        async getCollectionTypePages(){
            this. (await axios.get('http://172.17.20.174:3001/api/builder/getPages'))?.data;
        }
    }
})
