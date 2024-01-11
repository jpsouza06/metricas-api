import express from 'express'

import multer from 'multer'
import { metricasRoute } from './routes/metricas'
import cors from 'cors'

export const app = express()

const corsOptions = {
   origin: '*',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   optionsSuccessStatus: 204,
}

app.use(cors(corsOptions));

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/metricas', upload.single('file'), metricasRoute)
