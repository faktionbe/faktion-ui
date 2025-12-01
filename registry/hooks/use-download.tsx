interface DownloadProps {
  url: string;
  /**
   * {name}.{extension}
   *
   * @example vacature.docx
   */
  file: string;
}
const useDownload = () => {
  const download = ({ url, file }: DownloadProps) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { download };
};

export default useDownload;
