import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import { FaRedoAlt } from "react-icons/fa";

export default function ResetButton({ onReset }) {
  return (
    <TooltipProvider delayDuration='200'>
      <Tooltip>
        <TooltipTrigger className='px-8 py-4 mx-auto mt-8' onClick={onReset}>
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
