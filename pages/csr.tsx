import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Notice, Task } from "../types/types";
import { supabase } from "../utils/supabase";
const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      setTasks(tasks as Task[]);
    };
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });
      setNotices(notices as Notice[]);
    };
    getTasks();
    getNotices();
  }, []);
  const router = useRouter();
  return (
    <Layout title="SSG + ICR">
      <p>SSG</p>
      <h2 className="text-lg font-bold">Task</h2>
      <ul className="mb-6 flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.id} className="font-bold ">
            {task.title}
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold">Notices</h2>
      <ul className="flex flex-col gap-2">
        {notices.map((notice) => (
          <li key={notice.id}>{notice.content}</li>
        ))}
      </ul>
      <div className="mt-10">
        <p className="text-center">Linkコンポーネント</p>
        <Link href="/ssr" className="text-xs">
          Link to Ssr
        </Link>
        <Link href="/icr" className="ml-5 text-xs">
          Link to Icr
        </Link>
      </div>
      <div className="">
        <p className="text-center">router</p>
        <button onClick={() => router.push("/ssr")} className="text-xs">
          Route to Ssr
        </button>
        <button onClick={() => router.push("/icr")} className="ml-5 text-xs">
          Route to Isr
        </button>
      </div>
    </Layout>
  );
};

export default Csr;
