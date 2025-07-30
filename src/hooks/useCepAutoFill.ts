// hooks/useCepAutoFill.ts
import { useEffect } from "react";
import type { Path, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { fetchAddress } from "../services/viaCep/viaCep";

interface AddressFields {
  zipCode: string;
  address: string;
  city: string;
  state: string;
}

// Hook personalizado que observa o campo de CEP e preenche automaticamente os demais campos de endereço
export function useCepAutoFill<T extends AddressFields>(
  watch: UseFormWatch<T>, // Função do react-hook-form usada para observar os valores dos campos
  setValue: UseFormSetValue<T>, // Função que permite alterar o valor de um campo no formulário
  fields: {
    zipCode: Path<T>; // Referência ao campo de CEP
    address: Path<T>; // Referência ao campo de endereço
    city: Path<T>; // Referência ao campo de cidade
    state: Path<T>; // Referência ao campo de estado
  }
) {
  // Observa dinamicamente o valor do campo de CEP
  const cep = watch(fields.zipCode) as string;

  useEffect(() => {
    // Remove todos os caracteres não numéricos do CEP
    const cleanedCep = cep?.replace(/\D/g, "");

    // Executa busca somente se o CEP estiver completo (8 dígitos)
    if (cleanedCep && cleanedCep.length === 8) {
      // Chama serviço externo para buscar os dados de endereço
      fetchAddress(cleanedCep)
        .then((data) => {
          // Preenche os campos de endereço, cidade e estado com os dados recebidos
          setValue(fields.address, data.address);
          setValue(fields.city, data.city);
          setValue(fields.state, data.state);
        })
        .catch((err) => {
          // Registra erro caso a busca falhe
          console.error("Erro ao buscar CEP:", err.message);
        });
    }
  }, [cep, setValue]); // Executa o efeito toda vez que o valor do CEP muda
}
