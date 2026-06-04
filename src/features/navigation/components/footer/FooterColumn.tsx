import { Link } from "@/i18n/navigation";
import type { FooterColumn as FooterColumnType } from "../../types";

interface Props {
  column: FooterColumnType;
  cookieSettingsLabel?: string;
}

export default function FooterColumn({ column, cookieSettingsLabel }: Props) {
  if (!column.links.length) return null;

  return (
    <div>
      <h3 className="mb-4 text-xs leading-normal font-bold text-white">{column.title}</h3>
      <ul>
        {column.links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.slug}
              className="text-xs leading-normal font-normal text-white transition-colors hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {cookieSettingsLabel && (
        <button
          type="button"
          className="mt-3 block text-left text-xs leading-normal font-normal text-white underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          {cookieSettingsLabel}
        </button>
      )}
    </div>
  );
}
