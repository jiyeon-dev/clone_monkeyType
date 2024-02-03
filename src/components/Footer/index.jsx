import { FaCode, FaPalette, FaCodeBranch } from "react-icons/fa";

export default function Footer() {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <footer className='flex text-xs text-center justify-between'>
      <div className='flex gap-4'>
        <button
          onClick={() =>
            handleClick("https://github.com/jiyeon-dev/clone_monkeyType")
          }
        >
          <FaCode />
          <span>GitHub</span>
        </button>
      </div>

      <div className='flex gap-4'>
        <button>
          <FaPalette />
          bouquet
        </button>
        <button>
          <FaCodeBranch />
          {__APP_VERSION__}
        </button>
      </div>
    </footer>
  );
}
