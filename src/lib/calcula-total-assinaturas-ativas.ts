import { Assinates } from "../interface/assinates-interface";
import { OrdenaObjeto } from "./ordena-objeto-pela-chave";

export function CalculaTotalAssinaturasAtivas(assinantesPorMes: { [mes: string]: Assinates[] }) {
   const totalAssinataurasAtivas: { [mes: string]: number } = {}

   Object.keys(assinantesPorMes).forEach((mes) => {
      const assinantesAtivos =
         assinantesPorMes[mes].filter((assinante) => assinante.status === 'Ativa')

      totalAssinataurasAtivas[mes] = assinantesAtivos.length
   })

   return OrdenaObjeto(totalAssinataurasAtivas)
}