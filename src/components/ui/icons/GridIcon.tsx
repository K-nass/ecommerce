export default function GridIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            className={className}
        >
            <circle cx="7" cy="7" r="3" />
            <circle cx="17" cy="7" r="3" />
            <circle cx="7" cy="17" r="3" />
            <circle cx="17" cy="17" r="3" />
        </svg>
    );
}
