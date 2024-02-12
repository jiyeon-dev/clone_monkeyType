import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import { FaRedoAlt } from "react-icons/fa";
import { useGameContext } from "@/context/game";

export default function ResetButton() {
  const { handleRestart } = useGameContext();

  return (
    <TooltipProvider delayDuration='200'>
      <Tooltip>
        <TooltipTrigger
          className='px-8 py-4 mx-auto mt-8'
          onClick={handleRestart}
        >
          <FaRedoAlt />
        </TooltipTrigger>

        <TooltipContent side='bottom' sideOffset='-1'>
          <p>Restart Test</p>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
