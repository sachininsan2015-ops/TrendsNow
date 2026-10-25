import { useEffect } from 'react';
import { trackVisitor } from '@/lib/api';

export function useVisitorTracking(page: string) {
  useEffect(() => {
    void trackVisitor(page);
  }, [page]);
}
