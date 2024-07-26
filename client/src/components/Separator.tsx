type Props = {
  children: React.ReactNode
}

const Separator = ({ children }: Props) => {
  return (
    <div className="w-100 flex flex-row items-center gap-3">
      <div className="grow h-px bg-gray-400"></div>
      <span className="grow-0 text-gray-600">{children}</span>
      <div className="grow h-px bg-gray-400"></div>
    </div>
  )
}

export default Separator
