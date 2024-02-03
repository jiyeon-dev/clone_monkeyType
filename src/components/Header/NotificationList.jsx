import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import styles from "./NotificationDialog.module.css";

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
            <div className={styles.indicator}></div>
            <div className={styles.title}>Notice</div>
            <div className={styles.body}>Test invalid - AFK detected</div>
          </div>
        ))}
      </div>
    </section>
  );
}
