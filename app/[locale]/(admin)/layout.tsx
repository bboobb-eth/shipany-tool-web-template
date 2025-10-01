import DashboardLayout from "@/components/dashboard/layout";
import Empty from "@/components/blocks/empty";
import { ReactNode } from "react";
import { Sidebar } from "@/types/blocks/sidebar";
import { getUserInfo } from "@/services/user";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userInfo = await getUserInfo();
  if (!userInfo || !userInfo.email) {
    redirect("/auth/signin");
  }

  const adminEmails = process.env.ADMIN_EMAILS?.split(",");
  if (!adminEmails?.includes(userInfo?.email)) {
    return <Empty message="No access" />;
  }

  const sidebar: Sidebar = {
    brand: {
      title: "HumToSong",
      logo: {
        src: "/humtosong/logo.svg",
        alt: "HumToSong",
      },
      url: "/admin",
    },
    nav: {
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: "RiDashboardLine",
        },
      ],
    },
    library: {
      title: "Menu",
      items: [
        {
          title: "Users",
          url: "/admin/users",
          icon: "RiUserLine",
        },
        {
          title: "Orders",
          icon: "RiOrderPlayLine",
          url: "/admin/orders",
        },
        {
          title: "Posts",
          url: "/admin/posts",
          icon: "RiArticleLine",
        },
        {
          title: "Feedbacks",
          url: "/admin/feedbacks",
          icon: "RiMessage2Line",
        },
      ],
    },
    bottomNav: {
      items: [
        {
          title: "Status",
          url: "https://status.humtosong.com",
          target: "_blank",
          icon: "RiSignalWifiFill",
        },
        {
          title: "API",
          url: "/docs/api",
          target: "_self",
          icon: "RiCodeBoxLine",
        },
        {
          title: "Support",
          url: "mailto:hello@humtosong.com",
          target: "_blank",
          icon: "RiCustomerService2Line",
        },
      ],
    },
    social: {
      items: [
        {
          title: "Website",
          url: "/",
          target: "_self",
          icon: "RiHomeLine",
        },
        {
          title: "GitHub",
          url: "https://github.com/bboobb-eth/hub2song",
          target: "_blank",
          icon: "RiGithubLine",
        },
        {
          title: "Email",
          url: "mailto:hello@humtosong.com",
          target: "_blank",
          icon: "RiMailLine",
        },
        {
          title: "X",
          url: "https://x.com/humtosong",
          target: "_blank",
          icon: "RiTwitterLine",
        },
      ],
    },
    account: {
      items: [
        {
          title: "Home",
          url: "/",
          icon: "RiHomeLine",
          target: "_blank",
        },
        {
          title: "Usage",
          url: "/admin/usage",
          icon: "RiBarChart2Line",
          target: "_self",
        },
      ],
    },
  };

  return <DashboardLayout sidebar={sidebar}>{children}</DashboardLayout>;
}
