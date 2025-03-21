import CategorySlider from "../components/CategorySlider";
import LastTrailers from "../components/header/lastTrailers";
import Footer from "../components/Footer";
import Header from "../components/header/header";
import HeaderSlider from "../components/header/HeaderSlider";

export default function IndexLayout() {
  return (
    <div>
      <Header />
      <HeaderSlider />
      <LastTrailers />
      <CategorySlider />
      <Footer />
    </div>
  );
}
