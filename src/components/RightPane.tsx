import { Suspense, lazy, useRef, useState } from "react";
import { Button } from "./Button";
import { Popover } from "./Popover";
import { NotificationIcon } from "./icons/NotificationIcon";
import { ProfileIcon } from "./icons/ProfileIcon";

const NotificationsPopover = lazy(() =>
  import("./NotificationsPopover").then((module) => ({
    default: module.NotificationsPopover,
  })),
);

const ProfilePopover = lazy(() =>
  import("./ProfilePopover").then((module) => ({
    default: module.ProfilePopover,
  })),
);

function Loading() {
  return <div>Loading...</div>;
}

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
    <div className="flex gap-6 max-md:relative">
      <div className="md:relative">
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
            <Suspense fallback={<Loading />}>
              <NotificationsPopover />
            </Suspense>
          </Popover>
        )}
      </div>

      <div className="md:relative">
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
            <Suspense fallback={<Loading />}>
              <ProfilePopover />
            </Suspense>
          </Popover>
        )}
      </div>
    </div>
  );
}

export function RightPane({ children }: React.PropsWithChildren) {
  return (
    <div className="right-pane-container max-w-full gap-6">
      <ControlButtons />
      {children}
    </div>
  );
}
