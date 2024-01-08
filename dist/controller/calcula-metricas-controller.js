"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller/calcula-metricas-controller.ts
var calcula_metricas_controller_exports = {};
__export(calcula_metricas_controller_exports, {
  default: () => CalculaMetricasController
});
module.exports = __toCommonJS(calcula_metricas_controller_exports);

// src/lib/agrupa-assinantes-por-mes.ts
var import_dayjs = __toESM(require("dayjs"));
function AssinantesPorMes(data) {
  const assinantesPorMes = {};
  data.forEach((assinante) => {
    let mesInicio = (0, import_dayjs.default)(new Date((assinante.dataStatus - 25569) * 86400 * 1e3)).month() + 1;
    let anoInicio = (0, import_dayjs.default)(new Date((assinante.dataStatus - 25569) * 86400 * 1e3)).year();
    if (assinante.periodicidade === "Mensal" && assinante.status === "Cancelada") {
      for (let i = 0; i <= assinante.quantidadeCobrancas; i++) {
        if (mesInicio < 1) {
          mesInicio = 12;
          anoInicio -= 1;
        }
        const data2 = mesInicio.toString() + "/" + anoInicio.toString();
        if (!assinantesPorMes[data2]) {
          assinantesPorMes[data2] = [];
        }
        if (i !== 0) {
          assinantesPorMes[data2].push({
            ...assinante,
            status: "Ativa"
          });
        } else {
          assinantesPorMes[data2].push(assinante);
        }
        mesInicio -= 1;
      }
    } else if (assinante.periodicidade === "Anual" && assinante.status === "Cancelada") {
      let mesCancelamento = (0, import_dayjs.default)(new Date((assinante.dataCancelamento - 25569) * 86400 * 1e3)).month() + 1;
      let anoCancelamento = (0, import_dayjs.default)(new Date((assinante.dataCancelamento - 25569) * 86400 * 1e3)).year();
      let dataCancelamento = mesCancelamento.toString() + "/" + anoCancelamento.toString();
      for (let i = 0; mesInicio <= mesCancelamento && anoInicio <= anoCancelamento; i++) {
        if (mesCancelamento < 1) {
          mesCancelamento = 12;
          anoCancelamento -= 1;
        }
        dataCancelamento = mesCancelamento.toString() + "/" + anoCancelamento.toString();
        if (!assinantesPorMes[dataCancelamento]) {
          assinantesPorMes[dataCancelamento] = [];
        }
        if (i !== 0) {
          assinantesPorMes[dataCancelamento].push({
            ...assinante,
            status: "Ativa"
          });
        } else {
          assinantesPorMes[dataCancelamento].push(assinante);
        }
        mesCancelamento -= 1;
      }
    } else if (assinante.periodicidade === "Mensal") {
      const data2 = mesInicio.toString() + "/" + anoInicio.toString();
      if (!assinantesPorMes[data2]) {
        assinantesPorMes[data2] = [];
      }
      assinantesPorMes[data2].push(assinante);
    } else if (assinante.periodicidade === "Anual") {
      for (let i = 0; i <= 12; i++) {
        if (mesInicio > 12) {
          mesInicio = 1;
          anoInicio += 1;
        }
        const data2 = mesInicio.toString() + "/" + anoInicio.toString();
        if (!assinantesPorMes[data2]) {
          assinantesPorMes[data2] = [];
        }
        assinantesPorMes[data2].push(assinante);
        mesInicio += 1;
      }
    }
  });
  return assinantesPorMes;
}

// src/lib/calcula-churn-rate.ts
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

// src/lib/calcula-mrr.ts
function CalculaMRR(assinantesPorMes) {
  const MRR = {};
  Object.keys(assinantesPorMes).forEach((mes) => {
    const assinantesAtivos = assinantesPorMes[mes].filter((assinante) => assinante.status === "Ativa");
    let total = 0;
    assinantesAtivos.forEach((assinante) => {
      console.log(total, assinante.valor);
      total = parseFloat((total + assinante.valor).toFixed(2));
    });
    MRR[mes] = total;
  });
  return MRR;
}

// src/controller/calcula-metricas-controller.ts
function CalculaMetricasController(data) {
  const assinantesPorMes = AssinantesPorMes(data);
  const churnRate = CalculateChurnRatePorMes(assinantesPorMes);
  const mrr = CalculaMRR(assinantesPorMes);
  return {
    metricas: {
      churnRate,
      mrr
    }
  };
}
