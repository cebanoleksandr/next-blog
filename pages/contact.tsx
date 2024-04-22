import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Send me your messages!" />
      </Head>
      <ContactForm />
    </>
  );
}
