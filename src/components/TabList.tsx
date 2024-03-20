import { IFile } from './FileList';

interface IProps {
  files: IFile[];
  activeId?: string;
  unsavedIds?: string[];
  onTabClick: (id: string) => void;
  onCloseTab?: () => void;
}
export const TabList = (props: IProps) => {
  const { files, activeId, unsavedIds, onTabClick, onCloseTab } = props;
  return (
    <ul className="nav nav-pills">
      {files.map((file) => {
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id);
              }}
            >
              {file.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
