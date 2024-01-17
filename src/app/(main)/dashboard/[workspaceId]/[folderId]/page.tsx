export const dynamic = "force-dynamic";

import React from "react";

const Folder = async ({ params }: { params: { folderId: string } }) => {
  return <div className="relative ">{params.folderId}</div>;
};

export default Folder;
