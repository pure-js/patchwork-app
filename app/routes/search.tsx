import type { Route } from "./+types/home";
import { Welcome } from "~/components/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search Page" },
    { name: "description", content: "You can search for whatever you want!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
