
import Lang from '../locales';

class I18nTools{
    constructor (lang = 'zh-CN') {
        this.lang = lang;
        this.langPkg = Lang[lang];
    }
    
    getLang() {
        return this.lang;
    }

    changeLang(lang){
        this.lang = lang;
        this.langPkg = Lang[lang];
    }

    getKey(key) {
        return this.langPkg[key];
    }

    getAllCommon(){
        const common = {};
        Object.keys(this.langPkg).forEach(key => {
            if(typeof this.langPkg[key] === 'string') {
                common[key] = this.langPkg[key];
            }
        });
        return common;
    }

    getModule(moduleName){
        return this.langPkg[moduleName] || {};
    }
}

export default new I18nTools();