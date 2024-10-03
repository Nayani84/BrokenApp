const express = require('express');
const axios = require('axios');
const ExpressError = require("./expressError")

const app = express();
app.use(express.json());


app.post('/', async function (req, res, next) {
  try {
    if (!req.body.developers) throw new ExpressError('Developer username required', 400);

    // Make requests concurrently and wait for all to complete.
    const results = await Promise.all(req.body.developers.map(async (d) => {
      try {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return { name: response.data.name, bio: response.data.bio };
      } catch (err) {
        console.error(`Error fetching user ${d}: ${err.message}`);
        return { name: d, bio: 'User not found' };
      }
    })
    );

    return res.json(results);
  } catch (err) {
    next(err); // Pass any unexpected errors to the error handling middleware
  }
});


// 404 handler is no other next matches
app.use((req, res, next) => {
  const err = new ExpressError('Page Not Found', 404);
  next(err);
});

// General Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    Error: err.message,
  });
});


app.listen(3000, function (err) {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log('Server starting on port 3000');
  }
});