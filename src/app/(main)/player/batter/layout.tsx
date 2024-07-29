import Banner from '@/components/player/Banner';

export default function BatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-black">
        <div className="pt-20 max-lg:pt-[13vw]">
          <Banner />
        </div>
        {children}
      </div>
    </>
  );
}