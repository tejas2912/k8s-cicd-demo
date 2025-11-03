const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Student Dashboard!</h1><p>Deployed using Jenkins CI/CD on Kubernetes 🚀</p>');
});

app.listen(PORT, () => {
  console.log(`Student Dashboard running on port ${PORT}`);
});
