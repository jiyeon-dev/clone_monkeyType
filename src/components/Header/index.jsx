import Logo from "@/assets/logo.svg?react";
import { FaKeyboard, FaQuestionCircle } from "react-icons/fa";
import NotificationDialog from "./NotificationDialog";

export default function Header() {
  return (
    <header className='flex items-center justify-between select-none'>
      <div
        className='flex items-center gap-2'
        style={{ color: "var(--sub-color)" }}
      >
        <Logo className='w-12 cursor-pointer' fill={"var(--main-color)"} />
        <h1
          className='text-2xl font-bold cursor-pointer hover:underline lg:text-3xl hidden sm:block'
          style={{ color: "var(--text-color)" }}
        >
          GorillaType
        </h1>
        <div className='flex gap-4'>
          <button>
            <FaKeyboard size={20} />
          </button>
          <button>
            <FaQuestionCircle size={16} />
          </button>
        </div>
      </div>

      <div className='flex items-center' style={{ color: "var(--sub-color)" }}>
        <NotificationDialog />
      </div>
    </header>
  );
}
