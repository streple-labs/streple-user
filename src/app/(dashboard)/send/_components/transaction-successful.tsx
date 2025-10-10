import { anton } from "@/app/fonts";
import Rectangle44 from "@/component/icons/rectangle-44";
import SuccessCheckmark from "@/component/icons/success-checkmark";
import { signs } from "@/utils/constants";
import Link from "next/link";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

export default function TransactionSuccessful({
  recipient,
  amount,
  receivingAsset,
  sendingAsset,
}: {
  recipient: {
    name: string;
    username: string;
    id: string;
  };
  amount: string;
  receivingAsset: Currency;
  sendingAsset: Currency;
}) {
  const {
    user: { user_data },
  } = useAuth();

  const printRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    if (!printRef.current) return;

    const scale = 2;

    try {
      const canvas = await html2canvas(printRef.current, {
        scale,
        useCORS: true,
        allowTaint: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      if (imgHeight <= pdfHeight)
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      else {
        let position = 0;
        const pageHeight = pdfHeight;

        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d");
        if (!pageCtx) throw new Error("Could not get canvas context");

        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.floor((canvas.width * pageHeight) / pdfWidth);

        while (position < canvas.height) {
          pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
          pageCtx.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            pageCanvas.height,
            0,
            0,
            pageCanvas.width,
            pageCanvas.height
          );

          const pageData = pageCanvas.toDataURL("image/png");

          if (position === 0)
            pdf.addImage(pageData, "PNG", 0, 0, imgWidth, pageHeight);
          else {
            pdf.addPage();
            pdf.addImage(pageData, "PNG", 0, 0, imgWidth, pageHeight);
          }

          position += pageCanvas.height;
        }
      }

      pdf.save(
        `${user_data?.fullName}-${
          recipient.name
        }-${new Date().getUTCDate()}.pdf`
      );
    } catch (err) {
      console.error("Failed to generate PDF", err);
      toast.error("Failed to generate PDF. See console for details.");
    }
  };

  return (
    <div className="relative overflow-hidden overflow-y-auto hide-scrollbar flex flex-col items-center gap-10 p-8 rounded-[20px] bg-[#211F22]">
      <span className="absolute top-0 inset-0 left-0 right-0">
        <Rectangle44 />
      </span>

      <div className="flex flex-col items-center justify-center gap-8 max-w-[490px] relative">
        <SuccessCheckmark />

        <h2
          className={`${anton.className} text-[21px] md:text-[27px] leading-[150%] tracking-[2px]`}
        >
          Transaction successful!
        </h2>

        <p className="text-base/6 tracking-[1px] text-white/80 text-center">
          Your funds are already moving. {recipient?.name} will get it shortly.
        </p>

        <div
          ref={printRef}
          style={{ transformOrigin: "top left" }}
          className="flex flex-col items-center gap-6 w-full"
        >
          <h4 className="font-bold text-[#F4E90EB2] text-base/6 md:text-[21px]/8 tracking-[1px]">
            {signs[receivingAsset]}
            {amount}
          </h4>

          <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Recipient tag
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                @{recipient?.username}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Sent amount
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px] uppercase">
                {signs[sendingAsset]}
                {amount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Received amount
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                {signs[sendingAsset]}
                {amount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Total amount sent:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                {signs[receivingAsset]}
                {amount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">Date</p>
              <p className="text-white/80 text-base/6 tracking-[1px]">{}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Transaction ID
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">{}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 relative w-full">
        <button
          onClick={handleDownload}
          className="h-[50px] w-full max-w-[301px] py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-sm/[150%] font-bold tracking-[2px] text-[#2C2C26]"
        >
          Download receipt
        </button>

        <Link href={"/"} className="w-full max-w-[301px]">
          <button className="h-[50px] w-full py-3 px-4 rounded-[20px] bg-[#EBE7F8] bg-blend-luminosity text-sm/[150%] font-bold tracking-[2px] text-[#2C2C26]">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
}
