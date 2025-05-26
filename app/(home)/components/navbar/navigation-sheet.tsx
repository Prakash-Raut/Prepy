import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-xl flex items-center justify-center">
						<Image src="/prepy-logo-2.png" alt="Logo" width={48} height={48} />
					</div>
					<span className="text-xl font-bold">Prepy</span>
				</div>
				<NavMenu orientation="vertical" className="mt-12" />
			</SheetContent>
		</Sheet>
	);
};
