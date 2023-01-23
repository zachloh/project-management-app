import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Organization } from 'types';

const getOrg = async (orgId: string | undefined): Promise<Organization> => {
  if (typeof orgId === 'undefined') {
    return Promise.reject(new Error('Invalid orgId'));
  }
  const { data } = await customAxios.get<Organization>(
    `/organizations/${orgId}`
  );
  return data;
};

export const useGetOrg = (orgId: string | undefined) =>
  useQuery({
    queryKey: ['org', orgId],
    queryFn: () => getOrg(orgId),
  });
