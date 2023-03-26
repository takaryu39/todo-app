import {
  DocumentTextIcon,
  LogoutIcon,
  StatusOfflineIcon,
} from "@heroicons/react/solid";
import { NextPage } from "next";
import { useQueryClient } from "react-query";
import Layout from "../components/Layout";
import { NoticeForm } from "../components/NoticeForm";
import { NoticeList } from "../components/NoticeList";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { supabase } from "../utils/supabase";

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient();

  const signOut = () => {
    supabase.auth.signOut();
    queryClient.removeQueries("todos");
    queryClient.removeQueries("notices");
  };
  return (
    <Layout title="Dashboard">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <div className="grid grid-cols-2 gap-40">
        <div className="">
          <div className="my-3 flex justify-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
          </div>
          <TaskForm />
          <TaskList />
        </div>
        <div className="">
          <div className="my-3 flex justify-center">
            <StatusOfflineIcon className="h-8 w-8 text-blue-500" />
          </div>
          <NoticeForm />
          <NoticeList />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
