import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import CaseStudiesIndex, { CaseStudyDetail } from "@/pages/CaseStudies";
import ExplorePage from "@/pages/ExplorePage";
import { Toaster } from "@/components/ui/toaster";
import { DemoModalProvider, useDemoModal } from "@/context/DemoModalContext";
import BookDemoModal from "@/components/BookDemoModal";

const GlobalDemoModal = () => {
  const { isOpen, setIsOpen } = useDemoModal();
  return <BookDemoModal open={isOpen} onOpenChange={setIsOpen} />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DemoModalProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/case-studies" element={<CaseStudiesIndex />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
          <GlobalDemoModal />
        </DemoModalProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
