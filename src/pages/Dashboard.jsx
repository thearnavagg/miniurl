import CreateLink from "@/component/CreateLink";
import Error from "@/component/error";
import LinkCard from "@/component/LinkCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { UrlState } from "@/context/UrlContext";
import { getClicksForAllUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { user } = UrlState();

  const {
    loading,
    error,
    fn: fnUrls,
    data: urls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForAllUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pt-24 px-8 py-5">
      {loading || loadingClicks ? (
        <div className="flex justify-center py-4">
          <BarLoader width={"100%"} color="#2f22f2" />
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center">
            <p>{urls?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center">
            <p>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Explore Links"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1"></Filter>
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || [])
        .slice()
        .reverse()
        .map((url, i) => {
          return <LinkCard key={i} url={url} fetchUrls={fnUrls} />;
        })}
    </div>
  );
};

export default Dashboard;
