import React from "react";

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  return <div className="relative">
    {params.workspaceId}
  </div>;
};

export default Workspace;
