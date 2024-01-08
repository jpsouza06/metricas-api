import { Assinates } from "../interface/assinates-interface"
import { AssinantesPorMes } from "../lib/agrupa-assinantes-por-mes"
import { CalculateChurnRatePorMes } from "../lib/calcula-churn-rate"
import { CalculaMRR } from "../lib/calcula-mrr"

export default function CalculaMetricasController(data: Assinates[]): {
   metricas: {
      churnRate: { [mes: string]: number },
      mrr: { [mes: string]: number }
   }
} {
   const assinantesPorMes = AssinantesPorMes(data)

   const churnRate = CalculateChurnRatePorMes(assinantesPorMes)
   const mrr = CalculaMRR(assinantesPorMes)

   return {
      metricas: {
         churnRate,
         mrr
      }
   }
}