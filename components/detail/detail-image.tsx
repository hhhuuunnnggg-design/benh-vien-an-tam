"use client";

import Image from "next/image";
import { useState } from "react";

export function DetailImage({
  src,
  fallbackSrc,
  alt,
  unoptimized = false,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  unoptimized?: boolean;
}) {
  const [source, setSource] = useState(src.trim() || fallbackSrc);

  return (
    <Image
      src={source}
      alt={alt}
      fill
      preload
      unoptimized={unoptimized}
      sizes="(min-width: 1024px) 42vw, 100vw"
      className="object-cover"
      onError={() => setSource(fallbackSrc)}
    />
  );
}
