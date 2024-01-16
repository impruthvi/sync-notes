import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import SyncnoteHomeIcon from '../icons/syncnoteHomeIcon';
import SyncnoteSettingsIcon from '../icons/syncnoteSettingsIcon';
import SyncnoteTrashIcon from '../icons/syncnoteTrashIcon';

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge('my-2', className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}
          >
            <SyncnoteHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>

        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}
          >
            <SyncnoteSettingsIcon />
            <span>Settings</span>
          </Link>
        </li>

        <li>
          <Link
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}
          >
            <SyncnoteTrashIcon />
            <span>Trash</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default NativeNavigation;
