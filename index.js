const axios = require('axios');
const fs = require('fs');

class HackerEarth{
    constructor(init_obj={}){
        this.clientSecret = init_obj.clientSecret || process.env.HE_CLIENT_SECRET;
        this.lang = init_obj.lang?init_obj.lang:'JAVASCRIPT_NODE';
        this.memory_limit = init_obj.memory_limit?init_obj.memory_limit:262144;
        this.time_limit = init_obj.time_limit?init_obj.time_limit:5;
        this.callbackURL = init_obj.callback?init_obj.callback: null;
        this.CODE_EVALUATION_URL = 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/';      
    }

    execute(params,callback) {
        const data={};
        data.lang=params.lang?params.lang:this.lang;
        data.source=params.source || fs.readFileSync(params.sourceFile).toString();
        if(params.input || params.inputFile){
            data.input=params.input || fs.readFileSync(params.inputFile).toString();
        }
        data.memory_limit=params.memory_limit?params.memory_limit:this.memory_limit;
        data.time_limit=params.time_limit?params.time_limit:this.time_limit;
        const callbackURL=params.callbackURL?params.callbackURL:this.callbackURL;
        if(callbackURL){
            data.callback=callbackURL;
        }
        if(params.context){
            data.context=params.context;
        }

        const config={};
        config.url=this.CODE_EVALUATION_URL;
        config.method='post';
        config.responseType='json';
        config.headers={"client-secret":this.clientSecret,"Content-Type":'application/json'};
        // config.data=JSON.stringify(data);
        config.data=data;

        if(callback){
            axios(config)
            .then(response=>{
                callback(null,response);
            })
            .catch(err=>{
                callback(err);
            })
        }
        else{
            return axios(config);
        }
        
    }

    get_status(he_id,callback){
        const GET_STATUS_URL = this.CODE_EVALUATION_URL+he_id;
        const config={};
        config.responseType='json';
        config.headers={"client-secret":this.clientSecret};

        if(callback){
            axios.get(GET_STATUS_URL,config)
            .then(response=>{
                callback(null,response);
            })
            .catch(err=>{
                callback(err);
            })
        }
        else{
            return axios.get(GET_STATUS_URL,config);
        }
    }

    get_output(params,callback){
        const OUTPUT_URL = params.url;
        const config={};
        if(params.responseType){
            config.responseType='stream'
        }
        if(callback){
            axios.get(OUTPUT_URL,config)
            .then(response=>{
                callback(null,response);
            })
            .catch(err=>{
                callback(err);
            })
        }
        else{
            return axios.get(OUTPUT_URL,config);
        }
    }
}

module.exports = HackerEarth;