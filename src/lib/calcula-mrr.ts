import { Assinates } from "../interface/assinates-interface"
import { OrdenaObjeto } from "./ordena-objeto-pela-chave"

export function CalculaMRR(assinantesPorMes: { [mes: string]: Assinates[] }) {
   const MRR: { [mes: string]: number } = {}

   Object.keys(assinantesPorMes).forEach((mes) => {
      const assinantesAtivos =
         assinantesPorMes[mes].filter((assinante) => assinante.status === 'Ativa')
      let total = 0
      assinantesAtivos.forEach((assinante) => {
         total = parseFloat((total + assinante.valor).toFixed(2))
      })

      MRR[mes] = total
   })

   return OrdenaObjeto(MRR)
}