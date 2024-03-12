"use client";
import Avatar from "@/components/avatar";
import fetcher, { API_ENDPOINT } from "@/libs/fetch";
import Link from "next/link";
import useSWR from "swr";

const AVATAR_URL: string =
  "https://cdn.discordapp.com/avatars/739702692393517076/b9fddaa026c1002e8c7d4d8f22978e43.png?size=1024";

interface UserStatus {
  status: "online" | "offline";
}

export default function Home() {
  const { data, error, isLoading } = useSWR<UserStatus>(`${API_ENDPOINT}/status`, fetcher);
  if (isLoading) return <p>Loading</p>
  if (error) return <p>{`Error: ${error}`}</p>
  return (
    <main className="h-screen">
      <div className="flex h-full flex-col items-center justify-center space-y-2">
        <Avatar status={data?.status} src={AVATAR_URL} />
        <h1 className="text-center text-3xl font-bold">tuna2134</h1>
        <span>アニメなどの趣味に没頭する豚です</span>
        <Link href="/home" className="rounded bg-lime-700 px-6 py-2 text-white">
          Go!!!
        </Link>
      </div>
    </main>
  );
}
