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

// Componente responsável por preencher e enviar o formulário do perfil institucional.
// Utiliza hooks para validação, preenchimento automático via CEP, integração com Redux e navegação pós-envio.

interface ProfileFormProps {
  initialData: institutionData | null; // Dados iniciais do perfil que serão preenchidos no formulário (caso já existam)
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [perfilEnviado, setPerfilEnviado] = useState(false); // Controla se o perfil já foi enviado

  const dispatch = useDispatch<AppDispatch>(); // Permite disparar ações Redux tipadas
  const { error, success } = useSelector(
    (state: RootState) => state.institution
  ); // Lê estado de envio do perfil
  const navigate = useNavigate(); // Redireciona o usuário após envio

  // Inicializa o formulário com validação baseada no Zod e captura utilitários
  const {
    handleSubmit, // Função que prepara e envia os dados
    register, // Associa inputs ao formulário
    watch, // Observa campos dinamicamente (usado para CEP)
    setValue, // Permite alterar valores de campos programaticamente
    reset, // Reseta o formulário
    control, // Controla campos não padrão (ex: MaskedInput)
    formState: { errors, isSubmitting }, // Exibe erros e controla estado de envio
  } = useForm({ resolver: zodResolver(institutionSchema) });

  // Se houver dados iniciais, preenche automaticamente os campos
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Hook que preenche endereço automaticamente ao digitar o CEP
  useCepAutoFill(watch, setValue, {
    zipCode: "zipCode",
    address: "address",
    city: "city",
    state: "state",
  });

  // Monitora os resultados do envio: sucesso ou erro
  useEffect(() => {
    if (success && perfilEnviado) {
      toast.success("Perfil Concluído!");
      navigate("/dashboard"); // Redireciona após sucesso
      reset(); // Limpa o formulário
      dispatch(resetStatus()); // Reseta estado da store
    }

    if (error) {
      toast.error("Erro: " + error); // Exibe erro de envio
    }
  }, [success, error]);

  // Função executada ao submeter o formulário
  async function onSubmit(data: institutionData) {
    setPerfilEnviado(true); // Ativa controle de submissão
    dispatch(updateInstitutionProfile(data)); // Dispara atualização para o Firestore
  }

  // Renderiza o formulário dividido entre dados institucionais e dados do responsável
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.formContainer}>
        <aside className={styles.formContent}>
          <h3 className={styles.title}>Institucional</h3>

          {/* Campos institucionais */}
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

          {/* Campos do responsável institucional */}
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

      {/* Botão de envio com estado dinâmico */}
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
