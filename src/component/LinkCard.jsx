import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = async () => {
    try {
      const imageUrl = url?.qr;
      const fileName = url?.title;

      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = fileName || "image.png";

      document.body.appendChild(anchor);

      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);
  const handleConfirm = () => {
    fnDelete().then(() => fetchUrls());
  };
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 border p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <img
        src={url?.qr}
        alt="qr-code"
        className="h-40 object-contain ring self-center ring-blue-100 dark:ring-blue-500 md:self-start"
      />
      <Link
        to={`/link/${url?.id}`}
        className="flex flex-col flex-1 text-center md:text-left"
      >
        <span className="text-xl md:text-3xl font-extrabold hover:underline cursor-pointer break-words">
          {url?.title}
        </span>
        <span className="text-lg md:text-2xl text-blue-500 font-bold hover:underline cursor-pointer break-all">
          {import.meta.env.VITE_URL_LINK}
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center justify-center md:justify-start gap-1 font-semibold hover:underline cursor-pointer break-all">
          <LinkIcon className="p-1" />
          {url?.original_url}
        </span>
        <span className="flex items-center justify-center md:justify-start font-extralight text-sm mt-2">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex justify-center md:justify-start gap-2 mt-4 md:mt-0">
        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(
              `${import.meta.env.VITE_URL_LINK}${
                url?.custom_url ? url?.custom_url : url.short_url
              }`
            )
          }
        >
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <div>
          <Button variant="ghost" onClick={() => setDialogOpen(true)}>
            <Trash />
          </Button>
          <ConfirmDialog
            isOpen={isDialogOpen}
            onOpenChange={setDialogOpen}
            onConfirm={handleConfirm}
            description="Deleting this link will permanently remove it and all related data from our servers. Are you sure you want to proceed?"
          />
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
