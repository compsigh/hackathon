import Image from "next/image";
import Link from "next/link";
import { ProtoMono } from "../fonts";

interface LogoBrandProps {
  href?: string;
  target?: string;
  rel?: string;
}

export function LogoBrand({ href = "/", target, rel }: LogoBrandProps) {
  const LinkComponent = href.startsWith("http") ? "a" : Link;
  const linkProps = href.startsWith("http")
    ? { href, target, rel }
    : { href: href as "/" };

  return (
    <div className="absolute top-0 left-0 z-10 p-4">
      <LinkComponent
        {...linkProps}
        className="flex h-10 cursor-pointer items-center space-x-3 hover:underline"
      >
        <Image
          src="/compsigh-logo-glowing.png"
          alt="deploy 25"
          width={100}
          height={100}
          className="h-full w-auto"
        />
        <span
          className={`text-xl tracking-tight [text-shadow:0_0_10px_var(--color-compsigh-60)] sm:text-2xl ${ProtoMono.className}`}
        >
          <span className="animate-[fade_2s_linear_infinite]">►</span>DEPLOY/
          <span className="text-[var(--color-compsigh)]">25</span>
        </span>
      </LinkComponent>
    </div>
  );
}
