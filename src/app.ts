import express from 'express'
import swaggerUi from "swagger-ui-express"

import multer from 'multer'
import { metricasRoute } from './routes/metricas'
import cors from 'cors'

import swaggerDocs from "./swagger.json"

export const app = express()

const corsOptions = {
   origin: '*',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   optionsSuccessStatus: 204,
}

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/metricas', upload.single('file'), metricasRoute)
