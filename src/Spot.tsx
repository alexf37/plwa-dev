import { useParams } from "@tanstack/react-router";
import { Card } from "./components/Card";
import { router } from "./routes";
import { ACTIVITY_COLORS, SPOTS, type Spot } from "./types";
import { CloseIcon } from "./components/icons/CloseIcon";

import { socket } from "./socket";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Message = {
  sender: string;
  time: string;
  chat: string;
};

type MessageResponse = {
  type: string;
  name: string;
  value: string;
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
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState<Message[]>([]);

  useEffect(() => {
    socket.disconnect();
    socket.connect();
    socket.emit("join", { room: spot.id, name: "EagerBadger123" });
    return () => {
      socket.disconnect();
      setChats([]);
    };
  }, [spot]);

  useEffect(() => {
    function onChat(value: MessageResponse) {
      if (value.type !== "chat") return;
      const chatMessage = {
        sender: value.name,
        time: new Date().toLocaleTimeString().replace(/:\d\d /, " "),
        chat: value.value,
      };
      setChats((prev) => [...prev, chatMessage]);
    }

    function onJoin(value: string) {
      const joinMessage = {
        chat: `${value} has joined.`,
        sender: "Server",
        time: new Date().toLocaleTimeString().replace(/:\d\d /, " "),
      };
      setChats((prev) => [...prev, joinMessage]);
    }

    socket.on("join", onJoin);
    socket.on("message", onChat);
  }, []);

  return (
    <>
      <div className="no-scrollbar h-96 w-full space-y-3 overflow-auto py-4">
        {chats.map((chat) => (
          <ChatBubble message={chat} isOwn={chat.sender === "EagerBadger123"} />
        ))}
      </div>
      <form
        className="grid grid-cols-12 gap-2 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("message", {
            type: "chat",
            name: "EagerBadger123",
            value: inputValue,
          });
          setInputValue("");
        }}
      >
        <input
          placeholder="Say something..."
          className="col-span-9 flex h-10 w-full rounded-xl border px-3 py-2 text-sm shadow outline-blue-400"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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