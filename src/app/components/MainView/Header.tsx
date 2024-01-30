import Image from "next/image"

const svgStyle = {
  width: 41,
  height: 30,
}

export default function Header() {
  return (
    <>
      <div className="flex h-fit w-full flex-row justify-between bg-gray-800 p-2 px-3">
        <div>
          <Image
            src="/logo.svg"
            alt="logo"
            width="41"
            height="30"
            style={svgStyle}
          />
        </div>
        <div>Login</div>
      </div>
    </>
  )
}
