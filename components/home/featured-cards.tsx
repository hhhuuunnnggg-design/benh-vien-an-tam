import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { formatPrice, markdownToPlainText } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  Department,
  DoctorProfile,
  Hospital,
  MedicalService,
} from "@/types/models";

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Link
      href={`/bac-si?department=${department.Uuid}`}
      className="group flex min-w-0 items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md"
    >
      <Image
        src={department.Icon}
        alt=""
        width={64}
        height={64}
        className="size-14 shrink-0 rounded-xl"
      />
      <span className="min-w-0 font-semibold group-hover:text-primary">
        {department.Name}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="ml-auto size-4 shrink-0 text-muted-foreground group-hover:text-primary"
      />
    </Link>
  );
}

export function HospitalCard({
  hospital,
  showBookingAction = false,
}: {
  hospital: Hospital;
  showBookingAction?: boolean;
}) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md">
      <div className="relative aspect-[16/9] bg-muted">
        <Image
          src={hospital.Image}
          alt={`Hình minh họa ${hospital.Name}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-7">{hospital.Name}</h3>
        <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
          <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
          <span>{hospital.Address}</span>
        </p>
        <p className="mt-1 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
          <Clock3 aria-hidden="true" className="mt-1 size-4 shrink-0" />
          <span>{hospital.WorkingHour}</span>
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <Link
            href={`/co-so-y-te/${hospital.Slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
          >
            Xem chi tiết
          </Link>
          {showBookingAction ? (
            <Link
              href={`/dat-lich/co-so-y-te?hospital=${hospital.Uuid}`}
              className={cn(buttonVariants(), "flex-1")}
            >
              Đặt lịch
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function DoctorCard({
  doctor,
  showBookingAction = false,
}: {
  doctor: DoctorProfile;
  showBookingAction?: boolean;
}) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md">
      <div className="relative aspect-[16/9] bg-muted">
        <Image
          src={doctor.Image}
          alt={`Hình minh họa ${doctor.Name}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {doctor.DepartmentDisplay}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-7">{doctor.Name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {doctor.Specialty}
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {doctor.Workplace}
        </p>
        <span className="mt-4 text-sm font-semibold">
          {formatPrice(doctor.Price)}
        </span>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <Link
            href={`/bac-si/${doctor.Slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
          >
            Xem chi tiết
          </Link>
          {showBookingAction ? (
            <Link
              href={`/dat-lich/bac-si?doctor=${doctor.Uuid}`}
              className={cn(buttonVariants(), "flex-1")}
            >
              Đặt lịch
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function MedicalServiceCard({
  service,
  showBookingAction = false,
}: {
  service: MedicalService;
  showBookingAction?: boolean;
}) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md">
      <div className="relative aspect-[16/9] bg-muted">
        <Image
          src={service.Image}
          alt={`Hình minh họa ${service.Name}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-7">{service.Name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {markdownToPlainText(service.Description)}
        </p>
        <p className="mt-3 text-sm font-semibold">
          {formatPrice(service.Price)}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <Link
            href={`/dich-vu/${service.Slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
          >
            Xem chi tiết
          </Link>
          {showBookingAction ? (
            <Link
              href={`/dat-lich/dich-vu?service=${service.Uuid}`}
              className={cn(buttonVariants(), "flex-1")}
            >
              Đặt lịch
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
