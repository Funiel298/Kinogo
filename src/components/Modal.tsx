export default function Modal({ active, setActive, children }: any) {
  return (
    <>
      <div
        onClick={(e) => {
          setActive(false)
          e.preventDefault()
        }}
        className={`fixed left-0 top-0 h-screen w-screen flex justify-center items-center z-50 ${
          active
            ? 'bg-black bg-opacity-80 visible transition-opacity duration-300'
            : 'invisible opacity-0 transition-opacity duration-300'
        }`}
      >
        <div onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          }} 
          className="w-auto p-8 h-2/3 rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
}
