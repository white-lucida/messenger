import React from 'react';
import { useActionRow } from '../../../hooks/use_actionrow';
import { Button } from '../../ui';

const NewRowButton = React.memo(function Inside() {
  const dispatch = useActionRow();
  return <Button onClick={() => dispatch({ type: 'newRow' })} label='行を追加する' />;
});

export { NewRowButton };
