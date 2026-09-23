import {
  Building2,
  CalendarPlus,
  ChevronRight,
  MapPin,
  Stethoscope,
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
import type { DoctorDetail } from "@/types/details";

const sections = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "chuyen-mon", label: "Chuyên môn" },
  { id: "chuyen-khoa", label: "Chuyên khoa" },
  { id: "co-so", label: "Cơ sở làm việc" },
  { id: "danh-gia", label: "Đánh giá" },
];

export function DoctorDetailView({ detail }: { detail: DoctorDetail }) {
  const { Doctor: doctor, Departments, Hospital: hospital, Reviews } = detail;
  const bookingHref = `/dat-lich/bac-si?doctor=${doctor.Uuid}`;

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
          <Link href="/bac-si" className="shrink-0 hover:text-foreground">
            Bác sĩ
          </Link>
          <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
          <span aria-current="page" className="truncate text-foreground">
            {doctor.Name}
          </span>
        </nav>

        <div className="mt-6 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
          <div className="relative min-h-80 overflow-hidden rounded-2xl border bg-[linear-gradient(145deg,var(--muted),var(--secondary))] sm:min-h-[30rem]">
            <DetailImage
              src={doctor.Image}
              fallbackSrc="/images/doctor-placeholder.svg"
              alt={`Bác sĩ ${doctor.Name}`}
            />
          </div>

          <section className="flex min-w-0 flex-col rounded-2xl border bg-card p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {displayText(doctor.DepartmentDisplay)}
            </p>
            <h1 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {doctor.Name}
            </h1>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Xem thông tin chuyên môn, nơi làm việc và lựa chọn lịch khám phù hợp với nhu cầu của bạn.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <SummaryFact
                icon={Stethoscope}
                label="Chuyên môn"
                value={displayText(doctor.Specialty)}
              />
              <SummaryFact
                icon={WalletCards}
                label="Chi phí dự kiến"
                value={formatPrice(doctor.Price)}
              />
              <SummaryFact
                icon={Building2}
                label="Nơi làm việc"
                value={displayText(doctor.Workplace)}
              />
              <SummaryFact
                icon={MapPin}
                label="Địa chỉ cơ sở"
                value={displayText(hospital.Address)}
              />
            </div>

            <div className="mt-auto grid gap-2 pt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href="#gioi-thieu"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full",
                )}
              >
                Xem thông tin
              </a>
              <Link
                href={bookingHref}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                <CalendarPlus aria-hidden="true" />
                Đặt lịch khám
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
          <DetailSection id="gioi-thieu" title="Giới thiệu bác sĩ">
            <SafeMarkdown content={doctor.Introduction} />
          </DetailSection>

          <DetailSection id="chuyen-mon" title="Kinh nghiệm và chuyên môn">
            <SafeMarkdown content={doctor.Expertise} />
          </DetailSection>

          <DetailSection
            id="chuyen-khoa"
            title="Chuyên khoa"
            description="Các chuyên khoa được xác định từ hồ sơ chuyên môn của bác sĩ."
          >
            <RelatedList
              items={Departments.map((department) => ({
                href: `/bac-si?department=${department.Uuid}`,
                title: department.Name,
                description: department.Description,
              }))}
              emptyMessage="Chuyên khoa đang được cập nhật."
            />
          </DetailSection>

          <DetailSection id="co-so" title="Cơ sở làm việc">
            <RelatedList
              items={[
                {
                  href: `/co-so-y-te/${hospital.Slug}`,
                  title: hospital.Name,
                  description: `${displayText(hospital.Address)} · ${displayText(hospital.WorkingHour)}`,
                },
              ]}
              emptyMessage="Cơ sở làm việc đang được cập nhật."
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
              target={{ type: "doctor", uuid: doctor.Uuid }}
            />
          </DetailSection>
        </div>

        <aside className="hidden self-start space-y-4 lg:sticky lg:top-32 lg:block">
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm font-semibold text-primary">Đặt lịch với bác sĩ</p>
            <h2 className="mt-2 text-lg font-bold">Chủ động chọn thời gian</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Chọn ngày, giờ khả dụng và gửi yêu cầu. Lịch mới sẽ ở trạng thái chờ duyệt.
            </p>
            <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">
              Phí khám dự kiến
              <strong className="mt-1 block text-base text-foreground">
                {formatPrice(doctor.Price)}
              </strong>
            </p>
            <Link
              href={bookingHref}
              className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
            >
              <CalendarPlus aria-hidden="true" />
              Đặt lịch khám
            </Link>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm font-semibold">Thông tin cơ sở</p>
            <p className="mt-3 text-sm font-medium leading-6">{hospital.Name}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {hospital.Address}
            </p>
            <Link
              href={`/co-so-y-te/${hospital.Slug}`}
              className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              Xem cơ sở
            </Link>
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
          Đặt lịch khám
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
  icon: typeof Stethoscope;
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
