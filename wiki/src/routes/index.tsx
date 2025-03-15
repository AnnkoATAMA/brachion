import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Title } from "../components/title/title";
import { Rule } from "../components/rule/rule";
import { Binary } from "../components/binary/binary";
import "../components/rule/style.css";
import "../components/title/style.css";
import "../components/binary/style.css";

export default component$(() => {
  return (
    <>
      <Title />
      <Rule />
      <Binary />
    </>
  );
});

export const head: DocumentHead = {
  title: "バイナリ麻雀wiki",
  meta: [
    {
      name: "description",
      content: "バイナリ麻雀についての情報をまとめたwikiです。",
    },
  ],
};
