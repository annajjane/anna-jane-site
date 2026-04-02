import { IntroStack } from "@/components/IntroStack";
import { ScrollStage } from "@/components/ScrollStage";

export default function Home() {
  return (
    <ScrollStage trackClassName="min-h-[400vh] bg-[#1e3344]">
      <IntroStack />
    </ScrollStage>
  );
}

