"use client";

import { useAppState } from "@/lib/providers/state-provider";
import { workspace } from "@/lib/supabase/supabase.types";
import React, { useEffect } from "react";

interface WorkspaceeDropdownProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultWorkspace: workspace | undefined;
}

const WorkspaceeDropdown: React.FC<WorkspaceeDropdownProps> = ({
  collaboratingWorkspaces,
  defaultWorkspace,
  privateWorkspaces,
  sharedWorkspaces,
}) => {
  const { dispatch, state } = useAppState();
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<
    workspace | undefined
  >(defaultWorkspace);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  useEffect(() => {
    if (!state.workspaces) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({
            ...workspace,
            folders: [],
          })),
        },
      });
    }
  }, [privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces]);

  const habndleWorkspaceChange = (workspace: workspace) => {
    setSelectedWorkspace(workspace);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="">
        <span onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedWorkspace ? selectedWorkspace.title : ""}
        </span>
      </div>
    </div>
  );
};

export default WorkspaceeDropdown;
