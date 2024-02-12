import Logo from "@/assets/logo.svg?react";
import { ButtonTooltip } from "@/components/ui/tooltip";
import { FaKeyboard, FaQuestionCircle } from "react-icons/fa";
import NotificationDialog from "./NotificationDialog";
import { useGameContext } from "@/context/game";

export default function Header() {
  const { handleRestart } = useGameContext();

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
        <div className='flex gap-4 ml-2'>
          <ButtonTooltip text='Restart Test' onClick={handleRestart}>
            <FaKeyboard size={20} />
          </ButtonTooltip>
          <ButtonTooltip text='About' onClick={handleRestart}>
            <FaQuestionCircle size={16} />
          </ButtonTooltip>
        </div>
      </div>

      <div className='flex items-center' style={{ color: "var(--sub-color)" }}>
        <NotificationDialog />
      </div>
    </header>
  );
}
