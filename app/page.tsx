import { IntroViewport } from "@/components/IntroViewport";
import { ScrollStage } from "@/components/ScrollStage";

export default function Home() {
  return (
    <ScrollStage trackClassName="min-h-[750vh] bg-[#1e3344]">
      <IntroViewport />
    </ScrollStage>
  );
}
