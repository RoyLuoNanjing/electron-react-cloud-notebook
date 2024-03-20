import { IFile } from './FileList';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  files: IFile[];
  activeId: string;
  unsavedIds?: string[];
  onTabClick: (id: string) => void;
  onCloseTab?: () => void;
}
export const TabList = (props: IProps) => {
  const { files, activeId, unsavedIds, onTabClick, onCloseTab } = props;

  return (
    <ul className="nav nav-pills">
      {files.map((file) => {
        const fClassname = classNames({
          'nav-link': true,
          active: file.id === activeId,
        });
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className={fClassname}
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id);
              }}
            >
              {file.title}
              <span style={{ marginLeft: '4px' }}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
