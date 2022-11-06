import React from "react";
import Head from "next/head";
import Title from "./Title";

export default function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>

      <main className="px-6 py-4">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
}
