import axios from "axios";
import {defineStore} from "pinia";

export const mediaStore = defineStore('media', {
    state: () => ({
        files: []
    }),
    getters: {
        _files: (state) => state.files || []
    },
    actions: {
        async getFiles(){
            this.files = (await axios.get('http://172.17.30.86:3001/api/admin/media'))?.data
        },
        async sendFiles(formData){
            return await axios.post('http://172.17.30.86:3001/api/admin/media', formData)
        }
    }
})
