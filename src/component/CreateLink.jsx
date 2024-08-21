import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/component/ui/dialog";
import { Button } from "./ui/button";
import Error from "./error";
import { Card } from "./ui/card";
import { BeatLoader } from "react-spinners";
import { Input } from "./ui/input";
import { UrlState } from "@/context/UrlContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import QRCode from "qrcode";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  useEffect(() => {
    if (longLink) {
      setFormValues((prevValues) => ({
        ...prevValues,
        longUrl: longLink,
      }));
    }
  }, [longLink]);

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewUrl = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const short_url = Math.random().toString(36).substring(2, 8);
      const url = formValues.customUrl ? formValues.customUrl : short_url;
      const options = {
        width: 500,
        height: 500,
      };
      const qrCode_base64 = await QRCode.toDataURL(
        `${import.meta.env.VITE_URL_LINK}${url}`,
        options
      );
      const base64Data = qrCode_base64.split(",")[1];
      const blob = base64ToBlob(base64Data, "image/png");
      await fnCreateUrl(short_url, blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition">
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-gray-800">
            Create New Link
          </DialogTitle>
        </DialogHeader>
        {error && <Error message={error.message} />}
        <div className="space-y-4 mt-4">
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.title && <Error message={errors.title} />}
          <Input
            id="longUrl"
            placeholder="Enter your long URL"
            value={formValues.longUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.longUrl && <Error message={errors.longUrl} />}
          <div className="flex items-center gap-2">
            <Card className="p-2 text-sm rounded-md">
              {import.meta.env.VITE_URL_LINK}
            </Card>
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.customUrl && <Error message={errors.customUrl} />}
          </div>
        </div>
        <DialogFooter className="flex justify-between mt-6 sm:flex-col space-y-4">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center"
            type="button"
            onClick={createNewUrl}
            disabled={loading}
          >
            {loading ? <BeatLoader size={4} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;

function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
