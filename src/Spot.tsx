import { useParams } from "@tanstack/react-router";
import { Card } from "./components/Card";
import { router } from "./routes";
import { ACTIVITY_COLORS, SPOTS, type Spot } from "./types";
import { CloseIcon } from "./components/icons/CloseIcon";

import { twMerge } from "tailwind-merge";
import { useSocketChat } from "./hooks/useSocketChat";

type Message = {
  sender: string;
  time: string;
  chat: string;
};

function ChatBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <div
      className={twMerge(
        isOwn ? "ml-auto bg-slate-50" : "bg-slate-100",
        "w-9/12 max-w-fit space-y-1 break-words rounded-lg  p-4 text-slate-800 shadow",
      )}
    >
      <h3 className="flex flex-row items-center gap-1 text-xs text-slate-600">
        {`${message.sender} · ${message.time}`}
      </h3>
      <p className="text-sm">{message.chat}</p>
    </div>
  );
}

function ChatBox({ spot }: { spot: Spot }) {
  const username = "EagerBadger123";
  const { messages, sendMessage, messageInputProps } = useSocketChat(
    spot.id,
    username,
  );

  return (
    <>
      <div className="no-scrollbar h-96 w-full space-y-3 overflow-auto py-4">
        {messages.map((chat) => (
          <ChatBubble message={chat} isOwn={chat.sender === username} />
        ))}
      </div>
      <form
        className="grid grid-cols-12 gap-2 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          placeholder="Say something..."
          className="col-span-9 flex h-10 w-full rounded-xl border px-3 py-2 text-sm shadow outline-blue-400"
          type="text"
          {...messageInputProps}
        />
        <button
          type="submit"
          className=" col-span-3 rounded-xl bg-blue-400 px-3 py-2 text-sm font-semibold text-white drop-shadow"
        >
          Send
        </button>
      </form>
    </>
  );
}

export function Spot() {
  const { spotId } = useParams(router.routeTree.parentRoute);
  const spot = SPOTS.find((s) => s.id === spotId);
  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor: ACTIVITY_COLORS[spot?.activity ?? "dead"],
            }}
          ></div>
          <h1 className="text-3xl font-bold">{spot?.name ?? "Not Found"}</h1>
        </div>
        <button
          type="button"
          aria-label="Leave Spot"
          onClick={() => router.navigate({ to: "/xrk4np/app" })}
          className="new-post-button"
        >
          <CloseIcon stroke="currentColor" strokeWidth={2} />
        </button>
      </div>
      {!!spot && <ChatBox spot={spot} />}
    </Card>
  );
}
