import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="flex h-fit p-2 w-full flex-row justify-between bg-gray-800 px-3">
        <div>
          <Image src="/logo.png" alt="logo" width="41" height="30" />
        </div>
        <div>Login</div>
      </div>
    </>
  );
}
