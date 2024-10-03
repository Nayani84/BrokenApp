### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  * Managing asynchronous code in **JavaScript** provides most common three methods : 
    1. **Callbacks**: Functions are passed as arguments to other functions and are executed after the completion of the asynchronous operation.
    2. **Promises**: A promise represents a value that may be available now, or in the future, or never. Promises have three states: pending, fulfilled, or rejected.
    3. **async/await** : async functions enable the use of await, allowing asynchronous code. 


- What is a Promise?
  * A **Promise** in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
  * A promise can be in one of three states: 
    * **Pending**: The initial state, neither fulfilled nor rejected.
    * **Resolved** : The operation completed successfully, resulting in a value.
    * **Rejected**: The operation failed, resulting in a reason for the failure (usually an error).


- What are the differences between an async function and a regular function?
  * **Async functions** in JavaScript provide a way to work with asynchronous code in a more manageable and readable manner compared to **regular functions**.
    1. * **Async Function**:Always returns a promise.
     * **Regular Function**: Returns the value directly.
    2. * **Async Function**: Can use the await keyword to pause execution until a promise is resolved or rejected. This allows for writing asynchronous code that looks synchronous, improving readability.
     * **Regular Function**: Cannot use await unless the function is declared as async. If you try to use await in a regular function, it will result in a syntax error.
    3. * **Async Function**: Can use try/catch blocks to handle errors from awaited promises. This leads to cleaner error handling.
     * **Regular Function**: Error handling needs to be done through traditional means (e.g., using callbacks or .then().catch() for promises).


- What is the difference between Node.js and Express.js?
  * **Node.js** is a runtime environment that allows running JavaScript on the server side, while **Express.js** is a web framework built on top of Node.js that simplifies building web applications and APIs.


- What is the error-first callback pattern?
  * **The error-first pattern** consists of executing a function when the asynchronous operation ends which takes as first argument an error, if one occurred, and the result of the request as extra arguments.


- What is middleware?
  * It is code that runs in the middle of the request / response cycle!
  *	In Express, **middleware** are functions that get access to the req and res objects and can also call the next function.


- What does the `next` function do?
  * The **next** function in Express.js middleware is a vital mechanism for controlling the flow of the request-response cycle. It allows middleware functions to pass control to subsequent middleware or route handlers, enabling a modular and organized approach to handling requests in a web application.


- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
  * **Performance Issues** - Sequential Requests: The code makes three asynchronous requests sequentially.
    * Can use `Promise.all` to fetch all users concurrently.
  * **Lack of Error Handling** : The function does not handle any potential errors that might occur during the API calls. If any of the requests fail, it will result in an unhandled promise rejection.
    * Can Add a `try/catch` block to handle errors gracefully.
  * **Variable Naming** : The variable names.
    * Can consider using an array of usernames or more descriptive variable names(elie,  joelburton,  mmmaaatttttt).
  * **Hardcoded URLs** : The usernames are hardcoded into the function, which makes it inflexible.
    * Can pass the usernames as parameters to the function.
