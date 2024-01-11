import { Assinates } from "../interface/assinates-interface"
import { AssinantesPorMes } from "../lib/agrupa-assinantes-por-mes"
import { CalculaChurnRatePorMes } from "../lib/calcula-churn-rate"
import { CalculaMRR } from "../lib/calcula-mrr"
import { CalculaTotalAssinaturasAtivas } from "../lib/calcula-total-assinaturas-ativas"

export default function CalculaMetricasController(data: Assinates[]): {
   metricas: {
      churnRate: { [mes: string]: number },
      mrr: { [mes: string]: number },
      totalAssinaturasAtivas: { [mes: string]: number }
   }
} {
   const assinantesPorMes = AssinantesPorMes(data)

   const churnRate = CalculaChurnRatePorMes(assinantesPorMes)
   const mrr = CalculaMRR(assinantesPorMes)
   const totalAssinaturasAtivas = CalculaTotalAssinaturasAtivas(assinantesPorMes)

   return {
      metricas: {
         churnRate,
         mrr,
         totalAssinaturasAtivas
      }
   }
}