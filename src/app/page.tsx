import { LanguageProvider } from "./context/LanguageContext";
import PortfolioHome from "./home/page";

export default function Home() {
  return (
    <LanguageProvider>
      <PortfolioHome />
    </LanguageProvider>
  );
}