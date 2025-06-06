"use client"
import ChargingOptionsSection from "@/components/ui/charging_options_section/chargin_options_section";
import HeroSection from "@/components/ui/hero";
import StepsSection from "@/components/ui/step_sections";
import { fetchCountries } from "@/redux/country.slice";
import { getApiKeyStripe } from "@/redux/stripe.slice";
import { setApiKey } from "@/utils/variable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch()
  const initApiStripe = async () => {
    const response = await dispatch(getApiKeyStripe() as any)
    if (response.payload) {
      setApiKey(response.payload.publicKey)
    }
  }
  useEffect(() => {
    dispatch(fetchCountries() as any)
    initApiStripe()
  }, [])
  return (
    <>
      <HeroSection />
      <StepsSection />
      <ChargingOptionsSection />
    </>
  );
}
