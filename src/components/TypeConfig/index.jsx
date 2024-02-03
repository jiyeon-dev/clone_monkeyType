import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FaAt, FaHashtag, FaClock, FaFont } from "react-icons/fa";
import styles from "./TypeConfig.module.css";

export default function TypeConfig() {
  return (
    <div className='flex items-center justify-center text-center mb-4'>
      <div
        className={styles.typeConfig}
        style={{ backgroundColor: "var(--sub-alt-color)" }}
      >
        {/* punctuation and number */}
        <ToggleGroup type='multiple'>
          <MyToggleGroupItem value='punctuation'>
            <FaAt />
            punctuation
          </MyToggleGroupItem>
          <MyToggleGroupItem value='number'>
            <FaHashtag />
            number
          </MyToggleGroupItem>
        </ToggleGroup>

        <div className={styles.separator} />

        {/* mode */}
        <ToggleGroup type='single'>
          <MyToggleGroupItem value='time'>
            <FaClock />
            time
          </MyToggleGroupItem>
          <MyToggleGroupItem value='word'>
            <FaFont />
            word
          </MyToggleGroupItem>
        </ToggleGroup>

        <div className={styles.separator} />

        {/* timer */}
        <ToggleGroup type='single'>
          <MyToggleGroupItem value='15'>15</MyToggleGroupItem>
          <MyToggleGroupItem value='30'>30</MyToggleGroupItem>
          <MyToggleGroupItem value='60'>60</MyToggleGroupItem>
          <MyToggleGroupItem value='120'>120</MyToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

const MyToggleGroupItem = ({ children, className, ...props }) => {
  return (
    <ToggleGroupItem
      className={`${styles.toggleGroupItem} text-xs ${className}`}
      {...props}
    >
      {children}
    </ToggleGroupItem>
  );
};
