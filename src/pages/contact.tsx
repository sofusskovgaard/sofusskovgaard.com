import React, { useState } from "react";
import { observer } from "mobx-react";
import { action, computed, makeObservable, observable } from "mobx";
import Head from "next/head";
import dynamic from "next/dynamic";
import cx from "classnames";

// utils
import { useStores } from "utils/stores";
import nameof from "utils/types/nameof";

// components
const Container = dynamic(() => import("components/container"));

class ViewState {
  name = "";
  email = "";
  subject = "";
  message = "";

  sending = false;
  success: boolean | null = null;

  constructor() {
    makeObservable(this, {
      name: observable,
      email: observable,
      subject: observable,
      message: observable,

      sending: observable,
      success: observable,

      disabled: computed,
      form: computed,
      resetForm: action,
      submit: action,
    });
  }

  get disabled() {
    return (
      this.name.length == 0 ||
      this.email.length == 0 ||
      this.subject.length == 0 ||
      this.message.length == 0 ||
      this.success != null ||
      this.sending
    );
  }

  get form() {
    return {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
    };
  }

  resetForm() {
    this.name = "";
    this.email = "";
    this.subject = "";
    this.message = "";
  }

  async submit() {
    this.sending = true;

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(this.form),
    });

    const json = await response.json();
    this.success = json.success;

    this.sending = false;
  }
}

const Contact = observer(() => {
  const stores = useStores();
  const [viewState] = useState(new ViewState());

  return (
    <Container>
      <Head>
        <title>Contact — {stores.uiStore.app_name}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex flex-col md:flex-row gap-10">
        <section className="flex-1 flex flex-col items-start gap-4">
          <div className="w-full flex items-center">
            <h1 className="font-bold text-4xl">Get in touch</h1>
            <span className="flex-1 my-auto inline-block w-100 border-b border-gray-200 ml-4"></span>
          </div>

          <p>
            Got an interesting project, some feedback or maybe even an idea?
            Don&apos;t hesitate to hit me up. I&apos;m looking forward to
            hearing from you.
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
              value={viewState.name}
              onChange={(e) => (viewState.name = e.target.value)}
              type="text"
              name="name"
              className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm"
              placeholder="John Doe"
              readOnly={viewState.success != null}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block font-medium mb-1">Email</label>
            <input
              value={viewState.email}
              onChange={(e) => (viewState.email = e.target.value)}
              type="email"
              name="email"
              className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm"
              placeholder="john.doe@mail.com"
              readOnly={viewState.success != null}
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Subject</label>
            <input
              value={viewState.subject}
              onChange={(e) => (viewState.subject = e.target.value)}
              type="text"
              name="subject"
              className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm"
              placeholder="Message of the utmost importance"
              readOnly={viewState.success != null}
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Message</label>
            <textarea
              value={viewState.message}
              onChange={(e) => (viewState.message = e.target.value)}
              name="message"
              className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm"
              rows={9}
              placeholder="Hello there."
              readOnly={viewState.success != null}
            />
          </div>
          <button
            onClick={viewState.submit.bind(viewState)}
            className={cx(
              "col-span-2 px-4 py-2 font-medium rounded bg-gray-100 hover:bg-black focus:bg-black text-black hover:text-white focus:text-white hover:shadow-xl transition-color duration-200",
              viewState.disabled &&
                "cursor-default bg-black text-white !shadow-none"
            )}
            disabled={viewState.disabled}
          >
            {viewState.success != null
              ? viewState.success
                ? "Message sent successfully."
                : "An error occured, sorry."
              : "Send message"}
          </button>
        </section>
      </div>
    </Container>
  );
});

export default Contact;
