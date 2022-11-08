import axios from "axios";
import {defineStore} from "pinia";

export const internationalizationStore = defineStore('internationalization', {
    state: () => ({
        locales: []
    }),
    getters: {
        _locales: (state) => state.locales || [{abc: "abc"}],
    },
    actions: {
        async getLocales() {
            this.locales = (await axios.get('http://172.17.20.174:3001/api/admin/internationalization')).data;
        },
        async saveLocale(data){
            return (await axios.post('http://172.17.20.174:3001/api/admin/internationalization', data)).data;
        }
    }
})
