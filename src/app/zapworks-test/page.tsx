import dynamic from "next/dynamic";

const DynamicZapworks = dynamic(() => import("@/app/zapworks-test/Zapworks"), {
  loading: () => <div>Cargando...</div>,
  ssr: false,
});

export default function ZapworksTestPage() {
  return (
    <main>
      <DynamicZapworks/>
    </main>
  );
}
