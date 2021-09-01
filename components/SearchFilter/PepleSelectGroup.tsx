import { useSearchFilterDispatch, useSearchFilterState } from './context/SearchFilterContext';
import SelectButtonGroup from './SelectButtonGroup';

function PepleSelectGroup() {
  const { people_num } = useSearchFilterState();
  const dispatch = useSearchFilterDispatch();
  const toggleSelected = (id: number) => {
    dispatch({ type: 'TOGGLE_SELECT_GROUP', payload: { id, groupName: 'people_num' } });
  };
  return <SelectButtonGroup label="인원" group={people_num} onClick={toggleSelected} />;
}

export default PepleSelectGroup;
