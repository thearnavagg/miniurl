import ConfirmDialog from "@/component/ConfirmDialog";
import { StatsDeviceCount } from "@/component/StatsDeviceCount";
import { StatsLocation } from "@/component/StatsLocation";
import { Button } from "@/component/ui/button";
import { UrlState } from "@/context/UrlContext";
import { aboutClicks } from "@/db/apiClicks";
import { aboutUrl, deleteUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Link = () => {
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
  const navigate = useNavigate();
  const {id} = useParams();
  const {user} = UrlState();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(aboutUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(aboutClicks, id);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  const handleConfirm = () => {
    console.log("Confirming deletion...");
    fnDelete()
      .then(() => {
        console.log("Deleted successfully");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Error during deletion:", err);
      });
  };


  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-8 grid-flow-row-dense pt-24 px-10 md:px-20">
      <div className="md:col-span-1 md:row-span-3">
        <div className="flex flex-col border p-4 bg-gray-50 dark:bg-gray-800 rounded-lg md:fixed">
          <img
            src={url?.qr}
            alt="qr-code"
            className="h-60 object-contain ring self-center ring-blue-100 dark:ring-blue-500"
          />
          <div className="flex flex-col flex-1 text-center">
            <span className="text-xl md:text-3xl font-extrabold hover:underline cursor-pointer break-words">
              {url?.title}
            </span>
            <a
              href={`${import.meta.env.VITE_URL_LINK}${link}`}
              target="_blank"
              className="text-lg md:text-2xl text-blue-500 font-bold hover:underline cursor-pointer break-all"
            >
              {`${import.meta.env.VITE_URL_LINK}${link}`.length > 35
                ? `${import.meta.env.VITE_URL_LINK}${link}`.slice(0, 35) + "..."
                : `${import.meta.env.VITE_URL_LINK}${link}`}
            </a>
            <a
              href={url?.original_url}
              target="_blank"
              className="flex items-center justify-center gap-1 font-semibold hover:underline cursor-pointer break-all"
            >
              <LinkIcon className="p-1" />
              {url?.original_url.length > 50
                ? `${url?.original_url.slice(0, 50)}` + "..."
                : `${url?.original_url}`}
            </a>
            <span className="flex items-center justify-center font-extralight text-sm mt-2">
              {new Date(url?.created_at).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${import.meta.env.VITE_URL_LINK}${link}`
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
      </div>
      <div>
        {loadingStats ? (
          <p>Loading stats...</p>
        ) : (
          <StatsDeviceCount stats={stats} />
        )}
      </div>
      <div>
        {loadingStats ? (
          <p>Loading stats...</p>
        ) : (
          <StatsLocation stats={stats} />
        )}
      </div>
    </div>
  );
};

export default Link;
