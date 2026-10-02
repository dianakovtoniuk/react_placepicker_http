import { useEffect, useState } from 'react';

interface FetchError {
  message: string;
}

export function useFetch<T>(fetchFn: () => Promise<T>, initialValue: T) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<FetchError | undefined>();
  const [fetchedData, setFetchedData] = useState<T>(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message:
            error instanceof Error ? error.message : 'Failed to fetch data.',
        });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}