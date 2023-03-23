import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layout";
import { supabase } from "../utils/supabase";
import { Notice, Task } from "../types/types";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("getServerSideProps /ssg invoked");

  const { data: tasks } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });

  return {
    props: {
      tasks,
      notices,
    },
  };
};
type ServerSideProps = {
  tasks: Task[];
  notices: Notice[];
};

const Ssr: NextPage<ServerSideProps> = ({ tasks, notices }) => {
  const router = useRouter();
  return (
    <Layout title="Ssg">
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
        <Link href="/ssg" className="text-xs">
          Link to Ssg
        </Link>
        <Link href="/isr" className="ml-5 text-xs">
          Link to Isr
        </Link>
      </div>
      <div className="">
        <p className="text-center">router</p>
        <button onClick={() => router.push("/ssg")} className="text-xs">
          Route to Ssg
        </button>
        <button onClick={() => router.push("/isr")} className="ml-5 text-xs">
          Route to Isr
        </button>
      </div>
    </Layout>
  );
};

export default Ssr;
