import { useSearchFilterDispatch, useSearchFilterState } from './context/SearchFilterContext';
import SelectButtonGroup from './SelectButtonGroup';

function GenderSelectGroup() {
  const { sex } = useSearchFilterState();
  const dispatch = useSearchFilterDispatch();
  const toggleSelected = (id: number) => {
    dispatch({ type: 'TOGGLE_SELECT_GROUP', payload: { id, groupName: 'sex' } });
  };

  return <SelectButtonGroup label="성별" group={sex} onClick={toggleSelected} />;
}

export default GenderSelectGroup;
