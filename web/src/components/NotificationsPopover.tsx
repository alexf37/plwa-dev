const notifs = [
  {
    id: 1,
    text: "EagerBadger123 commented on one of your posts",
    timestamp: "12 minutes ago",
  },
  { id: 2, text: "NotJimRyan liked your post", timestamp: "46 minutes ago" },
  {
    id: 3,
    text: "Milkman47 replied to your comment on someone else's post",
    timestamp: "3 hours ago",
  },
] as const;

export function NotificationsPopover() {
  return (
    <div className="no-scrollbar max-h-72 divide-y divide-slate-200 overflow-y-auto">
      {notifs.map((notif) => (
        <div className="py-3 text-sm" key={notif.id}>
          <small className="text-xs text-slate-500">{`${notif.timestamp}`}</small>
          <p className="text-slate-900">{notif.text}</p>
        </div>
      ))}
    </div>
  );
}
