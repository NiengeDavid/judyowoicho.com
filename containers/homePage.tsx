import Layout from "@/components/layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="text-black mx-auto">
        <h1 className="text-4xl text-nowrap font-normal font-oswald text-primary/90 mb-4">Gift ideas for dads & grads</h1>
        <img
          src="/assets/gift.jpg"
          alt="Steal Like an Artist"
          className="mb-4"
        />
        <p>
          It's what folks in the book industry call “Dads & Grads” season...
        </p>
      </div>
    </Layout>
  );
}
