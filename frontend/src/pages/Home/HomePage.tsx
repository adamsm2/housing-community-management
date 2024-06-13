import ImageSwiperSection from "@/pages/Home/ImageSwiperSection.tsx";
import IntroductionSection from "@/pages/Home/IntroductionSection.tsx";
import UserPanelPresentationSection from "@/pages/Home/UserPanelPresentationSection.tsx";

const HomePage = () => {
  return (
    <div className="mb-40">
      <IntroductionSection />
      <ImageSwiperSection />
      <UserPanelPresentationSection />
    </div>
  );
};

export default HomePage;