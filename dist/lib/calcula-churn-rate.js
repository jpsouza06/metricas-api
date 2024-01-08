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

// src/lib/calcula-churn-rate.ts
var calcula_churn_rate_exports = {};
__export(calcula_churn_rate_exports, {
  CalculateChurnRatePorMes: () => CalculateChurnRatePorMes
});
module.exports = __toCommonJS(calcula_churn_rate_exports);
function CalculateChurnRatePorMes(assinantesPorMes) {
  const churnRatePorMes = {};
  Object.keys(assinantesPorMes).forEach((mes) => {
    const assinantesAtivos = assinantesPorMes[mes].filter((assinante) => assinante.status == "Ativa");
    const assinantesCancelados = assinantesPorMes[mes].filter((assinante) => assinante.status == "Cancelada");
    if (assinantesAtivos.length === 0 && assinantesCancelados.length === 0) {
      churnRatePorMes[mes] = 0;
    } else if (assinantesAtivos.length === 0 && assinantesCancelados.length > 0) {
      churnRatePorMes[mes] = 100;
    } else {
      churnRatePorMes[mes] = parseFloat((assinantesCancelados.length / assinantesAtivos.length * 100).toFixed(2));
    }
  });
  return churnRatePorMes;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalculateChurnRatePorMes
});
