import type { FooterData } from "../../types";

interface Props {
  copyright: string;
  attributionLogo: FooterData["attributionLogo"];
}

export default function FooterCopyright({ copyright, attributionLogo }: Props) {
  return (
    <div className="flex flex-col items-center justify-between text-white lg:flex-row-reverse lg:bg-gray-800">
      <div className="w-full bg-white py-3 text-center text-xs leading-normal font-normal text-black lg:w-auto lg:bg-gray-800 lg:py-0 lg:pr-10 lg:text-white">
        {copyright}
      </div>
      <div className="flex w-full items-center justify-start bg-yellow-700 py-3 pl-3 lg:w-auto lg:bg-black lg:py-4 lg:pl-10">
        <img
          src={attributionLogo.imageSrc}
          alt={attributionLogo.alt}
          className="h-12 w-auto"
        />
      </div>
    </div>
  );
}
