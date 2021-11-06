import { UseFormReturn, useFieldArray } from "react-hook-form";
import styles from "../../styles/Fields.module.css";

const Fields = ({ control, register }: Partial<UseFormReturn<Inputs>>) => {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "fields"
  });

  if (register === undefined) return null;

  return (
    <>
      <ul className={styles.root}>
        {
          fields.map((_, i) => (
            <li key={i}>
              <input {...register(`fields.${i}.name`, { required: true })} />
              <input {...register(`fields.${i}.value`, { required: true })} />
              <button className={styles.fieldsManageButton} onClick={_ => remove(i)}> Remove </button>
            </li>
          ))
        }
        <li>
          <button className={styles.fieldsManageButton} onClick={_ => append({ name: "", value: "" })}> Append </button>
        </li>
      </ul>
    </>
  )
}

export { Fields }