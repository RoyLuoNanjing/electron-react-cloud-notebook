import { IFile } from './FileList';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './TabList.scss';

interface IProps {
  files: IFile[];
  activeId: string;
  unsavedIds: string[];
  onTabClick: (id: string) => void;
  onCloseTab: (id: string) => void;
}
export const TabList = (props: IProps) => {
  const { files, activeId, unsavedIds, onTabClick, onCloseTab } = props;

  return (
    <ul className="nav nav-pills tablist-component">
      {files.map((file) => {
        const withUnsavedMark = unsavedIds.includes(file.id);

        const fClassname = classNames({
          'nav-link': true,
          active: file.id === activeId,
          // prettier-ignore
          'withUnsaved': withUnsavedMark,
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
              <span style={{ marginLeft: '4px' }} className="close-icon">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={(e) => {
                    e.stopPropagation(); //阻止冒泡
                    onCloseTab(file.id);
                  }}
                />
              </span>
              {withUnsavedMark && (
                <span
                  className="rounded-circle unsaved-icon "
                  style={{ marginLeft: '4px' }}
                ></span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
