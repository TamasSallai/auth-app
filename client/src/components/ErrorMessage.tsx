type Props = {
  message: string
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="px-4 py-2 mt-2 font-semibold text-red-700 bg-red-200 outline outline-1 outline-red-700 rounded-sm">
      {message}
    </div>
  )
}

export default ErrorMessage
