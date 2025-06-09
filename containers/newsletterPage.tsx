import Layout from "@/components/layout";

export default function NewsletterPage() {
  return (
    <section className="w-full">
      <Layout className="my-6 lg:px-4">
        <h2 className="text-4xl font-normal font-oswald mb-6 text-primary">
          Subscribe to my newsletter
        </h2>
        <div className="w-full mb-6">
          <iframe
            src="https://syntax001.substack.com/embed"
            width="480"
            height="320"
            // style="border:1px solid #EEE; background:white;"
            className="w-full h-80 border bg-white"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
        <span className="text-lg text-primary font-normal py-2">
          Not ready to sign up yet?{" "}
          <a
            href="http://syntax001.substack.com/archives"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            You can read all the issues here.
          </a>
        </span>
      </Layout>
    </section>
  );
}
