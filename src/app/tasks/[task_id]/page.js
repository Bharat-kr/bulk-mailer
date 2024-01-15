"use client";
import DataMapper from "@/components/DataMapper";
import Loading from "@/components/Loading";
import RefreshButton from "@/components/RefreshButton";
import { useFile } from "@/context/FileContext";
import { statusAll } from "@/utils/statusAll";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { task_id } = params;
  const { setMailList, mailList } = useFile();
  const [loading, setLoading] = useState(false);

  const getStatus = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`/api/tasks/${task_id}`);
      console.log(result);
      setMailList(result.data.leads);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getStatus();
  }, [task_id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!statusAll(mailList)) {
        await getStatus();
      } else {
        clearInterval(interval);
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [mailList]);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-end gap-4  mb-6">
        <p className="flex items-center justify-center px-2 py-1 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          {loading
            ? "Please wait updating the progress..."
            : "The data will get Refreshed every 5 mins :)"}
        </p>
        {loading ? <Loading /> : <RefreshButton refresh={getStatus} />}
      </div>
      <DataMapper />
    </div>
  );
};

export default Page;
