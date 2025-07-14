import { SidebarIcon, ArrowLeftCircleIcon } from "lucide-react";
import logo from "../assets/logo.png";

import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export function SiteHeader({ direction }) {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b ">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8 "
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <Button
          variant="ghost"
          className="hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeftCircleIcon className="h-5 w-5" />
          Menu Principal
        </Button>

        {/* <Breadcrumb className="hidden sm:block"> */}
        <Breadcrumb className=" w-full flex items-center justify-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={direction}>
                  <BreadcrumbPage className={"w-full"}>
                    <div className="flex gap-2 items-center justify-center text-center">
                      {/* <span className="text-sm font-semibold"> */}
                      <span className="text-xl font-bold tracking-wide uppercase self-center">
                        Portail Logistique
                      </span>
                    </div>
                  </BreadcrumbPage>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
      </div>
    </header>
  );
}
