export default function SocialLink({
  href,
  icon,
  label,
  gradient,
}: {
  href: string;
  icon: any;
  label: string;
  gradient: string;
}) {
  return (
    <div className="w-full">
      <a
        className={`group relative inline-flex w-full animate-shimmer items-center overflow-hidden rounded-lg ${gradient} bg-[length:200%_100%] px-7 py-3 text-white shadow-[0_4px_14px_0_rgb(0,0,0,20%)] transition-colors duration-200 ease-linear hover:shadow-[0_6px_20px_rgba(80,80,80,30%)] active:bg-opacity-80`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <svg
            className="size-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
        <span className="flex items-center gap-5 font-rubik text-xl font-medium transition-all group-hover:ms-4">
          {icon} {label}
        </span>
      </a>
    </div>
  );
}
