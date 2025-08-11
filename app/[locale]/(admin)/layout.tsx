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
      title: "GPT-OSS-120B",
      logo: {
        src: "/logo.png",
        alt: "GPT-OSS-120B",
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
          title: "Documents",
          url: "https://docs.gpt-oss-120b.ai",
          target: "_blank",
          icon: "RiFileTextLine",
        },
        {
          title: "Blocks",
          url: "https://gpt-oss-120b.ai/blocks",
          target: "_blank",
          icon: "RiDashboardLine",
        },
        {
          title: "Showcases",
          url: "https://gpt-oss-120b.ai/showcase",
          target: "_blank",
          icon: "RiAppsLine",
        },
      ],
    },
    social: {
      items: [
        {
          title: "Home",
          url: "/",
          target: "_blank",
          icon: "RiHomeLine",
        },
        {
          title: "Github",
          url: "https://github.com/gpt-oss-120b/gpt-oss-120b-template-one",
          target: "_blank",
          icon: "RiGithubLine",
        },
        {
          title: "Discord",
          url: "https://discord.gg/HQNnrzjZQS",
          target: "_blank",
          icon: "RiDiscordLine",
        },
        {
          title: "X",
          url: "https://x.com/gptoss120b",
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
          title: "Recharge",
          url: "/pricing",
          icon: "RiMoneyDollarBoxLine",
          target: "_blank",
        },
      ],
    },
  };

  return <DashboardLayout sidebar={sidebar}>{children}</DashboardLayout>;
}
