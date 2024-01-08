import dayjs from "dayjs"
import { Assinates } from "../interface/assinates-interface"

export function AssinantesPorMes(
   data: Assinates[]): { [mes: string]: Assinates[] } {
   const assinantesPorMes: { [mes: string]: Assinates[] } = {}
   data.forEach((assinante) => {
      let mesInicio =
         dayjs(new Date((assinante.dataStatus - 25569) * 86400 * 1000)).month() + 1
      let anoInicio =
         dayjs(new Date((assinante.dataStatus - 25569) * 86400 * 1000)).year()

      if (
         (assinante.periodicidade === 'Mensal') && (assinante.status === 'Cancelada')
      ) {
         for (let i = 0; i <= assinante.quantidadeCobrancas; i++) {
            if (mesInicio < 1) {
               mesInicio = 12
               anoInicio -= 1
            }

            const data = mesInicio.toString() + '/' + anoInicio.toString()

            if (!assinantesPorMes[data]) {
               assinantesPorMes[data] = []
            }

            if (i !== 0) {
               assinantesPorMes[data].push({
                  ...assinante,
                  status: 'Ativa'
               })

            } else {
               assinantesPorMes[data].push(assinante)
            }

            mesInicio -= 1
         }
      } else if (
         (assinante.periodicidade === 'Anual') && (assinante.status === 'Cancelada')
      ) {
         let mesCancelamento =
            dayjs(new Date((assinante.dataCancelamento - 25569) * 86400 * 1000)).month() + 1
         let anoCancelamento =
            dayjs(new Date((assinante.dataCancelamento - 25569) * 86400 * 1000)).year()

         let dataCancelamento = mesCancelamento.toString() + '/' + anoCancelamento.toString()

         for (let i = 0; (mesInicio <= mesCancelamento && anoInicio <= anoCancelamento); i++) {


            if (mesCancelamento < 1) {
               mesCancelamento = 12
               anoCancelamento -= 1
            }
            dataCancelamento = mesCancelamento.toString() + '/' + anoCancelamento.toString()

            if (!assinantesPorMes[dataCancelamento]) {
               assinantesPorMes[dataCancelamento] = []
            }

            if (i !== 0) {
               assinantesPorMes[dataCancelamento].push({
                  ...assinante,
                  status: 'Ativa'
               })

            } else {
               assinantesPorMes[dataCancelamento].push(assinante)
            }

            mesCancelamento -= 1
         }
      } else if (assinante.periodicidade === 'Mensal') {
         const data = mesInicio.toString() + '/' + anoInicio.toString()

         if (!assinantesPorMes[data]) {
            assinantesPorMes[data] = []
         }

         assinantesPorMes[data].push(assinante)

      } else if (assinante.periodicidade === 'Anual') {
         for (let i = 0; i <= 12; i++) {
            if (mesInicio > 12) {
               mesInicio = 1
               anoInicio += 1
            }
            const data = mesInicio.toString() + '/' + anoInicio.toString()

            if (!assinantesPorMes[data]) {
               assinantesPorMes[data] = []
            }

            assinantesPorMes[data].push(assinante)

            mesInicio += 1
         }
      }
   })

   return assinantesPorMes
}