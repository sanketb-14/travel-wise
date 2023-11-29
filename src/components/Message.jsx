
export default function Message({message}) {
  return ( <div className="w-full text-center flex justify-center items-center  shadow-lg m-4 p-4 border-l-4 border-primary">
        <p className="text-xl font-semibold text-secondary">{message}</p>
    </div>
  )
}
