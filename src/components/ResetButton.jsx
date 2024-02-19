import { ButtonTooltip } from "@/components/ui/tooltip";
import { FaRedoAlt } from "react-icons/fa";
import { useGameContext } from "@/context/game";

export default function ResetButton() {
  const { handleRestart } = useGameContext();

  return (
    <div className='px-8 py-4 mx-auto mt-8'>
      <ButtonTooltip text='Restart Test' onClick={handleRestart}>
        <FaRedoAlt />
      </ButtonTooltip>
    </div>
  );
}
