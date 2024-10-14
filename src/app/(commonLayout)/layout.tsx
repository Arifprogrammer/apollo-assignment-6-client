import { Navbar } from "@/src/components/shared/navbar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <main>{children}</main>
    </section>
  );
}
