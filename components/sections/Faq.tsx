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
                className="mx-auto mt-9 max-w-[768px]"
              >
                {FAQ.filter((f) => f.cat === cat).map((f, i) => (
                  <Accordion.Item key={f.q} value={`item-${i}`} className="border-b border-line">
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-[22px] text-left text-[1.06rem] font-medium">
                        <span>{f.q}</span>
                        <ChevronDown
                          className="accordion-chevron h-5 w-5 flex-none text-body"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion-content">
                      <p className="pb-6 text-[15.5px] text-body">{f.a}</p>
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
