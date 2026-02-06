import { useMemo } from "react";

const UPDATED_DATE = "February 6, 2026";

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
            Offline-only strategy game. No accounts, no ads, no analytics.
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
                Quantum Nexus is an offline-only game. We do not collect, store,
                or share personal data.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Data Collection
                </h3>
                <p className="mt-1">
                  No accounts, analytics, ads, or crash reporting are used. We
                  do not collect identifiers or usage data.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Permissions
                </h3>
                <p className="mt-1">
                  The app does not request device permissions beyond standard
                  platform requirements.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Local Storage
                </h3>
                <p className="mt-1">
                  Game progress is stored locally on your device. Uninstalling
                  the app removes local data.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Children&apos;s Privacy
                </h3>
                <p className="mt-1">
                  We do not knowingly collect personal data from children
                  because we do not collect any data.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Changes
                </h3>
                <p className="mt-1">
                  If this policy changes, we will update the date shown above.
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
                These Terms govern your use of Quantum Nexus. By using the game,
                you agree to these Terms.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  License
                </h3>
                <p className="mt-1">
                  You are granted a personal, non-exclusive, non-transferable
                  license to use the game for personal, non-commercial
                  entertainment.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Acceptable Use
                </h3>
                <p className="mt-1">
                  Do not hack, reverse engineer, or attempt to interfere with
                  the game. Do not use automation, exploits, or unauthorized
                  tools.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  User Content
                </h3>
                <p className="mt-1">
                  Quantum Nexus does not accept user-generated content at this
                  time.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Disclaimer
                </h3>
                <p className="mt-1">
                  The game is provided &quot;as is&quot; without warranties. To
                  the maximum extent permitted by law, we are not liable for
                  damages arising from use of the game.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Changes
                </h3>
                <p className="mt-1">
                  We may update these Terms from time to time. Continued use
                  after updates indicates acceptance.
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
