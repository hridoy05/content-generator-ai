import { Button } from "@/components/ui/button";
import { runAi } from "./actions/ai";


export default function Home() {
  return (
    <>
      <div>{runAi("write a 200 wrod blog")}</div>
      <Button>Button</Button>
      </>
  );
}
