import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface UseFileDownloadProps {
  mutationKey: string;
  path: string;
}
export const useFileDownload = ({
  mutationKey,
  path,
}: UseFileDownloadProps) => {
  const {
    mutateAsync: downloadFile,
    data,
    ...props
  } = useMutation({
    mutationKey: ['download', mutationKey],
    mutationFn: async () => {
      const response = await axios.get(path, {
        responseType: 'blob',
      });

      const fileName =
        response.headers['content-disposition'].split('filename=')[1];
      const contentType = response.headers['content-type'].split(';')[0];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const blob = response.data as Blob;
      const text = await blob.text();
      return { fileName, contentType, url, blob, text };
    },
  });

  return { downloadFile, ...props, data };
};
