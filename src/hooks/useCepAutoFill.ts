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

export function useCepAutoFill<T extends AddressFields>(
  watch: UseFormWatch<T>,
  setValue: UseFormSetValue<T>,
  fields: {
    zipCode: Path<T>;
    address: Path<T>;
    city: Path<T>;
    state: Path<T>;
  }
) {
  const cep = watch(fields.zipCode) as string;

  useEffect(() => {
    const cleanedCep = cep?.replace(/\D/g, "");

    if (cleanedCep && cleanedCep.length === 8) {
      fetchAddress(cleanedCep)
        .then((data) => {
          setValue(fields.address, data.address);
          setValue(fields.city, data.city);
          setValue(fields.state, data.state);
        })
        .catch((err) => {
          console.error("Erro ao buscar CEP:", err.message);
        });
    }
  }, [cep, setValue]);
}
