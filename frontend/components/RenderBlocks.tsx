"use client";

import React from "react";
import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Methodology from "./Methodology";
import QuoteSlider from "./QuoteSlider";
import Services from "./Services";
import Testimonials from "./Testimonials";

const asText = (value: unknown) => {
  if (typeof value !== "string") {
    return undefined;
  }

  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export default function RenderBlocks({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "hero":
            return <Hero key={index} />;

          case "quoteSlider":
            return (
              <QuoteSlider
                key={index}
                items={Array.isArray(block.items)
                  ? block.items.map((item: any) => ({
                      icon: asText(item?.icon) || "Award",
                      tag: asText(item?.tag) || "",
                      title: asText(item?.title) || "",
                      desc: asText(item?.desc) || "",
                    }))
                  : undefined}
              />
            );

          case "services":
            return <Services key={index} />;

          case "about":
            return <About key={index} />;

          case "methodology":
            return <Methodology key={index} />;

          case "testimonials":
            return <Testimonials key={index} />;

          case "contact":
            return <Contact key={index} />;

          default:
            return (
              <div key={index} className="bg-red-100 p-4">
                Ismeretlen blokk: {block.blockType}
              </div>
            );
        }
      })}
    </div>
  );
}
