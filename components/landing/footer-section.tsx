import Link from "next/link"
import { Activity } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="border-t border-border/50 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-bold">
              TradeSense<span className="text-primary">AI</span>
            </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              About
            </Link>
            <Link href="#" className="hover:text-foreground">
              Blog
            </Link>
            <Link href="#" className="hover:text-foreground">
              Careers
            </Link>
            <Link href="#" className="hover:text-foreground">
              Support
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">© 2026 TradeSense AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
