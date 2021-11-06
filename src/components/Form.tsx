import { UseFormReturn } from "react-hook-form";

import { Fields } from "./Fields";
import styles from "../../styles/Form.module.css";

const InvalidValueAlert = ({ children }: { children: React.ReactNode }) => {
  return <p className={styles.error}> { children } </p>
}

const Form = ({ register, control, handleSubmit, formState, onSubmit }: Partial<UseFormReturn<Inputs>> & { onSubmit: () => void }) => {

  if (register === undefined || control === undefined || handleSubmit === undefined || formState == undefined ) return null;
  const { errors } = formState;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formParent}>
      <input {...register("title", { required: true })} />
      
      <input {...register("description", { required: true })} />
      
      <Fields {...{control, register}} />
      <InvalidValueAlert>
        { errors.title && "タイトルを入力してください。"}
        { errors.description && "説明を入力してください。" }
        { errors.fields?.map((e, i) => {
          if (e.name) return `${i + 1} 個目のフィールド名を入力してください。`
          if (e.value) return `${i + 1} 個目のフィールドの値を入力してください。`
        })}
      </InvalidValueAlert>
      <input type="submit" />
    </form>
  );
}

export { Form }