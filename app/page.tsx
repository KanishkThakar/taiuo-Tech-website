import { DesignSite } from "@/components/brand/DesignSite";
import { directions } from "@/lib/directions";

export default function Home() {
  return <DesignSite direction={directions[2]} />;
}
