import CategorySlider from "../components/CategorySlider";
import Footer from "../components/Footer";
import Header from "../components/header/header";
import HeaderSlider from "../components/header/HeaderSlider";

export default function IndexLayout() {
  return (
    <div>
      <Header />
      <HeaderSlider />
      <CategorySlider />
      <Footer />
    </div>
  );
}
