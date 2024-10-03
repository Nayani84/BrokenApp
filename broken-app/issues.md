# Broken App Issues

- Wrong variable declarations.
* let axios = require('axios');
    * Changed to ```const axios = require('axios');```
* var app = express();
    * Changed ```const app = express();```


- didn't use middleware to parse the incoming JSON body.
    * Added ```app.use(express.json());```


- Code used map with async functions without properly awaiting the promises, leading to an array of unresolved promises.
    * Used ```await Promise.all(...)```


- Response is sent before the asynchronous calls have completed.
    

- The catch block should include the err parameter to properly handle and log the error.
    * Added ```catch (err)``


- Didn't handle cases where a user may not exist (404 errors) or other potential API errors.