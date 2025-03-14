import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Title } from "../components/title/title";
import { Rule } from "../components/rule/rule";
import "../components/rule/style.css";
import "../components/title/style.css";

export default component$(() => {
  return (
    <>
      <Title />
      <Rule />
    </> 
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
