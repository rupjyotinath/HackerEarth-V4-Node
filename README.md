# HackerEarth-V4-Node
> Node.js client library / wrapper for the HackerEarth API (Version 4)

Check the HackerEarth API (v4) [here](https://www.hackerearth.com/docs/wiki/developers/v4/).

Register your client & api key [here](http://www.hackerearth.com/api/register/).

A quick intro of HackerEarth API from their docs,

*"The API provides endpoints for compiling and running code in several languages. It can be accessed via an API key-based authorization process.*

## Introduction
The library takes care of the API requests, all you have to do is call the functions with desired configuration & work with the responses.

All the three functions are asynchronous.

**It supports both callbacks & promises.**

Callbacks are error first.

## Installation
Make sure to have npm installed.

To install,
```bash
npm i hackerearth-v4-node
```

## Quick Usage
Execution using callbacks,
```javascript
const HackerEarth=require('hackerearth-v4-node');
const HE = new HackerEarth({'clientSecret':'YOUR_CLIENT_SECRET'});
const source="console.log('Hello HackerEarth')";
HE.execute({
        source:source
    },(err,response)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(response.data);
        }
     }
)
```
Note that in above code, language is not passed because by default the language is set to JAVASCRIPT_NODE. Check the documentation below for fully understanding the configs & defaults.

Using promises, (a different example)
```javascript
const HackerEarth=require('hackerearth-v4-node');
const HE = new HackerEarth({'clientSecret':'YOUR_CLIENT_SECRET'});
const source="console.log('Hello HackerEarth')";
HE.execute({
        source:source,
        lang:'JAVASCRIPT_NODE',
        input:'',
        memory_limit:10000,
        time_limit:2,
        callbackURL:'YOUR_CALLBACK_URL'
    })
    .then((response)=>{
        console.log(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
```

**async/await can also be used similar to how it is used for any other promise.**

## Documentation
### Initialization
The library exposes a class, so first need to create an instance/object.

An object can be passed as initialization parameters.

```javascript
const HackerEarth=require('hackerearth-v4-node');
const HE = new HackerEarth({'clientSecret':'YOUR_CLIENT_SECRET'});
```
Can be created with empty parameters.
```javascript
const HE = new HackerEarth();
```
**If the clientSecret is not passed, the library looks for the ENVIRONMENT VARIABLE named HE_CLIENT_SECRET . Set the secret in this environment variable.**

Other parameters that can be passed while creating the object are,
* lang : If not passed, will be set to JAVASCRIPT_NODE
* memory_limit : If not passed, will be set to 262144
* time_limit : If not passed, will be set to 5
* callbackURL : Will be set to null if not passed

**For any subsequent 'execute' function calls, if the above parameters are not passed in each call, the values set during initialization will work as defaults.**

Here is another initialization example,
```javascript
const HE = new HackerEarth({
                clientSecret:'YOUR_SECRET',
                memory_limit:10000,
                time_limit:2,
                callbackURL:'YOUR_CALLBACK',
                lang:'CPP'
            });
```

### Execution
The **execute** method is used to submit code to HackerEarth for evaluation.

Note that HackerEarth API (v4) provides only one endpoint for both compilation & execution. So submitting the code once is enough to get both compilation result & running/execution result.

Below provided is the general syntax for calling the execute method.

For callbacks,

```javascript
HE.execute(config,(err,response)=>{
                if(err){
                    // Handle error
                }
                else{
                    // console.log(response.data)
                }
            })
```

For promises,
```javascript
HE.execute(config)
    .then((response)=>{
        // console.log(response.data)
    })
    .catch((err)=>{
        // Handle error
    })
```

The config is an object in which the following properties can be passed: source, lang, input, memory_limit, time_limit, context & callbackURL . *The meaning of these are self explanatory or can be found in HE API docs.*

**Any value that is passed in execute method will be used while making API request rather than the default values set during initialization**, however, the defaults will not be replaced. So, further execute calls without some config values will use the defaults.

Here is an example of config object,
```javascript
{
    source:source,
    lang:'JAVASCRIPT_NODE',
    input:'',
    memory_limit:10000,
    time_limit:2,
    callbackURL:callbackURL
}
```
source is the actual source code in string.

**The library also supports two other parameters: sourceFile & inputFile** .Both must be absolute paths & not relative. If these are provided instead of source & input strings, the library will read the files & convert to string (utf-8) before making request.

Here is an example using callback,
```javascript
HE.execute({
                sourceFile:path.join(__dirname,'add.cpp'),
                lang:'CPP',
                inputFile:path.join(__dirname,'input.txt'),
                memory_limit:10000,
                time_limit:2,
                callbackURL:'YOUR_CALLBACK_URL'
            },(err,response)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(response.data);
                }
            })
```
The files add.cpp & input.txt are in test directory, used for testing.

### Getting execution status
The method **get_status** is to get the current execution status from HackerEarth.

Using callback,
```javascript
HE.get_status(he_id,(err,response)=>{
            if(err){
                // Handle error
            }
            else{
                // console.log(response.data)
            }
        })
```
**he_id** is the id (string) provided by HackerEarth when a code is submitted for evaluation. In short, it will be returned in the response of **execute** method.

Using promise,
```javascript
HE.get_status(he_id)
    .then((response)=>{
        // console.log(response.data)
    })
    .catch((err)=>{
        // Handle error
    })
```

### Getting output
The **execution** & **get_status** methods corresponds to two endpoints that HE provides.

HE returns a output url after execution of code is completed to get the actual output of a particular source code. The library provides the method **get_output** to get the actual output.

Here is the general syntax of callback,
```javascript
HE.get_output(config,callback)
```
The config is an object in which two parameters can be passed: url & responseType

**The resonseType is checked for a truthy value. If true , the response type will be set to 'stream' . By default , it gives response.data in json.**

Here are examples using callback,

json output
```javascript
HE.get_output({
                url:'HE_OUTPUT_URL'
            },(err,response)=>{
                if(err){
                    // Handle error
                }
                else{
                    // console.log(response.data)
                }
            })
```
stream output
```javascript
HE.get_output({
        url:'HE_OUTPUT_URL',
        responseType:'stream'
    },(err,response)=>{
        if(err){
            // Handle error
        }
        else{
            // response.data is a stream
            // response.data.pipe(fs.createWriteStream('testoutput'))
        }
})
```

Using promise,

json output
```javascript
HE.get_output({
                url:'HE_OUTPUT_URL'
            })
            .then((response)=>{
               // console.log(response.data)
            })
            .catch((err)=>{
                // Handle error
            })
```

stream output
```javascript
HE.get_output({
                url:'HE_OUTPUT_URL',
                responseType:'stream'
            })
            .then((response)=>{
                // response.data is a stream
                // response.data.pipe(fs.createWriteStream('testoutput'))
            })
            .catch((err)=>{
                // Handle error
            })
```

### Understanding the response
The library uses [axios](https://www.npmjs.com/package/axios) for making the requests & returns the axios response directly. **Responses are in json**.

Here is the response schema taken from axios npm docs,

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```
**So, response.data will be the HackerEarth provided data.**

Here is a response taken from HackerEarth, it is the **response.data** that you will get on calling the **execute** method,

```javascript
{
    "request_status": {
        "message": "Your request has been queued in the evaluation pipeline",
        "code": "REQUEST_QUEUED"
    },
    "he_id": "6438b9a6-d5c0-4960-9049-b21a35f0bdb0",
    "result": {
        "run_status": {
            "status": "NA"
        },
        "compile_status": "Compiling..."
    },
    "context": "{‘id’: 213121}",
    "status_update_url": "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/6438b9a6-d5c0-4960-9049-b21a3zz5f0bdb0/"
}
```


## Credits
[axios](https://www.npmjs.com/package/axios)- Promise based HTTP client for the browser and node.js

[mocha](https://www.npmjs.com/package/mocha)- simple, flexible, fun javascript test framework for node.js & the browser (For testing)

[dotenv](https://www.npmjs.com/package/dotenv)-Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env (Used for development)

## LICENSE
(C) 2020 Rupjyoti Nath

The source code is licensed under MIT LICENSE, check the LICENSE file in source.

The library uses axios for making requests. Here is the LICENSE of axios (MIT LICENSE),

Copyright (c) 2014-present Matt Zabriskie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.