import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  text: string;
  colorClass: string;
  icon: IconDefinition;
  onBtnClick?: () => void;
}

export const BottomBtn = (props: IProps) => {
  const { text, colorClass, icon, onBtnClick } = props;
  return (
    <button
      type="button"
      style={{ width: '100%', borderRadius: 0 }}
      className={`btn btn-block  ${colorClass}`}
      onClick={onBtnClick}
    >
      <FontAwesomeIcon size={'1x'} icon={icon} style={{ marginRight: '4px' }} />
      {text}
    </button>
  );
};
