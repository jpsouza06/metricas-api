"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/ajusta-nome-colunas.ts
var ajusta_nome_colunas_exports = {};
__export(ajusta_nome_colunas_exports, {
  AjustaNomeColunas: () => AjustaNomeColunas
});
module.exports = __toCommonJS(ajusta_nome_colunas_exports);
function AjustaNomeColunas(data) {
  let array = [];
  data.forEach((obj) => {
    array.push({
      periodicidade: obj["periodicidade"],
      quantidadeCobrancas: obj["quantidade cobran\xE7as"],
      cobrancaACadaXDias: obj["cobrada a cada X dias"],
      dataInicio: obj["data in\xEDcio"],
      status: obj["status"],
      dataStatus: obj["data status"],
      dataCancelamento: obj["data cancelamento"],
      valor: obj["valor"],
      proximoCiclo: obj["pr\xF3ximo ciclo"],
      assinanteID: obj["ID assinante"]
    });
  });
  return array;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AjustaNomeColunas
});
