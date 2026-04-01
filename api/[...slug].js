import app from '../server/index.js';

export default function handler(req, res) {
  // Pass the request directly to the Express app
  return app(req, res);
}
