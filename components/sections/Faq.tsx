"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { trackEvent } from "@/lib/analytics";
import { FAQ, FAQ_CATEGORIES } from "@/lib/data";

/** 3.14 — FAQ with category tabs + single-open animated accordion. */
export default function Faq() {
  return (
    <section className="section-pad bg-white" id="faq">
      <div className="container-x">
        <Reveal stagger className="mx-auto max-w-[640px] text-center">
          <h2 className="h2-display">Frequently asked questions</h2>
          <p className="mt-[18px] text-body">
            Have more questions? Reach us at{" "}
            <a href="mailto:hello@taiuo.tech" className="underline underline-offset-[3px]">
              hello@taiuo.tech
            </a>
          </p>
        </Reveal>

        <Tabs.Root
          defaultValue="General"
          onValueChange={(category) => trackEvent({ name: "faq_tab", props: { category } })}
        >
          <Reveal>
            <Tabs.List
              className="mt-12 flex flex-wrap justify-center gap-2.5"
              aria-label="FAQ categories"
            >
              {FAQ_CATEGORIES.map((cat) => (
                <Tabs.Trigger key={cat} value={cat} className="pill-tab">
                  {cat}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Reveal>

          {FAQ_CATEGORIES.map((cat) => (
            <Tabs.Content key={cat} value={cat} className="outline-none">
              <Accordion.Root
                type="single"
                collapsible
                defaultValue="item-0"
                className="mx-auto mt-9 flex max-w-[768px] flex-col gap-3"
              >
                {FAQ.filter((f) => f.cat === cat).map((f, i) => (
                  <Accordion.Item
                    key={f.q}
                    value={`item-${i}`}
                    className="card overflow-hidden transition-[border-color,box-shadow] duration-300 ease-smooth data-[state=closed]:hover:border-sage-base/30 data-[state=open]:border-sage-base/40 data-[state=open]:shadow-card"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[1.06rem] font-medium">
                        <span>{f.q}</span>
                        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-cream text-body transition-colors duration-300 group-data-[state=open]:bg-ink group-data-[state=open]:text-white">
                          <ChevronDown
                            className="accordion-chevron h-4 w-4"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion-content">
                      <p className="px-6 pb-5 text-[15.5px] leading-relaxed text-body">{f.a}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
