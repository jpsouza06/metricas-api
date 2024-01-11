import dayjs from "dayjs"
import { Assinates } from "../interface/assinates-interface"

export function AssinantesPorMes(data: Assinates[]): { [mes: string]: Assinates[] } {
   const assinantesPorMes: { [mes: string]: Assinates[] } = {}
   data.forEach((assinante) => {
      // Transforma a data de inicio do valor serial que o excel utiliza
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

            let data = ''
            // Adiciona o zero a esquerda da data para ser possível ordenar.
            if (mesInicio < 10) {
               data = '0' + mesInicio.toString() + '/' + anoInicio.toString()
            } else {
               data = mesInicio.toString() + '/' + anoInicio.toString()
            }

            if (!assinantesPorMes[data]) {
               assinantesPorMes[data] = []
            } mesInicio

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

         let dataCancelamento = ''

         for (let i = 0; (mesInicio <= mesCancelamento && anoInicio <= anoCancelamento); i++) {


            if (mesCancelamento < 1) {
               mesCancelamento = 12
               anoCancelamento -= 1
            }

            // Adiciona o zero a esquerda da data para ser possível ordenar.
            if (mesCancelamento < 10) {
               dataCancelamento = '0' + mesCancelamento.toString() + '/' + anoCancelamento.toString()
            } else {
               dataCancelamento = mesCancelamento.toString() + '/' + anoCancelamento.toString()
            }

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
         let data = ''
         // Adiciona o zero a esquerda da data para ser possível ordenar.
         if (mesInicio < 10) {
            data = '0' + mesInicio.toString() + '/' + anoInicio.toString()
         } else {
            data = mesInicio.toString() + '/' + anoInicio.toString()
         }

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

            let data = ''
            // Adiciona o zero a esquerda da data para ser possível ordenar.
            if (mesInicio < 10) {
               data = '0' + mesInicio.toString() + '/' + anoInicio.toString()
            } else {
               data = mesInicio.toString() + '/' + anoInicio.toString()
            }

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
