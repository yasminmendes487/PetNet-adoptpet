// Função para definir os filtros de Pets 
export default function buildFilters(query) {
  const filters = {};

  if (query.idade) {
      filters.idade = Number(query.idade);
  }
  if (query.especie) {
      filters.especie = query.especie;
  }
  if (query.status) {
      filters.status = query.status;
  }

  return filters;
}