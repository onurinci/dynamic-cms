const mongoose = require("mongoose");
const { InternationalizationService } = require("./../modules/internationalization/services");

const internationalizationService = new InternationalizationService();
class SeedDataService {

    // language seed control
    async language() {
        const data = await internationalizationService.getAll();
        if (!data || data.length < 1) {
            // en
            await internationalizationService.create({
                locale: 'en',
                name: 'English',
                isDefault: 'true'
            })            
            // tr
            await internationalizationService.create({
                locale: 'tr',
                name: 'Türkçe',
                isDefault: 'false'
            })
            console.log("seed [languages] completed...");
        }
    }

}

module.exports = SeedDataService;