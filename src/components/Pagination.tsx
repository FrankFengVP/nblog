import Link from "next/link";
import { formatMessage } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import { pageHref } from "@/lib/pagination";

type PaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  dict: Dictionary;
};

function pageNumbers(current: number, total: number): number[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);
  return [...pages].sort((a, b) => a - b);
}

export function Pagination({ basePath, page, totalPages, dict }: PaginationProps) {
  if (totalPages <= 1) return null;

  const { prev, next, pageOf, navLabel, ellipsis } = dict.pagination;
  const numbers = pageNumbers(page, totalPages);

  return (
    <nav className="pagination" aria-label={navLabel}>
      {page > 1 ? (
        <Link href={pageHref(basePath, page - 1)} className="pagination-control">
          ← {prev}
        </Link>
      ) : (
        <span className="pagination-control pagination-control--disabled" aria-hidden>
          ← {prev}
        </span>
      )}

      <ol className="pagination-pages">
        {numbers.map((n, index) => {
          const prevNum = numbers[index - 1];
          const showEllipsis = index > 0 && prevNum !== undefined && n - prevNum > 1;

          return (
            <li key={n} className="pagination-pages-item">
              {showEllipsis ? (
                <span className="pagination-ellipsis" aria-hidden>
                  {ellipsis}
                </span>
              ) : null}
              {n === page ? (
                <span className="pagination-page pagination-page--current" aria-current="page">
                  {n}
                </span>
              ) : (
                <Link href={pageHref(basePath, n)} className="pagination-page">
                  {n}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <p className="pagination-summary">
        {formatMessage(pageOf, { page, total: totalPages })}
      </p>

      {page < totalPages ? (
        <Link href={pageHref(basePath, page + 1)} className="pagination-control">
          {next} →
        </Link>
      ) : (
        <span className="pagination-control pagination-control--disabled" aria-hidden>
          {next} →
        </span>
      )}
    </nav>
  );
}
