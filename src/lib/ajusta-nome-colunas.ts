import { Assinates } from "../interface/assinates-interface"

export function AjustaNomeColunas (data: any[]): Assinates[]{
   let array: Assinates[] = []

   data.forEach((obj) => {
      array.push({
         periodicidade: obj['periodicidade'],
         quantidadeCobrancas: obj['quantidade cobranças'],
         cobrancaACadaXDias: obj['cobrada a cada X dias'],
         dataInicio: obj['data início'],
         status: obj['status'],
         dataStatus: obj['data status'],
         dataCancelamento: obj['data cancelamento'],
         valor: obj['valor'],
         proximoCiclo: obj['próximo ciclo'],
         assinanteID: obj['ID assinante'],
      })
   })

   return array
}