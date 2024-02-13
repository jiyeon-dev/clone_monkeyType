import { ButtonTooltip } from "@/components/ui/tooltip";
import { FaRedoAlt } from "react-icons/fa";
import { useGameContext } from "@/context/game";

export default function ResetButton() {
  const { handleRestart } = useGameContext();

  return (
    <ButtonTooltip
      text='Restart Test'
      className='px-8 py-4 mx-auto mt-8'
      sideOffset={"-5"}
      onClick={handleRestart}
    >
      <FaRedoAlt />
    </ButtonTooltip>
  );
}
