import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description:
    "Tìm hiểu định hướng, giá trị và cách AnTam hỗ trợ người bệnh trong hành trình chăm sóc sức khỏe.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Lấy người bệnh làm trung tâm",
    description:
      "Mỗi luồng thông tin được tổ chức từ góc nhìn của người cần khám: dễ hiểu, dễ so sánh và biết rõ bước tiếp theo.",
  },
  {
    icon: ShieldCheck,
    title: "Minh bạch trong lựa chọn",
    description:
      "Tên cơ sở, chuyên môn, dịch vụ, chi phí dự kiến và trạng thái lịch được trình bày nhất quán, hạn chế thông tin mơ hồ.",
  },
  {
    icon: Compass,
    title: "Đơn giản nhưng có định hướng",
    description:
      "Chúng tôi giảm bớt thao tác không cần thiết nhưng vẫn giữ đủ ngữ cảnh để người dùng đưa ra lựa chọn phù hợp.",
  },
  {
    icon: LockKeyhole,
    title: "Tôn trọng dữ liệu cá nhân",
    description:
      "Thông tin hồ sơ, lịch hẹn và đơn thuốc được tiếp cận theo đúng phạm vi của tài khoản người bệnh.",
  },
];

const journey = [
  {
    title: "Bắt đầu từ nhu cầu thực tế",
    description:
      "Quan sát những khó khăn phổ biến khi tìm nơi khám, lựa chọn bác sĩ và chuẩn bị thông tin trước buổi hẹn.",
  },
  {
    title: "Chuẩn hóa hành trình đặt lịch",
    description:
      "Xây dựng ba điểm bắt đầu rõ ràng theo cơ sở, bác sĩ và dịch vụ, nhưng dùng chung một trải nghiệm xác nhận lịch.",
  },
  {
    title: "Kết nối dữ liệu sau buổi khám",
    description:
      "Lịch hẹn, hồ sơ, đơn thuốc và đánh giá được đặt trong cùng một khu vực cá nhân để thuận tiện theo dõi.",
  },
  {
    title: "Liên tục cải thiện trải nghiệm",
    description:
      "Mỗi phiên bản tiếp tục tinh chỉnh khả năng tìm kiếm, khả năng đọc trên thiết bị nhỏ và độ rõ ràng của thông tin.",
  },
];

const ecosystem = [
  {
    image: "/images/hospital-campus-placeholder.svg",
    alt: "Minh họa cơ sở y tế",
    title: "Cơ sở y tế",
    description:
      "Giúp người bệnh xem địa chỉ, giờ làm việc, chuyên khoa, dịch vụ và hướng dẫn đi khám trước khi đặt lịch.",
    href: "/co-so-y-te",
  },
  {
    image: "/images/doctor-placeholder.svg",
    alt: "Minh họa bác sĩ",
    title: "Đội ngũ bác sĩ",
    description:
      "Hồ sơ chuyên môn, nơi làm việc và chi phí dự kiến được trình bày theo cùng một cấu trúc dễ đối chiếu.",
    href: "/bac-si",
  },
  {
    image: "/images/service-placeholder.svg",
    alt: "Minh họa dịch vụ y tế",
    title: "Dịch vụ y tế",
    description:
      "Nội dung thực hiện, lưu ý chuẩn bị, khung giờ và các cơ sở cung cấp được tập hợp trong một trang chi tiết.",
    href: "/dich-vu",
  },
];

const gallery = [
  {
    src: "/images/hospital-campus-placeholder.svg",
    alt: "Ảnh placeholder cho không gian làm việc",
    label: "Không gian và đối tác",
  },
  {
    src: "/images/doctor-placeholder.svg",
    alt: "Ảnh placeholder cho đội ngũ",
    label: "Con người và chuyên môn",
  },
  {
    src: "/images/service-placeholder.svg",
    alt: "Ảnh placeholder cho hoạt động dịch vụ",
    label: "Sản phẩm và trải nghiệm",
  },
];

