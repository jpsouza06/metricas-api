export function OrdenaObjeto(objeto: { [mes: string]: number }) {
   const chavesOrdenadas = Object.keys(objeto).sort((a, b) => {
      const dataA = new Date(a.replace(/(\d{2})\/(\d{4})/, '$2-$1-01'));
      const dataB = new Date(b.replace(/(\d{2})\/(\d{4})/, '$2-$1-01'));

      return dataA.getTime() - dataB.getTime()
   });

   return Object.fromEntries(chavesOrdenadas.map(chave => [chave, objeto[chave]]));
}