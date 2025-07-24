import { FaGithub } from "react-icons/fa";

/**
 * Static footer component with author credit and GitHub link.
 *
 * No props, no dynamic data except the current year.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark flex flex-1 flex-col justify-center gap-4 rounded-xl px-2 py-2 sm:px-3 sm:py-3">
      <div className="font-inter text-secondary/60 flex justify-center gap-3 text-sm">
        <span>© {year} Tomáš Ulman</span>
        <span>·</span>
        <a
          href="https://github.com/TomasUlman"
          target="blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-secondary/50 h-6 w-6" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
