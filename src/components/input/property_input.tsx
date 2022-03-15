import React from "react";

type PropertyInputProps = {
  value: string | undefined,
  onChange: (value: string) => void
}

const PropertyInput: React.VFC<PropertyInputProps> = React.memo(function inside({ value, onChange }){
  return (
    <input value={value ?? ""} onChange={(e) => onChange(e.target.value)}/>
  )
})

export { PropertyInput };