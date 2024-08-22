import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    original_url: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mb-6">
            <BarLoader width={"100%"} color="#36d7b7" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            {"(👉ﾟヮﾟ)👉 Redirecting... 👈(ﾟヮﾟ👈)"}
          </h2>
          <p className="text-sm text-gray-900 mt-2">
            Please wait while we take you to your destination.
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default RedirectLink;
