const HackerEarth = require('../index');
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// To test get_status
const he_id='he_id_returned_when_code_executed';

// To test get_output
const output_url='output_url_received_after_execution_completes';

const timeout=10000;

const clientSecret=process.env.HE_CLIENT_SECRET || 'YOUR_HACKEREARTH_CLIENT_SECRET';
const callbackURL='http://requestbin.net/YOUR_BIN' ; // You can use requestbin.net for testing

describe('execute function using callback',function () {
    describe('passing client secret during initialization & passing source string only during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a he_id",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            const source="console.log('Hello HackerEarth')";
            HE.execute({source:source},(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data.he_id,"response data should have a he_id");
                    done();
                }
            })
        })      
    });

    describe('passing client secret during initialization; passing source string & language during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a he_id",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            const source="console.log('Hello HackerEarth')";
            HE.execute({source:source,lang:'JAVASCRIPT_NODE'},(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data.he_id,"response data should have a he_id");
                    done();
                }
            })
        })      
    });

    describe('passing client secret during initialization; passing source string, lang, memory_limit,time_limit,input, callbackURL during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a he_id",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            const source="console.log('Hello HackerEarth')";
            HE.execute({
                source:source,
                lang:'JAVASCRIPT_NODE',
                input:'',
                memory_limit:10000,
                time_limit:2,
                callbackURL:callbackURL
                },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data.he_id,"response data should have a he_id");
                    done();
                }
            })
        })      
    });

    describe('passing client secret during initialization; passing source string, lang, memory_limit,time_limit,input, context during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a context",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            const source="console.log('Hello HackerEarth')";
            HE.execute({
                source:source,
                lang:'JAVASCRIPT_NODE',
                input:'',
                memory_limit:10000,
                time_limit:2,
                context:'hackerearth-v4-node'
                },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.equal('hackerearth-v4-node',response.data.context,"response data should have context 'hackerearth-v4-node'");
                    done();
                }
            })
        })      
    });

    describe('passing client secret during initialization; passing source string (this time C++), lang, memory_limit,time_limit,input, callbackURL during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a he_id",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            const source=`
                #include<iostream>
                using namespace std;
                int main(){
                    int x,y;
                    cin>>x>>y;
                    cout<<x+y<<endl;
                    return 0;
                }
            `;
            const input=`2
                3`;
            HE.execute({
                source:source,
                lang:'CPP',
                input:input,
                memory_limit:10000,
                time_limit:2,
                callbackURL:callbackURL
                },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data.he_id,"response data should have a he_id");
                    done();
                }
            })
        })      
    });

    describe('passing client secret during initialization; passing source file ( C++), lang, memory_limit,time_limit,input file (txt), callbackURL during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a he_id",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            HE.execute({
                sourceFile:path.join(__dirname,'add.cpp'),
                lang:'CPP',
                inputFile:path.join(__dirname,'input.txt'),
                memory_limit:10000,
                time_limit:2,
                callbackURL:callbackURL
                },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data.he_id,"response data should have a he_id");
                    done();
                }
            })
        })      
    });

    describe('passing client secret,lang, memory_limit,time_limit, callbackURL during initialization; passing source string (this time C++),input during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a he_id",function (done) {
            const HE = new HackerEarth({
                clientSecret:clientSecret,
                memory_limit:10000,
                time_limit:2,
                callbackURL:callbackURL,
                lang:'CPP'
            });
            const source=`
                #include<iostream>
                using namespace std;
                int main(){
                    int x,y;
                    cin>>x>>y;
                    cout<<x+y<<endl;
                    return 0;
                }
            `;
            const input=`2
                3`;
            HE.execute({
                source:source,
                input:input,
                },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data.he_id,"response data should have a he_id");
                    done();
                }
            })
        })      
    });

    describe('NOT passing client secret during initialization; passing source string, lang, memory_limit,time_limit,input, callbackURL during execute',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have a he_id",function (done) {
            const HE = new HackerEarth();
            const source="console.log('Hello HackerEarth')";
            HE.execute({
                source:source,
                lang:'JAVASCRIPT_NODE',
                input:'',
                memory_limit:10000,
                time_limit:2,
                callbackURL:callbackURL
                },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data.he_id,"response data should have a he_id");
                    done();
                }
            })
        })      
    });
})

describe('execute function using promise',function () {
    describe('passing client secret during initialization; passing source string, lang, memory_limit,time_limit,input, callbackURL during execute',function () {
                this.timeout(timeout);
                it("should return a 200 OK response & should have a he_id",function () {
                    const HE = new HackerEarth({'clientSecret':clientSecret});
                    const source="console.log('Hello HackerEarth')";
                    return HE.execute({
                        source:source,
                        lang:'JAVASCRIPT_NODE',
                        input:'',
                        memory_limit:10000,
                        time_limit:2,
                        callbackURL:callbackURL
                        })
                        .then((response)=>{
                            assert.equal(200,response.status);
                            assert.ok(response.data.he_id,"response data should have a he_id");
                        })
                })      
            });
    
})

describe('get_status function using callback',function () {
    this.timeout(timeout);
    it("should return a 200 OK response & should have a he_id",function (done) {
        const HE = new HackerEarth({'clientSecret':clientSecret});
        HE.get_status(he_id,(err,response)=>{
            if(err){
                done(err);
            }
            else{
                assert.equal(200,response.status);
                assert.ok(response.data.result,"response data should have a result property");
                assert.ok(response.data.request_status,"response data should have a request_status");
                done();
            }
        })
    })
})

describe('get_status function using promise',function () {
    this.timeout(timeout);
    it("should return a 200 OK response & should have a he_id",function () {
        const HE = new HackerEarth({'clientSecret':clientSecret});
        return HE.get_status(he_id).then((response)=>{
                assert.equal(200,response.status);
                assert.ok(response.data.result,"response data should have a result property");
                assert.ok(response.data.request_status,"response data should have a request_status");
        })
    })
})

describe('get_output function using callback',function () {
    describe('json output',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have response.data",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            HE.get_output({
                url:output_url
            },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    assert.ok(response.data,"response data should have a result property");
                    assert.equal(5,response.data,"data is 5 in this particular case");
                    done();
                }
            })
        })       
    })

    describe('stream output',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & since response.data is stream, should be able to save to file",function (done) {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            HE.get_output({
                url:output_url,
                responseType:'stream'
            },(err,response)=>{
                if(err){
                    done(err);
                }
                else{
                    assert.equal(200,response.status);
                    const writer = fs.createWriteStream('testoutput')
                    response.data.pipe(writer);
                    writer.on('error',(err)=>{
                        fs.unlinkSync('testoutput');
                        done(err);
                    })
                    writer.on('finish',()=>{
                        const output=fs.readFileSync('testoutput').toString();
                        assert.equal('5\n',output);
                        fs.unlinkSync('testoutput');
                        done();
                    })
                }
            })
        })       
    })
})

describe('get_output function using promise',function () {
    describe('json output',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & should have response.data",function () {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            return HE.get_output({
                url:output_url
                })
                .then((response)=>{
                        assert.equal(200,response.status);
                        assert.ok(response.data,"response data should have a result property");
                        assert.equal(5,response.data,"data is 5 in this particular case");
                })
        })       
    })

    describe('stream output',function () {
        this.timeout(timeout);
        it("should return a 200 OK response & since response.data is stream, should be able to save to file",function () {
            const HE = new HackerEarth({'clientSecret':clientSecret});
            return HE.get_output({
                    url:output_url,
                    responseType:'stream'
                })
                .then((response)=>{
                    assert.equal(200,response.status);
                    const writer = fs.createWriteStream('testoutput')
                    response.data.pipe(writer);
                    writer.on('error',(err)=>{
                        fs.unlinkSync('testoutput');
                        throw err;
                    })
                    writer.on('finish',()=>{
                        const output=fs.readFileSync('testoutput').toString();
                        assert.equal('5\n',output);
                        fs.unlinkSync('testoutput');
                    })
                })
        })       
    })
})