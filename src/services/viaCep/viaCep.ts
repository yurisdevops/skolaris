import axios from "axios";

export async function fetchAddress(cep: string) {
  const removeCaracter = cep.replace(/\D/g, "");
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${removeCaracter}/json/`
    );
    const data = response.data;

    if (data.error) {
      throw new Error("Cep não encontrado.");
    }

    return {
      address: data.logradouro,
      district: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw error;
  }
}
