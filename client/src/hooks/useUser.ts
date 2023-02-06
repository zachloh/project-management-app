import { useOutletContext } from 'react-router-dom';

import { User } from 'types';

type ContextType = { user: User };

export const useUser = () => useOutletContext<ContextType>();
