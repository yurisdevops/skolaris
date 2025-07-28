import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCepAutoFill } from "../../hooks/useCepAutoFill";
import {
  institutionSchema,
  type institutionData,
} from "../../schemas/profileSchema";
import type { AppDispatch, RootState } from "../../store";
import {
  resetStatus,
  updateInstitutionProfile,
} from "../../store/institutionSlice";
import { Input } from "../Form/Input";
import { MaskedInput } from "../Form/MaskInput";
import { Select } from "../Form/Select";
import styles from "./ProfileForm.module.scss";

interface ProfileFormProps {
  initialData: institutionData | null;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [perfilEnviado, setPerfilEnviado] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { error, success } = useSelector(
    (state: RootState) => state.institution
  );
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(institutionSchema) });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  useCepAutoFill(watch, setValue, {
    zipCode: "zipCode",
    address: "address",
    city: "city",
    state: "state",
  });

  useEffect(() => {
    if (success && perfilEnviado) {
      toast.success("Perfil Concluído!");
      navigate("/dashboard");
      reset();
      dispatch(resetStatus());
    }

    if (error) {
      toast.error("Erro: " + error);
    }
  }, [success, error]);

  async function onSubmit(data: institutionData) {
    setPerfilEnviado(true);
    dispatch(updateInstitutionProfile(data));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.formContainer}>
        <aside className={styles.formContent}>
          <h3 className={styles.title}>Institucional</h3>

          <Input
            type="text"
            name="name"
            register={register}
            placeholder="Nome da instituição"
            error={errors.name?.message}
          />
          <Input
            type="text"
            name="acronym"
            register={register}
            placeholder="Sigla da instituição"
            error={errors.acronym?.message}
          />

          <Controller
            name="cnpj"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="00.000.000/0000-00"
                placeholder="CNPJ"
                error={errors.cnpj?.message}
              />
            )}
          />

          <Select
            name="type"
            options={["Escola", "Faculdade", "Curso Técnico", "Outro"]}
            register={register}
            error={errors.type?.message}
          />

          <Select
            name="modality"
            options={["Presencial", "EAD", "Híbrido"]}
            register={register}
            error={errors.modality?.message}
          />

          <Input
            type="number"
            name="foundedYear"
            register={register}
            placeholder="Ano de fundação"
            error={errors.foundedYear?.message}
          />

          <Input
            type="email"
            name="email"
            register={register}
            placeholder="Email institucional"
            error={errors.email?.message}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="(00) 0 0000-0000"
                error={errors.phone?.message}
                placeholder="(00) 00000-0000"
              />
            )}
          />

          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="00000-000"
                placeholder="CEP"
                error={errors.zipCode?.message}
              />
            )}
          />

          <Input
            type="text"
            name="address"
            register={register}
            placeholder="Endereço"
            error={errors.address?.message}
          />

          <Input
            type="text"
            name="city"
            register={register}
            placeholder="Cidade"
            error={errors.city?.message}
          />

          <Input
            type="text"
            name="state"
            register={register}
            placeholder="Estado"
            error={errors.state?.message}
          />
        </aside>
        <aside className={styles.formContent}>
          <h3 className={styles.subtitle}>Responsável</h3>
          <Input
            type="text"
            name="responsible.name"
            register={register}
            placeholder="Nome do responsável"
            error={errors.responsible?.name?.message}
          />
          <Input
            type="text"
            name="responsible.role"
            register={register}
            placeholder="Cargo"
            error={errors.responsible?.role?.message}
          />
          <Input
            type="email"
            name="responsible.email"
            register={register}
            placeholder="Email do responsável"
            error={errors.responsible?.email?.message}
          />
          <Controller
            name="responsible.phone"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="(00) 0 0000-0000"
                placeholder="Telefone do responsável"
                error={errors.responsible?.phone?.message}
              />
            )}
          />
        </aside>
      </section>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Salvar dados"}
      </button>
    </form>
  );
}
