import { Heart, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/70 dark:border-slate-700/70">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-rose-500" aria-hidden="true" />
          <span>by Mayur Bhalgama</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center gap-1 text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
            href="https://github.com/mayurb1"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center gap-1 text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
            href="https://in.linkedin.com/in/mayur-bhalgama-reactjs"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center gap-1 text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
            href="mailto:mayurbhalgama2419@gmail.com"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
