import { Progress } from "@/component/ui/progress";
import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + 25, 100);
      });
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (loading || loadingStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
          <h1 className="text-2xl font-semibold text-foreground">
            Redirecting you to the new page
          </h1>
          <p className="text-muted-foreground">
            Please wait while we redirect you to your destination.
          </p>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Redirecting in {Math.ceil((100 - progress) / 25)} seconds...
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default RedirectLink;
