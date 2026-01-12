
'use client';

import {
  Home,
  Shield,
  Settings,
  ArrowLeftRight,
  LogOut,
} from 'lucide-react';

import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline text-lg font-semibold">Kavach</h2>
              <p className="text-xs text-muted-foreground">Financial DNA Shield</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard">
                <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                  <span>
                    <Home />
                    Dashboard
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/dashboard/transactions">
                <SidebarMenuButton asChild isActive={pathname === '/dashboard/transactions'}>
                  <span>
                    <ArrowLeftRight />
                    Transactions
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/settings">
                <SidebarMenuButton asChild isActive={pathname === '/dashboard/settings'}>
                  <span>
                    <Settings />
                    Settings
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Ankush PK</span>
              <span className="text-xs text-muted-foreground">
                Ankush.PK@example.com
              </span>
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton asChild size="sm" variant="outline">
                  <span>
                    <LogOut />
                    Logout
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
