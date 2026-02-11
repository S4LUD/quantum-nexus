import { useMemo } from "react";

const UPDATED_DATE = "February 11, 2026";

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-5 py-12 sm:px-8">
        <header className="border-b border-slate-200 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Quantum Nexus
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Privacy Policy &amp; Terms of Service
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Strategic network game with realtime multiplayer and minimal data
            processing.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Official legal text is in English. Translations are for convenience
            only.
          </p>
        </header>

        <main className="mt-8 space-y-10 text-sm leading-6 text-slate-700">
          <section>
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Privacy Policy
                </h2>
                <p className="text-xs text-slate-500">
                  Last updated {UPDATED_DATE}
                </p>
              </div>
              <p>
                This Privacy Policy explains how Quantum Nexus processes
                information when you use gameplay and multiplayer features.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Categories of Data Processed
                </h3>
                <p className="mt-1">
                  We process only data necessary to operate the game and
                  protect service integrity: player display name, match
                  identifier, multiplayer state, session token metadata, and
                  operational telemetry required for reliability and abuse
                  prevention. We do not sell personal data and we do not use
                  third-party advertising or behavioral analytics.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Purposes, Legal Basis, and Permissions
                </h3>
                <p className="mt-1">
                  Data processing is performed to provide core multiplayer
                  functionality, maintain security, prevent abuse, and
                  troubleshoot service issues. Where applicable law requires a
                  legal basis, processing is performed to provide requested
                  services, to pursue legitimate interests in security and
                  stability, or based on consent where required. The app may
                  request audio-related permissions to support sound playback
                  and system audio behavior.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Retention, Storage Location, and Security
                </h3>
                <p className="mt-1">
                  Single-player progress is stored locally on your device until
                  you delete app data or uninstall the app. Multiplayer state
                  is stored on server infrastructure and in managed cache
                  snapshots for continuity, reconnection, and operational
                  recovery, then removed according to session lifecycle and
                  service retention controls. We apply reasonable technical and
                  organizational safeguards, but no transmission or storage
                  method can be guaranteed as absolutely secure.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Children&apos;s Data and User Rights
                </h3>
                <p className="mt-1">
                  Quantum Nexus is not directed to children under the age
                  threshold defined by applicable law. We do not knowingly
                  collect personal data from children for profiling or
                  marketing. If you believe a child submitted personal data,
                  contact us to request review and deletion. Depending on your
                  jurisdiction, you may request access, correction, deletion, or
                  objection related to data processing, subject to verification
                  and legal limitations.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Policy Updates and Contact
                </h3>
                <p className="mt-1">
                  We may amend this Privacy Policy from time to time. Material
                  updates are reflected by the revised &quot;Last updated&quot;
                  date. Questions, privacy requests, or data-rights requests
                  should be sent through the support contact listed in the
                  official app store page.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8">
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Terms of Service
                </h2>
                <p className="text-xs text-slate-500">
                  Last updated {UPDATED_DATE}
                </p>
              </div>
              <p>
                These Terms of Service constitute a legally binding agreement
                between you and the publisher of Quantum Nexus. By installing,
                accessing, or using the game, you acknowledge that you have
                read, understood, and agree to be bound by these Terms.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  License Grant and Ownership
                </h3>
                <p className="mt-1">
                  Subject to your ongoing compliance with these Terms, you are
                  granted a limited, revocable, non-exclusive,
                  non-transferable, and non-sublicensable license to install
                  and use Quantum Nexus for personal, non-commercial
                  entertainment. All intellectual property rights, title, and
                  interest in the game, its content, and all related materials
                  are reserved by the publisher and its licensors.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Acceptable Use and Enforcement
                </h3>
                <p className="mt-1">
                  You must not decompile, reverse engineer, tamper with,
                  disrupt, or attempt unauthorized access to any service,
                  network, or game system. You must not use automation,
                  exploits, or methods that manipulate fair play. The publisher
                  may investigate suspected violations and may suspend or
                  terminate access, remove participation from multiplayer
                  sessions, or apply other reasonable enforcement measures.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Online Sessions and User Identifiers
                </h3>
                <p className="mt-1">
                  To participate in multiplayer, you provide a display name and
                  receive session credentials. You are responsible for activity
                  conducted through your session while it is active on your
                  device. You must not impersonate others, use unlawful or
                  abusive identifiers, or submit content that violates
                  applicable law. Quantum Nexus currently does not provide
                  public user-generated uploads or chat features.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Disclaimers, Limitation of Liability, and Indemnity
                </h3>
                <p className="mt-1">
                  Quantum Nexus is provided on an &quot;as is&quot; and
                  &quot;as available&quot; basis without warranties of any kind,
                  to the fullest extent permitted by law. To the fullest extent
                  permitted by law, the publisher and its service providers are
                  not liable for indirect, incidental, special, consequential,
                  exemplary, or punitive damages, or for loss of data, revenue,
                  or goodwill arising from or related to use of the game. You
                  agree to indemnify and hold harmless the publisher from
                  claims arising from your breach of these Terms or misuse of
                  the service.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Changes, Governing Law, and Contact
                </h3>
                <p className="mt-1">
                  The publisher may revise these Terms at any time. Updated
                  Terms become effective when posted with a revised date, and
                  continued use constitutes acceptance. These Terms are governed
                  by the laws applicable in the publisher&apos;s principal place
                  of business, excluding conflict-of-law rules. If you have
                  legal questions or requests, use the support contact listed
                  in the official app store page.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              If you have questions about this policy, contact the publisher
              using the support email listed in the Google Play store listing.
            </p>
          </section>
        </main>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-xs text-slate-500">
          Quantum Nexus © {year}
        </footer>
      </div>
    </div>
  );
}
