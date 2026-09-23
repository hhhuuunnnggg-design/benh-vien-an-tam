import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DirectoryHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
  actionLabel: string;
  actionHref: string;
  image: string;
  imageAlt: string;
};

export function DirectoryHero({
  eyebrow,
  title,
  description,
  benefits,
  actionLabel,
  actionHref,
  image,
  imageAlt,
}: DirectoryHeroProps) {
  return (
    <section className="border-b border-primary/15">
      <div className="container-shell grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <div className="max-w-3xl">
          <p className="inline-flex border-l-4 border-[#f5a623] pl-3 text-sm font-semibold text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            {description}
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-sm font-medium leading-6"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-primary"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <a
            href={actionHref}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-6")}
          >
            {actionLabel}
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="relative hidden aspect-video overflow-hidden border-4 border-white bg-card shadow-lg lg:block">
          <img src={image} alt="" />
        </div>
      </div>
    </section>
  );
}
