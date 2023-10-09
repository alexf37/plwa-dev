import { useRef, useState } from "react";
import { Button } from "./Button";
import { Popover } from "./Popover";
import { NotificationsPopover } from "./NotificationsPopover";
import { NotificationIcon } from "./icons/NotificationIcon";
import { ProfileIcon } from "./icons/ProfileIcon";
import { ProfilePopover } from "./ProfilePopover";

function ControlButtons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileButtonRef = useRef(null);

  const handleProfileButtonClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const notifsButtonRef = useRef(null);

  const handleNotifsButtonClick = () => {
    setIsNotifsOpen(!isNotifsOpen);
  };
  return (
    <div className="flex gap-6">
      <div className="relative">
        <Button
          aria-label="Notifications"
          className="h-12 w-12"
          ref={notifsButtonRef}
          onClick={handleNotifsButtonClick}
        >
          <NotificationIcon className="h-7 w-7" />
        </Button>
        {isNotifsOpen && (
          <Popover>
            <NotificationsPopover />
          </Popover>
        )}
      </div>

      <div className="relative">
        <Button
          aria-label="Profile"
          className="h-12 w-12"
          ref={profileButtonRef}
          onClick={handleProfileButtonClick}
        >
          <ProfileIcon className="h-7 w-7" />
        </Button>
        {isProfileOpen && (
          <Popover>
            <ProfilePopover />
          </Popover>
        )}
      </div>
    </div>
  );
}

export function RightPane({ children }: React.PropsWithChildren) {
  return (
    <div className="right-pane-container gap-6">
      <ControlButtons />
      {children}
    </div>
  );
}
