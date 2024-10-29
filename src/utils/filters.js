// Função para definir os filtros de Pets
export default function buildFilters(query) {
  const filters = {};

  if (query.especie) {
    filters.especie = query.especie;
  }
  if (query.status) {
    filters.status = query.status;
  }

  if (query.raca) {
    filters.raca = query.raca;
  }

  if (query.data_nascimento) {
    filters.data_nascimento = {
      gte: new Date(query.data_nascimento),
    };
  }
  return filters;
}
