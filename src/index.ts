import 'dotenv/config';

import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Docs available on http://localhost:${PORT}/docs`);
});
