import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ChildrenProps } from "@/types";

const DashboardLayout = ({ children }: ChildrenProps) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col h-screen w-screen bg-muted overflow-x-hidden">
				<DashboardNavbar />
				{children}
			</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
