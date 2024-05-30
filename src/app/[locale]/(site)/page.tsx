"use client"

import React, { useState } from "react"
import Triangle from "../../../../public/triangle.svg"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"
import { X, Check } from "lucide-react"
import LumiPC from "../../../../public/LumiPC.svg"
import LumiAnalytics from "../../../../public/LumiAnalytics.svg"
import LumiGraduate from "../../../../public/LumiGraduate.svg"
import StarSVG from "../../../../public/star.svg"
import { useTranslations } from "next-intl"
// import { useConvexAuth } from "convex/react"
import Link from "next/link"
import { useParams } from "next/navigation"

const HomePage = () => {
  // const { isAuthenticated } = useConvexAuth()

  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 300)
  }

  const t = useTranslations()

  const params = useParams()

  return (
    <div className="relative mx-auto mt-16 flex w-full max-w-[1080px] flex-col items-center justify-between md:mt-32">
      <div className="z-1 md:mt- mt-12">
        <h1 className="break-words text-center text-[2rem] font-black md:w-3/5 md:text-left md:text-[6rem] md:leading-[6rem]">
          {t("Landing.title")}
        </h1>
        <div className="flex items-center justify-center md:justify-start">
          <SignUpButton mode="modal">
            <Button
              className={`mt-10 w-72 rounded-[2rem] ${
                isPressed ? "cta-button-pressed" : "cta-button-shadow"
              } h-[3.5rem] bg-primaryBlue text-lg font-bold text-white transition-all duration-200 ease-in-out hover:bg-primaryHover `}
              onClick={handleClick}
            >
              {t("Landing.ctaButton")}
            </Button>
          </SignUpButton>
        </div>
      </div>
      <Image
        src={Triangle}
        alt="triangle"
        width={900}
        height={900}
        className="animate-slide-up absolute right-[-5.5rem] top-[-7rem] z-[-1] hidden md:block"
      />
      <div className="mx-[auto] mt-16 flex w-full max-w-[1080px] flex-col items-center justify-between gap-4 md:mt-32 md:flex-row">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-[-1rem] text-[3.5rem] font-bold text-primaryBlue">
            10.000+
          </h1>
          <p className="text-2xl font-bold">{t("Landing.stats.users")}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-[-1rem] text-[3.5rem] font-bold text-primaryBlue">
            105.000+
          </h1>
          <p className="text-2xl font-bold">{t("Landing.stats.tasks")}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-[-1rem] text-[3.5rem] font-bold text-primaryBlue">
            2-3 {t("Landing.stats.grades2")}
          </h1>
          <p className="text-2xl font-bold">{t("Landing.stats.grades")}</p>
        </div>
      </div>
      <div className="mt-16 flex w-full flex-col items-center justify-between text-center md:mt-32">
        <h1 className="text-3xl font-black md:text-[55px]">
          {t("Landing.comparison.title")}
        </h1>
        <div className="mt-[4rem] flex w-[90%] flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col rounded-[24px] border-2 border-[#FF8B8B] bg-[#FFF5F5] p-4 text-start">
            <h1 className="text-3xl font-bold">
              {t("Landing.comparison.withoutLouTitle")}
            </h1>
            <div className="mt-5 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withoutLouReason1")}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withoutLouReason2")}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withoutLouReason3")}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withoutLouReason4")}
              </p>
            </div>
          </div>
          <div className="flex flex-col rounded-[24px] border-2 border-[#28C62F] bg-[#E3FFE4] p-4 text-start">
            <h1 className="text-3xl font-bold">
              {t("Landing.comparison.withLouTitle")}
            </h1>
            <div className="mt-5 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withLouReason1")}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withLouReason2")}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withLouReason3")}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                {t("Landing.comparison.withLouReason4")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full md:mt-32">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-3xl font-bold text-primaryBlue">
            {t("Landing.features.smallTitle")}
          </h1>
          <h2 className="text-2xl font-black leading-[3rem] md:text-[55px]">
            {t("Landing.features.title")}
            <br />
            {t("Landing.features.title2")}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-16 flex w-full items-center justify-center md:justify-between">
            <Image
              src={LumiPC}
              alt="LumiPC"
              width={300}
              height={300}
              className="ml-10 hidden md:block"
            />
            <div className="flex w-[25rem] flex-col">
              <h3 className="text-[18px] font-medium text-primaryBlue">
                {t("Landing.features.feature1.smallTitle")}
              </h3>
              <h1 className="text-[26px] font-black text-black">
                {t("Landing.features.feature1.title")}
              </h1>
              <p className="text-[22px] font-regular leading-tight text-black">
                {t("Landing.features.feature1.description")}
              </p>
            </div>
          </div>
          <div className="mt-16 flex w-full items-center justify-center md:justify-between">
            <div className="flex w-[25rem] flex-col">
              <h3 className="text-[18px] font-medium text-primaryBlue">
                {t("Landing.features.feature2.smallTitle")}
              </h3>
              <h1 className="w-[30rem] text-[26px] font-black text-black">
                {t("Landing.features.feature2.title")}
              </h1>
              <p className="text-[22px] font-regular leading-tight text-black">
                {t("Landing.features.feature2.description")}
              </p>
            </div>
            <Image
              src={LumiAnalytics}
              alt="LumiAnalytics"
              width={300}
              height={300}
              className="mr-10 hidden md:block"
            />
          </div>
          <div className="mt-16 flex w-full items-center justify-center md:justify-between">
            <Image
              src={LumiGraduate}
              alt="LumiGraduate"
              width={300}
              height={300}
              className="ml-10 hidden md:block"
            />
            <div className="flex w-[25rem] flex-col">
              <h3 className="text-[18px] font-medium text-primaryBlue">
                {t("Landing.features.feature3.smallTitle")}
              </h3>
              <h1 className="text-[26px] font-black text-black">
                {t("Landing.features.feature3.title")}
              </h1>
              <p className="text-[22px] font-regular leading-tight text-black">
                {t("Landing.features.feature3.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col md:mt-32">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-3xl font-bold text-primaryBlue">
            {t("Landing.pricing.smallTitle")}
          </h3>
          <h1 className="text-2xl font-black leading-[3rem] md:text-[55px]">
            {t("Landing.pricing.title")}
          </h1>
        </div>
        <div className="mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 ">
          <div className="flex flex-col justify-between rounded-3xl border p-6 text-left shadow-xl">
            <div>
              <h3 className="text-2xl font-semibold">
                {t("Landing.pricing.category1.title")}
              </h3>
              <p className="my-4 text-4xl font-bold">
                {t("Landing.pricing.category1.cost")}
                <span className="text-lg font-medium">
                  {t("Landing.pricing.category1.currency")}
                </span>
              </p>
              <ul className="space-y-2 text-left">
                <li>✓ {t("Landing.pricing.category1.features.feature1")}</li>
                <li>✓ {t("Landing.pricing.category1.features.feature2")}</li>
                <li>✓ {t("Landing.pricing.category1.features.feature3")}</li>
                <li>✓ {t("Landing.pricing.category1.features.feature4")}</li>
                <li>✓ {t("Landing.pricing.category1.features.feature5")}</li>
              </ul>
            </div>
            <Button className="bottom-0 left-0 mt-6 w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
              {t("Landing.pricing.category1.ctaButton")}
            </Button>
          </div>

          <div className="relative rounded-3xl border bg-gray-100 p-6 text-left shadow-xl">
            <span className="absolute right-0 top-7 rounded-l-lg bg-primaryBlue px-3 py-1 text-xs font-bold text-white">
              Most Popular
            </span>
            <h3 className="text-2xl font-semibold">
              {t("Landing.pricing.category2.title")}
            </h3>
            <p className="my-4 text-4xl font-bold">
              {t("Landing.pricing.category2.cost")}
              <span className="text-lg font-medium">
                {t("Landing.pricing.category2.currency")}
              </span>
            </p>
            <ul className="space-y-2 text-left">
              <li>{t("Landing.pricing.category2.features.addition")}</li>
              <li>✓ {t("Landing.pricing.category2.features.feature1")}</li>
              <li>✓ {t("Landing.pricing.category2.features.feature2")}</li>
              <li>✓ {t("Landing.pricing.category2.features.feature3")}</li>
              <li>✓ {t("Landing.pricing.category2.features.feature4")}</li>
              <li>✓ {t("Landing.pricing.category2.features.feature5")}</li>
            </ul>
            <Button className="bg:primaryHover mt-6 w-full rounded-lg bg-primaryBlue px-4 py-2 font-bold text-white hover:bg-primaryHover">
              {t("Landing.pricing.category2.ctaButton")}
            </Button>
          </div>

          <div className="rounded-3xl border p-6 text-left shadow-xl">
            <h3 className="text-2xl font-semibold">
              {t("Landing.pricing.category3.title")}
            </h3>
            <p className="my-4 text-4xl font-bold">
              {t("Landing.pricing.category3.cost")}
              <span className="text-lg font-medium">
                {t("Landing.pricing.category3.currency")}
              </span>
            </p>
            <ul className="space-y-2 text-left">
              <li>{t("Landing.pricing.category3.features.addition")}</li>
              <li>✓ {t("Landing.pricing.category3.features.feature1")}</li>
              <li>✓ {t("Landing.pricing.category3.features.feature2")}</li>
              <li>✓ {t("Landing.pricing.category3.features.feature3")}</li>
              <li>✓ {t("Landing.pricing.category3.features.feature4")}</li>
              <li>✓ {t("Landing.pricing.category3.features.feature5")}</li>
              <li>✓ {t("Landing.pricing.category3.features.feature6")}</li>
            </ul>
            <Button className="mt-6 w-full rounded-lg bg-primaryBlue px-4 py-2 text-white hover:bg-primaryHover">
              {t("Landing.pricing.category3.ctaButton")}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-32 flex w-full flex-col items-center justify-between gap-12 md:flex-row">
        <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
          <h1 className="text-4xl font-black md:max-w-[37rem]">
            {t("Landing.cta.title")}
          </h1>
          <SignUpButton mode="modal">
            <Button
              className={`mb-10 mt-10 w-72 rounded-[2rem] ${
                isPressed ? "cta-button-pressed" : "cta-button-shadow"
              } h-[3.5rem] bg-primaryBlue text-lg font-bold text-white transition-all duration-200 ease-in-out hover:bg-primaryHover`}
              onClick={handleClick}
            >
              {t("Landing.cta.ctaButton")}
            </Button>
          </SignUpButton>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="mr-10 flex flex-col items-center justify-center gap-1">
            <Link href={`/${params.locale}/dashboard`}>
              <Image
                src={
                  "https://brilliant.org/images/homepage/google-play-download.svg"
                }
                alt="Google Play Download"
                width={150}
                height={90}
                draggable="false"
              />
            </Link>
            <div className="flex items-center justify-center gap-1">
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
            </div>
            <p className="text-gray-300">
              {t("Landing.cta.googlePlayReviews")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Link href={"/"}>
              <Image
                src={
                  "https://brilliant.org/images/homepage/app-store-download.svg"
                }
                alt="App Store Download"
                width={150}
                height={90}
                draggable="false"
              />
            </Link>
            <div className="flex items-center justify-center gap-1">
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
            </div>
            <p className="text-gray-300">{t("Landing.cta.appStoreReviews")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
