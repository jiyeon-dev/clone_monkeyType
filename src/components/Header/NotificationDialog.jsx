import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBell, FaBullhorn, FaCommentAlt } from "react-icons/fa";

import styles from "./NotificationDialog.module.css";
import NotificationList from "./NotificationList";

const items = [
  { title: "Notice", type: "notice", message: "This is My New Project🎉" },
  {
    title: "Connection",
    type: "main",
    message: "Thank you for watching👩🏻‍💻",
  },
  { title: "important", type: "error", message: "🚀" },
];

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
      <SheetContent position='left' className={styles.sheetContent}>
        <NotificationList icon={<FaBullhorn />} title='Announcements' />
        <div className={styles.separator} />
        <NotificationList
          icon={<FaCommentAlt />}
          title='Announcements'
          items={items}
        />
      </SheetContent>
    </Sheet>
  );
}
