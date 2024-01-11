import express, { Router } from 'express'
import * as XLSX from 'xlsx'
import { AjustaNomeColunas } from '../lib/ajusta-nome-colunas'
import CalculaMetricasController from '../controller/calcula-metricas-controller'

export async function metricasRoute(request: express.Request, response: express.Response) {
   if (!request.file) {
      return response.status(400).send('Nenhum arquivo enviado.')
   }

   const file = XLSX.read(request.file.buffer, { type: 'buffer' })

   const data = AjustaNomeColunas(
      (XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]))
   )

   const { metricas } = CalculaMetricasController(data)

   response.status(200).send({
      churnRate: metricas.churnRate,
      mrr: metricas.mrr,
      totalAssinaturasAtivas: metricas.totalAssinaturasAtivas
   })
}







