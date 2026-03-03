import CarDetails from "@/Home/Cardetails/CarDetails";

// Force static rendering parameter if needed, but here it's fine as dynamic or static
export default function CarPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen pt-[70px] md:pt-[90px]" style={{ background: "var(--background)" }}>
      <CarDetails id={params.id} />
    </main>
  );
}
