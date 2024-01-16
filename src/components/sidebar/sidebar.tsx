import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { twMerge } from "tailwind-merge";
import WorkspaceeDropdown from "./workspace-dropdown";
interface SidebarProps {
  params: { workspaceId: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });
  //user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  //subscr
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  //folders
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspaceId
  );
  //error
  if (subscriptionError || foldersError) redirect("/dashboard");

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  //get all the different workspaces private collaborating shared
  return (
    <aside
      className={twMerge(
        "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between",
        className
      )}
    >
      <WorkspaceeDropdown
        collaboratingWorkspaces={collaboratingWorkspaces}
        privateWorkspaces={privateWorkspaces}
        sharedWorkspaces={sharedWorkspaces}
        defaultWorkspace={[
          ...privateWorkspaces,
          ...sharedWorkspaces,
          ...collaboratingWorkspaces,
        ].find((workspace) => workspace.id === params.workspaceId)}
      ></WorkspaceeDropdown>
    </aside>
  );
};

export default Sidebar;
