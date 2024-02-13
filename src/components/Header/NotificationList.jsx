import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import styles from "./NotificationDialog.module.css";

const getIndicatorStyle = (type) => {
  switch (type) {
    case "main":
      return { backgroundColor: "var(--main-color)" };
    case "error":
      return { backgroundColor: "var(--error-color)" };
    default:
      return { backgroundColor: "var(--sub-color)" };
  }
};

export default function NotificationList({ icon, title, items = [] }) {
  return (
    <section>
      <SheetHeader className={styles.sheetHeader}>
        <SheetTitle className={styles.sheetTitle}>
          {icon}
          <span>{title}</span>
        </SheetTitle>
      </SheetHeader>

      <div className={styles.list}>
        {items.length === 0 && (
          <div className={styles.empty}>Nothing to show</div>
        )}
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <div
              className={styles.indicator}
              style={getIndicatorStyle(item.type)}
            ></div>
            <div className={styles.title}>{item.type}</div>
            <div className={styles.body}>{item.message}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
