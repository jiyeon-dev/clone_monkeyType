import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBell, FaBullhorn, FaCommentAlt } from "react-icons/fa";

import styles from "./NotificationDialog.module.css";
import NotificationList from "./NotificationList";

export default function NotificationDialog() {
  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <button>
          <FaBell size={16} />
        </button>
      </SheetTrigger>

      {/* Content */}
      <SheetContent
        position='left'
        className={styles.sheetContent}
        hideCloseButton={true}
      >
        <NotificationList icon={<FaBullhorn />} title='Announcements' />
        <div className={styles.separator} />
        <NotificationList
          icon={<FaCommentAlt />}
          title='Announcements'
          items={[1]}
        />
      </SheetContent>
    </Sheet>
  );
}
