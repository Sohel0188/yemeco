import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";

export const Route = createFileRoute("/home-2")({
  head: () => ({
    meta: [
      { title: "Yemico — Home 2" },
      {
        name: "description",
        content:
          "Shop fruits, vegetables, biscuits, medicine and more from local farmers and vendors. Every product is rated by a certified nutritionist.",
      },
      { property: "og:title", content: "Yemico — Home 2" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomeTwo,
});

function HomeTwo() {
  return <HomePage square />;
}
