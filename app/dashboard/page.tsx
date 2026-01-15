import { DashboardHeader } from "@/components/dashboard/header"
import { AiSignalsSidebar } from "@/components/dashboard/ai-signals-sidebar"
import { ChartSection } from "@/components/dashboard/chart-section"
import { OrderPanel } from "@/components/dashboard/order-panel"
import { UserStatsCard } from "@/components/dashboard/user-stats-card"

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* AI Signals Sidebar */}
        <AiSignalsSidebar />

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-auto p-4">
          <div className="flex flex-1 flex-col gap-4 lg:flex-row">
            {/* Chart Section */}
            <div className="flex-1 min-h-[400px]">
              <ChartSection />
            </div>

            {/* Right Panel */}
            <div className="flex w-full flex-col gap-4 lg:w-80">
              <UserStatsCard />
              <OrderPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
