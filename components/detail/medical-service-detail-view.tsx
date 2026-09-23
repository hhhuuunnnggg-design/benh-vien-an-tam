import {
  Building2,
  CalendarPlus,
  ChevronRight,
  Clock3,
  ClipboardCheck,
  MapPin,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

import { DetailImage } from "@/components/detail/detail-image";
import { DetailSection } from "@/components/detail/detail-shell";
import { RelatedList } from "@/components/detail/related-list";
import { ReviewList } from "@/components/detail/review-list";
import { SafeMarkdown } from "@/components/shared/safe-markdown";
import { buttonVariants } from "@/components/ui/button";
import { displayText, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { MedicalServiceDetail } from "@/types/details";

const sections = [
  { id: "tong-quan", label: "Tổng quan" },
  { id: "chi-tiet", label: "Chi tiết thực hiện" },
  { id: "co-so", label: "Cơ sở cung cấp" },
  { id: "danh-gia", label: "Đánh giá" },
];

export function MedicalServiceDetailView({
  detail,
}: {
  detail: MedicalServiceDetail;
}) {
  const { MedicalService: service, Hospitals, Reviews } = detail;
  const bookingHref = `/dat-lich/dich-vu?service=${service.Uuid}`;

  return (
    <article className="pb-20">
      <div className="container-shell pt-6 sm:pt-8">
        <nav
          aria-label="Đường dẫn"
          className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/" className="shrink-0 hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
          <Link href="/dich-vu" className="shrink-0 hover:text-foreground">
            Dịch vụ y tế
          </Link>
          <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
          <span aria-current="page" className="truncate text-foreground">
            {service.Name}
          </span>
        </nav>

        <div className="mt-6 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
          <div className="relative min-h-72 overflow-hidden rounded-2xl border bg-muted sm:min-h-[28rem]">
            <DetailImage
              src={service.Image}
              fallbackSrc="/images/service-placeholder.svg"
              alt={`Minh họa ${service.Name}`}
            />
          </div>

          <section className="flex min-w-0 flex-col rounded-2xl border bg-card p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Dịch vụ y tế đang hoạt động
            </p>
            <h1 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {service.Name}
            </h1>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Xem nội dung thực hiện, thời gian, chi phí dự kiến và lựa chọn cơ sở phù hợp trước khi đặt lịch.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <SummaryFact
                icon={WalletCards}
                label="Chi phí dự kiến"
                value={formatPrice(service.Price)}
              />
              <SummaryFact
                icon={Clock3}
                label="Khung giờ phục vụ"
                value={displayText(service.WorkingHour)}
              />
              <SummaryFact
                icon={Building2}
                label="Cơ sở cung cấp"
                value={Hospitals.length ? `${Hospitals.length} cơ sở` : "Đang cập nhật"}
              />
              <SummaryFact
                icon={ClipboardCheck}
                label="Trạng thái"
                value="Đang tiếp nhận đặt lịch"
              />
            </div>

            <div className="mt-auto grid gap-2 pt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href="#tong-quan"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full",
                )}
              >
                Xem nội dung
              </a>
              <Link
                href={bookingHref}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                <CalendarPlus aria-hidden="true" />
                Đặt lịch dịch vụ
              </Link>
            </div>
          </section>
        </div>
      </div>

      <nav
        aria-label="Nội dung trang"
        className="sticky top-16 z-30 mt-8 border-y bg-background/95 backdrop-blur-sm"
      >
        <div className="container-shell overflow-x-auto">
          <div className="flex min-w-max gap-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container-shell mt-8 grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-7">
          <DetailSection id="tong-quan" title="Tổng quan dịch vụ">
            <SafeMarkdown content={service.Description} />
          </DetailSection>

          <DetailSection id="chi-tiet" title="Chi tiết thực hiện">
            <SafeMarkdown content={service.DetailService} />
          </DetailSection>

          <DetailSection
            id="co-so"
            title="Cơ sở đang cung cấp"
            description="Chọn cơ sở phù hợp ở bước đặt lịch. Danh sách được xác định từ quan hệ cung cấp dịch vụ."
          >
            <RelatedList
              items={Hospitals.map((hospital) => ({
                href: `/co-so-y-te/${hospital.Slug}`,
                title: hospital.Name,
                description: `${displayText(hospital.Address)} · ${displayText(hospital.WorkingHour)}`,
              }))}
              emptyMessage="Cơ sở cung cấp đang được cập nhật."
            />
          </DetailSection>

          <DetailSection id="danh-gia" title="Đánh giá từ người bệnh">
            <ReviewList
              reviews={Reviews.map(
                ({ Uuid, Content, NumberOfStar, CreatedAt }) => ({
                  Uuid,
                  Content,
                  NumberOfStar,
                  CreatedAt,
                }),
              )}
              target={{ type: "medical-service", uuid: service.Uuid }}
            />
          </DetailSection>
        </div>

        <aside className="hidden self-start space-y-4 lg:sticky lg:top-32 lg:block">
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm font-semibold text-primary">Đặt lịch dịch vụ</p>
            <h2 className="mt-2 text-lg font-bold">Chọn cơ sở và thời gian</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Chọn cơ sở đang cung cấp, ngày và giờ khả dụng để gửi yêu cầu đặt lịch.
            </p>
            <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">
              Chi phí dự kiến
              <strong className="mt-1 block text-base text-foreground">
                {formatPrice(service.Price)}
              </strong>
            </p>
            <Link
              href={bookingHref}
              className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
            >
              <CalendarPlus aria-hidden="true" />
              Đặt lịch dịch vụ
            </Link>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm font-semibold">Cơ sở tiếp nhận</p>
            <p className="mt-3 text-2xl font-bold">{Hospitals.length}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              cơ sở đang liên kết cung cấp dịch vụ này.
            </p>
            {Hospitals[0] ? (
              <p className="mt-4 flex items-start gap-2 border-t pt-4 text-sm leading-6 text-muted-foreground">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                {Hospitals[0].Address}
              </p>
            ) : null}
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-4 bottom-3 z-40 lg:hidden">
        <Link
          href={bookingHref}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 w-full border border-primary-foreground/20 shadow-md",
          )}
        >
          <CalendarPlus aria-hidden="true" />
          Đặt lịch dịch vụ
        </Link>
      </div>
    </article>
  );
}

function SummaryFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof WalletCards;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl bg-muted/55 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}
