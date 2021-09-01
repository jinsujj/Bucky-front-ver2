import { useSearchFilterDispatch, useSearchFilterState } from './context/SearchFilterContext';
import SelectButtonGroup from './SelectButtonGroup';

function ColorsSelectGroup() {
  const { colors } = useSearchFilterState();
  const dispatch = useSearchFilterDispatch();
  const toggleSelected = (id: number) => {
    dispatch({ type: 'TOGGLE_SELECT_GROUP', payload: { id, groupName: 'colors' } });
  };

  return <SelectButtonGroup label="배경" group={colors} onClick={toggleSelected} />;
}

export default ColorsSelectGroup;
