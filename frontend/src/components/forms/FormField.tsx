interface FormFieldProps {
  name: string,
  translatedName: string,
  type: string,
  register: any,
  error: string | undefined
}

const FormField = ({ name, type, register, error, translatedName }: FormFieldProps) => {
  return (
    <>
      <label htmlFor={name}
             className="block text-sm font-semibold leading-6 text-textTitle">{translatedName}</label>
      <input id={name} type={type} {...register(name)}
             className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      <p className="text-red-400">{error}</p>
    </>
  )
    ;
};

export default FormField;