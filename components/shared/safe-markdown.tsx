import Image from "next/image";
import type { ReactNode } from "react";

export function SafeMarkdown({
  content,
  showImages = true,
}: {
  content: string;
  showImages?: boolean;
}) {
  const visibleContent = showImages
    ? content
    : content.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
  const blocks = parseBlocks(sanitizeMarkdown(visibleContent));

  if (!blocks.length) {
    return <p className="text-muted-foreground">Đang cập nhật</p>;
  }

  return (
    <div className="space-y-4 leading-7 text-muted-foreground">
      {blocks.map((block, index) => {
        if (block.type === "unordered-list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInline(line, showImages)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ordered-list") {
          return (
            <ol key={index} className="list-decimal space-y-2 pl-5">
              {block.lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInline(line, showImages)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={index}>
            {block.lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {renderInline(line, showImages)}
                {lineIndex < block.lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

type MarkdownBlock = {
  type: "paragraph" | "unordered-list" | "ordered-list";
  lines: string[];
};

function parseBlocks(content: string) {
  const blocks: MarkdownBlock[] = [];
  const lines = content.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    if (!lines[index].trim()) {
      index += 1;
      continue;
    }

    const unordered = lines[index].match(/^\s*[-*]\s+(.+)$/);
    const ordered = lines[index].match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const type = unordered ? "unordered-list" : "ordered-list";
      const items: string[] = [];
      while (index < lines.length) {
        const match =
          type === "unordered-list"
            ? lines[index].match(/^\s*[-*]\s+(.+)$/)
            : lines[index].match(/^\s*\d+\.\s+(.+)$/);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      blocks.push({ type, lines: items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraph });
  }

  return blocks;
}

function renderInline(value: string, showImages: boolean) {
  const tokenPattern = /(!\[([^\]]*)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(value))) {
    if (match.index > cursor) {
      nodes.push(cleanText(value.slice(cursor, match.index)));
    }
    if (match[2] !== undefined) {
      const source = getSafeImageSource(match[3]);
      nodes.push(
        source
          ? showImages
            ? (
                <Image
                  key={`${match.index}-${source}`}
                  src={source}
                  alt={cleanText(match[2])}
                  width={800}
                  height={450}
                  className="my-4 h-auto max-h-96 w-full rounded-xl border object-cover"
                />
              )
            : null
          : cleanText(match[2]),
      );
    } else {
      nodes.push(<strong key={match.index}>{cleanText(match[4])}</strong>);
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < value.length) nodes.push(cleanText(value.slice(cursor)));
  return nodes;
}

function sanitizeMarkdown(value: string) {
  return value
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function cleanText(value: string) {
  return value.replace(/\*\*/g, "");
}

function getSafeImageSource(value: string) {
  const source = value.trim();
  return source.startsWith("/") && !source.startsWith("//") ? source : null;
}
