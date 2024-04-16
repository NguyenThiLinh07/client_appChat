import React, { useEffect, useRef } from 'react';

type Props = {
  options: Array<{ name: string; callback: () => void }>;
  coordinates: { x: number; y: number };
  contextMenu: boolean;
  setContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContextMenu: React.FC<Props> = (props: Props) => {
  const { options, coordinates, setContextMenu } = props;
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (e.target.id !== 'context-opener') {
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    callback: { (): void; (): void },
  ) => {
    e.stopPropagation();
    callback();
    setContextMenu(false);
  };

  return (
    <div
      className="fixed bg-[#fff] py-2 z-[100] shadow-default rounded-default"
      style={{ top: coordinates.y, left: coordinates.x }}
      ref={contextMenuRef}
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callback)}
            className="px-5 py-2 hover:bg-background-default-hover cursor-pointer w-[200px]"
            role="button"
          >
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
