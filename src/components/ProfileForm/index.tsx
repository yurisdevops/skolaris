import { Controller, useForm } from "react-hook-form";
import { Input } from "../Form/Input";
import { MaskedInput } from "../Form/MaskInput";
import { Select } from "../Form/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  institutionSchema,
  type institutionData,
} from "../../schemas/profileSchema";
import { useEffect } from "react";
import { fetchAddress } from "../../services/viaCep/viaCep";
import styles from "./ProfileForm.module.scss";
import auth from "../../services/auth/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../../services/firestore/firestore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function ProfileForm() {
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

  const cep = watch("cep");

  useEffect(() => {
    if (cep && cep.replace(/\D/g, "").length === 8) {
      fetchAddress(cep)
        .then((data) => {
          setValue("address", data.address);
          setValue("city", data.city);
          setValue("state", data.state);
        })
        .catch((err) => {
          console.error("CEP inválido:", err.message);
        });
    }
  }, [cep]);

  async function onSubmit(data: institutionData) {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;

      const dataSave = { ...data, uid: uid };

      await setDoc(doc(db, "profile", uid), dataSave);
      navigate("/dashboard");
      toast.success("Perfil Concluído!");
      reset();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.formContainer}>
        <aside className={styles.formContent}>
          <h3 className={styles.title}>Cadastro Institucional</h3>

          <Input
            type="text"
            name="name"
            register={register}
            placeholder="Nome da instituição"
            error={errors.name?.message}
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
              />
            )}
          />

          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="00000-000"
                placeholder="CEP"
                error={errors.cep?.message}
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
