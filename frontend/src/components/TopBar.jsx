function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-white/[0.06] bg-surface/60 px-8 py-5 backdrop-blur-xl">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Procurement control center — live overview of active requests, offers, and risk.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-xs font-medium tracking-wide text-slate-400">
            All systems operational
          </span>
        </div>

        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-3.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[11px] font-semibold text-accent">
            OP
          </span>
          <span className="text-sm font-medium text-slate-300">Operator</span>
        </div>
      </div>
    </header>
  )
}

export default TopBar
