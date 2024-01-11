import { Assinates } from "../interface/assinates-interface"
import { OrdenaObjeto } from "./ordena-objeto-pela-chave"

export function CalculaChurnRatePorMes(
   assinantesPorMes: { [mes: string]: Assinates[] }
) {
   const churnRatePorMes: { [mes: string]: number } = {}

   Object.keys(assinantesPorMes).forEach((mes) => {
      const assinantesAtivos =
         assinantesPorMes[mes].filter((assinante) => assinante.status == 'Ativa')

      const assinantesCancelados =
         assinantesPorMes[mes].filter((assinante) => assinante.status == 'Cancelada')

      if (assinantesAtivos.length === 0 && assinantesCancelados.length === 0) {
         churnRatePorMes[mes] = 0
      } else if (assinantesAtivos.length === 0 && assinantesCancelados.length > 0) {
         churnRatePorMes[mes] = 100
      } else {
         churnRatePorMes[mes] =
            parseFloat(((assinantesCancelados.length / assinantesAtivos.length) * 100).toFixed(2))
      }
   })
   return OrdenaObjeto(churnRatePorMes)


}

