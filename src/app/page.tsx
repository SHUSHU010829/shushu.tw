import Footer from "@/components/footer";
import SelfCard from "@/components/self-card";
import SocialLink from "@/components/social-link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background bg-dot-black/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* content */}
      <div className="flex flex-col items-center justify-center gap-8 pb-20 pt-10">
        <div className="flex flex-col items-center justify-center gap-8">
          <SelfCard />
          <SocialLink />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </main>
  );
}
