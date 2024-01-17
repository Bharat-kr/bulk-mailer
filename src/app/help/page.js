import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-3 items-start px-4 mb-10 font-colour">
      <ThemeToggle />
      <h1 className="text-3xl font-bold text-center w-full">
        Creating an app password for Gmail
      </h1>
      <p className="text-lg">
        What you'll need: To create an app password, you'll need a valid Gmail
        account. I'll assume you do have 2FA enabled and are looking to connect
        an app to Gmail.
      </p>
      <h2 className="text-2xl font-bold">1. Log in to your Google account</h2>
      <p className="text-lg">
        The first thing to do is open a web browser and log in to your Google
        account.
      </p>
      <h2 className="text-2xl font-bold">2. Go to My Account/App Passwords</h2>
      <p className="text-lg">
        Point your web browser to{" "}
        <a
          href="https://myaccount.google.com/apppasswords"
          target="_blank"
          className="hover:underline text-blue-900"
        >
          https://myaccount.google.com/apppasswords
        </a>
        . Even though you just logged in to your account, you'll most likely be
        prompted to type your account password again.
      </p>
      <h2 className="text-2xl font-bold">3. Create your first app password</h2>
      <p className="text-lg">
        At the bottom you will see a input box to create a new app password. You
        can just type the name of app and click on Create.
      </p>
      <Image
        src="/app_password.png"
        alt="App password image"
        width={500}
        height={100}
        style={{
          width: "70%",
          height: "auto",
          alignSelf: "center",
          borderRadius: "10px",
        }}
      />
      <h2 className="text-2xl font-bold"> 4. Copy your new app password</h2>
      <p className="text-lg">
        After you click GENERATE, a new pop-up window will appear giving your
        new app password. Copy that password so you can use it for the
        third-party app or service you want to connect to Gmail. Once you have
        the password copied, click DONE.
      </p>
    </div>
  );
};

export default page;
