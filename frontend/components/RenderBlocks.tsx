"use client";

import React from "react";
import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Methodology from "./Methodology";
import QuoteSlider from "./QuoteSlider";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Section from "./Section";

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

  const getPaddingClass = (padding: string) => {
    if (padding === "none") return "py-0";
    if (padding === "small") return "py-6 md:py-10";
    return "py-12 md:py-20"; // normal (default)
  };

  return (
    <>
      {blocks.map((block, index) => {
        // --- WRAPPER BLOCKS ---
        if (block.blockType === "oneColumn") {
          return (
            <Section key={index} variant={block.background || "cream"} className={getPaddingClass(block.padding)}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RenderBlocks blocks={block.column} />
              </div>
            </Section>
          );
        }

        if (block.blockType === "twoColumn") {
          // Parse ratio (e.g. "1/2-1/2" or "1/3-2/3")
          let leftClass = "col-span-12 md:col-span-6";
          let rightClass = "col-span-12 md:col-span-6";
          
          if (block.ratio === "1/3-2/3") {
            leftClass = "col-span-12 md:col-span-4";
            rightClass = "col-span-12 md:col-span-8";
          } else if (block.ratio === "2/3-1/3") {
            leftClass = "col-span-12 md:col-span-8";
            rightClass = "col-span-12 md:col-span-4";
          } else if (block.ratio === "1/4-3/4") {
            leftClass = "col-span-12 md:col-span-3";
            rightClass = "col-span-12 md:col-span-9";
          } else if (block.ratio === "3/4-1/4") {
            leftClass = "col-span-12 md:col-span-9";
            rightClass = "col-span-12 md:col-span-3";
          }

          return (
            <Section key={index} variant={block.background || "cream"} className={getPaddingClass(block.padding)}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-8 md:gap-12">
                  <div className={leftClass}>
                    <RenderBlocks blocks={block.leftColumn} />
                  </div>
                  <div className={rightClass}>
                    <RenderBlocks blocks={block.rightColumn} />
                  </div>
                </div>
              </div>
            </Section>
          );
        }

        if (block.blockType === "threeColumn") {
          return (
            <Section key={index} variant={block.background || "cream"} className={getPaddingClass(block.padding)}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  <div>
                    <RenderBlocks blocks={block.leftColumn} />
                  </div>
                  <div>
                    <RenderBlocks blocks={block.middleColumn} />
                  </div>
                  <div>
                    <RenderBlocks blocks={block.rightColumn} />
                  </div>
                </div>
              </div>
            </Section>
          );
        }

        // --- CONTENT BLOCKS ---
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
              <div key={index} className="bg-red-100 p-4 rounded-md">
                Ismeretlen blokk: {block.blockType}
              </div>
            );
        }
      })}
    </>
  );
}
