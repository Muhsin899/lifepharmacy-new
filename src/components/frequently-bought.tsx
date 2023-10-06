import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect } from "react";
import Image from "next/image";
import { Typography } from "./ui/typography";
import { ProductPricesData } from "./Button";
import { Checkbox } from "./ui/checkbox";
import { Icon } from "./ui/icons";
import { useLanguage } from "@/hooks/useLanguage";
import { Pagination, Navigation, Autoplay, Swiper as SwiperType } from "swiper";
import { useRef } from "react";

interface frequentlyBroughtDataProps {
  setCheckedProducts: any;
  setAddedToCartItemData: any;
  frequentlyBroughtData: any;
  checkedProducts: any;
}

const FrequentlyBroughtComp: React.FC<frequentlyBroughtDataProps> = ({
  setCheckedProducts,
  setAddedToCartItemData,
  frequentlyBroughtData,
  checkedProducts,
}) => {
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    if (frequentlyBroughtData) {
      console.log(frequentlyBroughtData);

      setCheckedProducts(
        frequentlyBroughtData[0].proData.map((proData: any) => proData.id)
      );

      setAddedToCartItemData(
        frequentlyBroughtData[0].proData.filter(
          (proData: any) => proData.id === frequentlyBroughtData[1].proId
        )
      );
    }
  }, []);

  const removeCheckedProduct = (pro_id: string) => {
    debugger;
    const updatedProducts = checkedProducts.filter(
      (pro: any) => pro !== pro_id
    );
    setCheckedProducts(updatedProducts);
  };
  const { currentCountryDetails } = useLanguage();

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1.75}
      className="bg-white !ml-0"
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {frequentlyBroughtData[0].proData.map((proData: any, indx: number) => (
        <SwiperSlide className="!w-[200px]">
          <div className="flex  items-center relative">
            <div className="  rounded-lg ">
              <Checkbox
                defaultChecked={true}
                id={proData.id}
                className=" h-[20px] w-[20px] absolute left-2 top-2"
                onClick={(e: any) => {
                  e.target.checked
                    ? setCheckedProducts((pro: any) => [...pro, proData.id])
                    : removeCheckedProduct(proData.id);
                }}
              />
              <label htmlFor={proData.id} className="p-2 block">
                <Image
                  alt="img-freq"
                  height={200}
                  width={200}
                  src={proData.images.featured_image}
                  className="w-[200px]  h-[200px] mx-auto mb-1"
                />
                <Typography
                  bold={"semibold"}
                  alignment={"horizontalCenter"}
                  lineClamp={"two"}
                  size={"sm"}
                >
                  {proData.title}
                </Typography>
                <button className="text-center w-full mx-auto block mt-2">
                  <Typography
                    variant={"primary"}
                    alignment={"horizontalCenter"}
                  >
                    <Typography size={"sm"} type="span">
                      {currentCountryDetails.currency}
                    </Typography>{" "}
                    {Number(proData.price).toFixed(2)}
                  </Typography>
                </button>
              </label>
            </div>
            {indx !== frequentlyBroughtData[0].proData.length - 1 && (
              <div>
                <Icon type="plusIcon" className="-ml-3" />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { FrequentlyBroughtComp };
