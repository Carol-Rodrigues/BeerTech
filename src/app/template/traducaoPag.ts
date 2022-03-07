import { MatPaginatorIntl } from '@angular/material/paginator';
// função para gerar a paginação
const LEGENDAS = (pagina: number, qtdItens: number, numPaginas: number) => {
  if (numPaginas == 0 || qtdItens == 0) { return `0 de ${numPaginas}`; }

  numPaginas = Math.max(numPaginas, 0);

  const indiceInicial = pagina * qtdItens;

  // Função para ajustar os índices, no caso do índice inicial exceder o tamanho da lista.
  const indiceFinal = indiceInicial < numPaginas ?
      Math.min(indiceInicial + qtdItens, numPaginas) :
      indiceInicial + qtdItens;

  return `${indiceInicial + 1} - ${indiceFinal} de ${numPaginas}`;
}


export function traduzirLegendas() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primeira página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = LEGENDAS;

  return paginatorIntl;
}
