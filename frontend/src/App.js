import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import CaseStudiesIndex, { CaseStudyDetail } from "@/pages/CaseStudies";
import ExplorePage from "@/pages/ExplorePage";
import IndustryDetail from "@/pages/IndustryDetail";
import MetricPage from "@/pages/MetricPage";
import ProductDemoPage from "@/pages/ProductDemoPage";
import GridBackdrop from "@/components/GridBackdrop";
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
      <GridBackdrop opacity={0.85} />
      <BrowserRouter>
        <DemoModalProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/case-studies" element={<CaseStudiesIndex />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/metrics/:slug" element={<MetricPage />} />
            <Route path="/product-demo" element={<ProductDemoPage />} />
          </Routes>
          <GlobalDemoModal />
        </DemoModalProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
