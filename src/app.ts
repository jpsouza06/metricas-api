import express from 'express'

import multer from 'multer'
import { metricasRoute } from './routes/metricas'

export const app = express()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/metricas', upload.single('file'), metricasRoute)