export default function AboutPage() {
  return (
    <article>
      <section className="border-b bg-secondary/40">
        <div className="container-shell grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary">Về AnTam</p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Công nghệ rõ ràng hơn cho hành trình chăm sóc sức khỏe
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              AnTam được xây dựng để giúp người bệnh tìm hiểu, lựa chọn và quản lý lịch khám trên một trải nghiệm thống nhất, dễ tiếp cận ở cả máy tính và điện thoại.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tim-kiem"
                className={cn(buttonVariants({ size: "lg" }), "h-11")}
              >
                <Search aria-hidden="true" />
                Khám phá nền tảng
              </Link>
              <Link
                href="/dat-lich/co-so-y-te"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 bg-background",
                )}
              >
                Đặt lịch khám
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src="/images/hospital-campus-placeholder.svg"
                alt="Ảnh giới thiệu AnTam"
                fill
                preload
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="border-t p-4 text-sm leading-6 text-muted-foreground">
              Kết nối thông tin, con người và dịch vụ trong một hành trình chăm sóc liền mạch.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-primary">Câu chuyện của chúng tôi</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Bắt đầu từ một câu hỏi đơn giản
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground">
            <p>
              Khi cần chăm sóc sức khỏe, người bệnh thường phải tự ghép nối nhiều nguồn thông tin: nơi nào đang hoạt động, bác sĩ nào phù hợp, dịch vụ gồm những gì và lịch nào còn khả dụng. Sự phân tán đó khiến một quyết định vốn đã nhiều lo lắng trở nên phức tạp hơn.
            </p>
            <p>
              AnTam hướng đến việc tổ chức lại hành trình này theo cách gần gũi hơn. Thay vì bắt người dùng hiểu cấu trúc vận hành của từng cơ sở, nền tảng bắt đầu từ chính nhu cầu: tìm nơi khám, tìm bác sĩ hoặc tìm dịch vụ cần thực hiện.
            </p>
            <p>
              Chúng tôi tin rằng trải nghiệm y tế số tốt không chỉ là nhiều tính năng. Quan trọng hơn là thông tin đúng ngữ cảnh, thao tác có thể dự đoán và mỗi trạng thái đều giải thích rõ điều gì đang diễn ra.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/40">
        <div className="container-shell grid gap-5 py-12 sm:py-16 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-semibold text-primary">Sứ mệnh</p>
            <h2 className="mt-2 text-2xl font-bold">Giảm khoảng cách giữa thông tin và hành động</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Giúp người bệnh tiếp cận thông tin chăm sóc sức khỏe theo cấu trúc rõ ràng, từ đó chủ động hơn khi tìm kiếm, đặt lịch và theo dõi hành trình của mình.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Compass aria-hidden="true" className="size-5" />
            </span>
            <p className="mt-5 text-sm font-semibold text-primary">Tầm nhìn</p>
            <h2 className="mt-2 text-2xl font-bold">Một hành trình chăm sóc nhất quán và đáng tin cậy</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Xây dựng nền tảng nơi mỗi bước trước, trong và sau lịch khám được kết nối hợp lý, có thể mở rộng cùng hệ sinh thái cơ sở và dịch vụ y tế.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-primary">Giá trị theo đuổi</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Nguyên tắc định hướng mọi quyết định</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Từ cách đặt tên một nút bấm đến cách kiểm tra quyền truy cập dữ liệu, các giá trị này giúp sản phẩm giữ được sự nhất quán khi phát triển.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border bg-card p-5 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/40">
        <div className="container-shell py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary">Hệ sinh thái chăm sóc</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Ba điểm bắt đầu, một trải nghiệm thống nhất</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Mỗi người có một cách tiếp cận khác nhau. Nền tảng cho phép bắt đầu từ thông tin họ đã biết mà không làm thay đổi quy trình quản lý lịch hẹn phía sau.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {ecosystem.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="relative aspect-[16/9] bg-muted">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Xem thông tin
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold text-primary">Hành trình phát triển</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Phát triển từ nền tảng cốt lõi</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Thay vì mở rộng bằng những tính năng rời rạc, sản phẩm được xây theo thứ tự của hành trình người bệnh và những thông tin có thể kiểm chứng.
            </p>
          </div>
          <ol className="space-y-4">
            {journey.map((item, index) => (
              <li key={item.title} className="flex gap-4 rounded-2xl border bg-card p-5 sm:p-6">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y bg-secondary/40">
        <div className="container-shell grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-card shadow-sm">
            <Image
              src="/images/patient-avatar-placeholder.svg"
              alt="Ảnh placeholder minh họa người bệnh"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Cam kết và giới hạn</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Hỗ trợ quyết định, không thay thế chuyên môn y tế</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              AnTam giúp tổ chức thông tin và hỗ trợ thao tác đặt lịch. Nội dung trên nền tảng không thay thế việc thăm khám, chẩn đoán hoặc chỉ định trực tiếp từ người có chuyên môn.
            </p>
            <ul className="mt-5 space-y-3">
              <Commitment text="Chỉ hiển thị thực thể công khai và đang hoạt động theo dữ liệu hệ thống." />
              <Commitment text="Tách rõ thông tin tham khảo, chi phí dự kiến và trạng thái lịch hẹn." />
              <Commitment text="Giới hạn dữ liệu cá nhân theo đúng tài khoản và hồ sơ liên kết." />
              <Commitment text="Chỉ cung cấp chức năng khi có đủ thông tin và quy trình hỗ trợ." />
            </ul>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-primary">Hình ảnh hoạt động</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Những lát cắt trong hành trình phát triển</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Hình ảnh về con người, không gian và hoạt động giúp câu chuyện của nền tảng trở nên gần gũi, trực quan hơn.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {gallery.map((item, index) => (
            <figure
              key={item.label}
              className={cn(
                "overflow-hidden rounded-2xl border bg-card",
                index === 0 && "md:col-span-2 md:row-span-2",
              )}
            >
              <div className={cn("relative bg-muted", index === 0 ? "aspect-[16/10]" : "aspect-[16/9]")}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t px-4 py-3 text-sm font-medium">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-shell flex flex-col gap-6 py-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary-foreground/75">Bắt đầu hành trình của bạn</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Tìm lựa chọn chăm sóc phù hợp ngay hôm nay</h2>
            <p className="mt-3 leading-7 text-primary-foreground/75">
              Tra cứu thông tin trước, chọn cách đặt lịch phù hợp và quản lý các lịch hẹn trong cùng một tài khoản người bệnh.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/tim-kiem" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Tìm kiếm
            </Link>
            <Link
              href="/dat-lich/co-so-y-te"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 px-4 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              Đặt lịch khám
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function Commitment({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-6">
      <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
      <span>{text}</span>
    </li>
  );
}
