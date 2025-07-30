// Função assíncrona que consulta o serviço ViaCEP para obter informações de endereço a partir de um CEP.
// Retorna um objeto com os campos de endereço formatados ou lança erro em caso de falha.

import axios from "axios";

export async function fetchAddress(cep: string) {
  // Remove todos os caracteres não numéricos do CEP recebido
  const removeCaracter = cep.replace(/\D/g, "");

  try {
    // Faz uma requisição GET para o serviço ViaCEP usando o CEP limpo
    const response = await axios.get(
      `https://viacep.com.br/ws/${removeCaracter}/json/`
    );
    const data = response.data;

    // Se a resposta indicar erro (CEP inválido ou inexistente), lança uma exceção
    if (data.error) {
      throw new Error("Cep não encontrado.");
    }

    // Retorna um objeto com os dados estruturados do endereço
    return {
      address: data.logradouro, // Nome da rua/avenida
      district: data.bairro, // Bairro
      city: data.localidade, // Cidade
      state: data.uf, // Estado (sigla)
    };
  } catch (error) {
    // Exibe o erro no console (útil para debug) e relança o erro para tratamento externo
    console.error("Erro ao buscar CEP:", error);
    throw error;
  }
}
