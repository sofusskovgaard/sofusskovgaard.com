import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import cx from "classnames";

// utils
import { APP_NAME } from "utils/constants";
// components
const Container = dynamic(() => import("components/container"));

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const disabled =
    name.length === 0 ||
    email.length === 0 ||
    subject.length === 0 ||
    message.length === 0 ||
    success != null ||
    sending;

  const submit = async () => {
    setSending(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ name, email, subject, message }),
    });

    const json = await response.json();
    setSuccess(json.success);

    setSending(false);
  };

  return (
    <Container>
      <Head>
        <title>{`Contact — ${APP_NAME}`}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex flex-col md:flex-row gap-10">
        <section className="flex-1 flex flex-col items-start gap-4">
          <div className="w-full flex items-center">
            <h1 className="font-bold text-4xl">Get in touch</h1>
            <span className="flex-1 my-auto inline-block w-100 border-b border-gray-200 ml-4"></span>
          </div>

          <p>
            Got an interesting project, some feedback or maybe even an idea? Don&apos;t hesitate to
            hit me up. I&apos;m looking forward to hearing from you.
          </p>

          <a
            className="font-medium underline active:text-decoration-style-dotted hover:text-decoration-style-dotted focus:text-decoration-style-dotted"
            href="mailto:hello@skovgaard.io"
          >
            hello@skovgaard.io
          </a>
        </section>
        <section className="flex-1 grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              className="focus:outline-hidden focus:ring-3 focus:ring-gray-100 p-4 w-full rounded-sm text-sm"
              placeholder="John Doe"
              readOnly={success != null}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className="focus:outline-hidden focus:ring-3 focus:ring-gray-100 p-4 w-full rounded-sm text-sm"
              placeholder="john.doe@mail.com"
              readOnly={success != null}
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              name="subject"
              className="focus:outline-hidden focus:ring-3 focus:ring-gray-100 p-4 w-full rounded-sm text-sm"
              placeholder="Message of the utmost importance"
              readOnly={success != null}
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              className="focus:outline-hidden focus:ring-3 focus:ring-gray-100 p-4 w-full rounded-sm text-sm"
              rows={9}
              placeholder="Hello there."
              readOnly={success != null}
            />
          </div>
          <button
            onClick={submit}
            className={cx(
              "col-span-2 px-4 py-2 font-medium rounded-sm bg-gray-100 hover:bg-black focus:bg-black text-black hover:text-white focus:text-white hover:shadow-xl transition-color duration-200",
              disabled && "cursor-default bg-black text-white !shadow-none"
            )}
            disabled={disabled}
          >
            {success != null
              ? success
                ? "Message sent successfully."
                : "An error occured, sorry."
              : "Send message"}
          </button>
        </section>
      </div>
    </Container>
  );
};

export default Contact;
