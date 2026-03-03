import Hero from "@/Home/Hero";
import ValueProp from "@/Home/ValueProp";
import Card from "@/Home/Card";
import UsedCar from "@/Home/UsedCar";
import Guarantees from "@/Guarantees/Guarantees";
import DiverseBusiness from "@/Home/DiverseBusiness";
export default function Home() {
  return (
    <>
      <Hero />
      <Guarantees />
      <DiverseBusiness />
      <ValueProp />
      <Card />
      <UsedCar />
    </>
  );
}
