import HeroSection from "@/components/HeroSection";
import QuestionPosts from "@/components/QuestionPosts";

export default function Home() {
  return (
    <div className="bg-[#252627] flex flex-col min-h-screen">
      <div className="flex flex-col pt-10 px-5 md:px-20 gap-y-10 pb-20">
        <HeroSection />
        <QuestionPosts />
      </div>
    </div>
  );
}
