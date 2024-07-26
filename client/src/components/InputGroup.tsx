import { Ref, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  id: string
  label: string
  type: 'text' | 'password'
  placeholder?: string
  fieldError?: FieldError
}

const FormGroup = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  const { id, label, fieldError, ...inputProps } = props

  return (
    <div className="flex flex-col grow">
      <label className="text-md font-medium text-gray-900" htmlFor={id}>
        {label}
      </label>

      <input
        className="px-4 py-2 mt-2 rounded-sm text-gray-900 placeholder:text-gray-400 outline outline-1 outline-gray-400 focus:outline-2 focus:outline-blue-400 data-[invalid=true]:outline-red-600 focus:data-[invalid=true]:outline-red-600 sm:text-sm sm:leading-6"
        id={id}
        ref={ref}
        {...inputProps}
        data-invalid={fieldError ? true : false}
      />

      {fieldError && (
        <p className="mt-1 text-sm text-red-600">{fieldError.message}</p>
      )}
    </div>
  )
})

export default FormGroup
