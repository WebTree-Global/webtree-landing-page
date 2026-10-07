import SectionHeading from "@/components/SectionHeading";
import CopyEmailButton from "@/components/home/CopyEmailButton";
import { SITE } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="page-section">
      <div className="page-container">
        <SectionHeading title="Contact" id="contact-title" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-16">
          <p className="reveal col-span-12 max-w-[20ch] font-serif text-display-3 font-light text-ivory-muted lg:col-span-6">
            For inquiries, partnership opportunities, or general correspondence.
          </p>

          <div className="reveal col-span-12 lg:col-span-6">
            <p className="label mb-4 text-ivory-faint">Email</p>
            <a
              href={`mailto:${SITE.email}`}
              className="font-serif text-[clamp(1.75rem,1rem+3vw,3rem)] font-light leading-tight text-ivory underline decoration-gold/50 decoration-1 underline-offset-[0.25em] transition-colors duration-300 hover:text-gold-bright hover:decoration-gold"
            >
              {SITE.email}
            </a>
            <div className="mt-5">
              <CopyEmailButton email={SITE.email} />
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div className="flex flex-col gap-1.5">
                <dt className="label text-ivory-faint">Location</dt>
                <dd className="text-ivory">{SITE.location}</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="label text-ivory-faint">Entity</dt>
                <dd className="text-ivory">{SITE.legalName}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
