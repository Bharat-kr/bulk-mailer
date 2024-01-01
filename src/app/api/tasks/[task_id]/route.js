import { NextResponse } from "next/server";

//utils and helpers
import redisHelper from "@/helpers/redis";
import generateRedisKeyNames from "@/utils/redisKeyNames";

export async function GET(req, { params }) {
  try {
    const task_id = params.task_id;

    const [redisData, redisErr] = await redisHelper.getValue(
      generateRedisKeyNames.task(task_id)
    );

    if (redisErr) {
      return NextResponse.json({ error: "Task Not Found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        leads: JSON.parse(redisData),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
