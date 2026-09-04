import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import CaseStudiesIndex, { CaseStudyDetail } from "@/pages/CaseStudies";
import ExplorePage from "@/pages/ExplorePage";
import VideosPage from "@/pages/VideosPage";
import { Toaster } from "@/components/ui/toaster";
import { DemoModalProvider, useDemoModal } from "@/context/DemoModalContext";
import { ExperienceProvider } from "@/context/ExperienceContext";
import BookDemoModal from "@/components/BookDemoModal";
import WaveField from "@/components/WaveField";
import HashScrollHandler from "@/components/HashScrollHandler";

const GlobalDemoModal = () => {
  const { isOpen, setIsOpen } = useDemoModal();
  return <BookDemoModal open={isOpen} onOpenChange={setIsOpen} />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DemoModalProvider>
        <ExperienceProvider>
          <WaveField />
          <div className="site-grain" aria-hidden />
          <ExperienceGate />
          <HashScrollHandler />
          <div className="site-canvas">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/case-studies" element={<CaseStudiesIndex />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/videos" element={<VideosPage />} />
          </Routes>
          </div>
          <GlobalDemoModal />
        </ExperienceProvider>
        </DemoModalProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
