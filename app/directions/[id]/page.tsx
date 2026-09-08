import { notFound } from "next/navigation";
import { DesignSite } from "@/components/brand/DesignSite";
import { directions } from "@/lib/directions";

export const dynamicParams = false;
export function generateStaticParams() {
  return directions.map(({ id }) => ({ id }));
}
export default async function DirectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const direction = directions.find((d) => d.id === id);
  if (!direction) notFound();
  return <DesignSite direction={direction} />;
}
