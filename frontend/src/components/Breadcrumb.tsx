import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb — v5.4 Design System
 * WAI-ARIA breadcrumb pattern: nav[aria-label] > ol > li.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="container-main pt-4 pb-2">
      <nav aria-label="Breadcrumb" className="text-[14px] text-text-secondary">
        <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
          <li>
            <Link href="/" className="hover:text-interactive transition-colors">
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className="text-text-disabled" aria-hidden="true">/</span>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-interactive transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-text-primary font-medium truncate max-w-[260px] sm:max-w-[360px]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
