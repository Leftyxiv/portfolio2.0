import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('dist/client'));

// Use Astro's SSR handler
app.use(ssrHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});