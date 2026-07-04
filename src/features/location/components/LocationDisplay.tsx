"use client";

import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocationStore } from "../store/useLocationStore";
import { requestLocation } from "../services/geolocationService";

export function LocationDisplay() {
  const t = useTranslations("header.location");
  const city = useLocationStore((s) => s.city);
  const region = useLocationStore((s) => s.region);
  const coords = useLocationStore((s) => s.coords);
  const loading = useLocationStore((s) => s.loading);
  const permissionDenied = useLocationStore((s) => s.permissionDenied);
  const setLocation = useLocationStore((s) => s.setLocation);
  const setLoading = useLocationStore((s) => s.setLoading);
  const setPermissionDenied = useLocationStore((s) => s.setPermissionDenied);

  useEffect(() => {
    if (coords) return;
    if (permissionDenied) return;

    setLoading(true);
    requestLocation()
      .then((result) => {
        setLocation(result.coords, result.city, result.region);
      })
      .catch(() => {
        setPermissionDenied(true);
      });
  }, [coords, permissionDenied, setLoading, setLocation, setPermissionDenied]);

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-text-muted whitespace-nowrap">
        <MapPin className="h-3 w-3" />
        {t("loading")}
      </span>
    );
  }

  if (!city) return null;

  const label = region ? `${city}-${region}` : city;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-text-muted whitespace-nowrap">
      <MapPin className="h-3 w-3" />
      {label}
    </span>
  );
}
