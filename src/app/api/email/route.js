// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

//utils and helpers
import redisHelper from "@/helpers/redis";
import generateRedisKeyNames from "@/utils/redisKeyNames";

//templates
import ContactTemplate from "../../../emails/ContactTemplate";

export async function POST(req) {
  try {
    let { email, password, leads } = await req.json();

    const task_id = nanoid();
    
    leads = leads.map((element) => {
      element.send_completed = false;
      return element;
    });

    const [_, redisErr] = await redisHelper.setWithExpiry(
      generateRedisKeyNames.task(task_id),
      JSON.stringify(leads),
      leads.length * 5 * 60 * 1000
    );

    if (redisErr) {
      return NextResponse.json(
        { error: "Error while scheduling tasks" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    let currentLeadIndex = 0;

    const intervalId = setInterval(async () => {
      if (currentLeadIndex < leads.length) {
        const lead = leads[currentLeadIndex];
        const mailOptions = {
          from: email, // sender address
          to: lead.email,
          subject: `Message from - ${lead.name}`, // Subject line
          html: render(
            ContactTemplate({
              name: lead.name,
              email: lead.email,
              message: "message",
            })
          ),
        };
        await transporter.sendMail(mailOptions);
        leads[currentLeadIndex].send_completed = true;

        //updating redis
        const [_, redisErr] = await redisHelper.setWithExpiry(
          generateRedisKeyNames.task(task_id),
          JSON.stringify(leads),
          0
        );

        if (redisErr) {
          console.log(redisErr);
        }
        currentLeadIndex++;
      } else {
        clearInterval(intervalId); // Stop the interval when all leads are processed
      }
    }, 30 * 1000);

    return NextResponse.json(
      { msg: "All Scheduled", leads, task_id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function GET(req) {
  return Response.json({ msg: "Working All Right 😃" });
}
