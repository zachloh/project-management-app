import cors from 'cors';
import express from 'express';
import 'module-alias/register';

import port from 'config/env';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
