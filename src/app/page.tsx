"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, AlertCircle, X, Clock, UtensilsCrossed } from "lucide-react";

export default function LandingPage() {
  const [downloading, setDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalInfo, setModalInfo] = useState<{ title: string; message: string; codeHint?: string } | null>(null);

  // Read download URL from environment variable
  const apkDownloadUrl = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL;

  const handleDownload = () => {
    // If not configured, show friendly message instead of a broken link
    if (!apkDownloadUrl || apkDownloadUrl.trim() === "") {
      setModalInfo({
        title: "APK Download Notice",
        message: "The APK download file is not configured yet. Please check back shortly.",
        codeHint: "NEXT_PUBLIC_APK_DOWNLOAD_URL=/downloads/mbbs-canteen.apk",
      });
      return;
    }

    setDownloading(true);
    setToastMessage("Downloading MBBS Canteen APK...");

    // Trigger direct file download
    const filename = apkDownloadUrl.split("/").pop()?.split("?")[0] || "canteenapp.apk";
    const link = document.createElement("a");
    link.href = apkDownloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setToastMessage("Download started! Check your downloads to install.");
    }, 1200);

    setTimeout(() => {
      setDownloading(false);
      setToastMessage(null);
    }, 5000);
  };

  return (
    <div className="page-container">
      {/* Background warm ambient glow matching logo colors */}
      <div className="bg-decor-circle bg-decor-1" aria-hidden="true" />
      <div className="bg-decor-circle bg-decor-2" aria-hidden="true" />

      {/* Download Status Toast */}
      {toastMessage && (
        <div className="download-toast" role="status" aria-live="polite">
          <div className="toast-spinner" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Single Centered Section */}
      <main className="hero-wrapper" id="main-content">
        <div className="hero-grid">
          {/* Main Content Column */}
          <section className="hero-content">
            {/* Prominent MBBS Canteen Logo */}
            <div className="logo-container" id="brand-logo">
              <div className="logo-glow" />
              <div className="logo-image-frame">
                <Image
                  src="/logo.jpg"
                  alt="MBBS Canteen Logo"
                  width={104}
                  height={104}
                  priority
                  className="logo-img"
                />
              </div>
            </div>

            {/* App Name */}
            <div className="app-name-tag" id="app-name">
              <UtensilsCrossed size={15} />
              <span>MBBS Canteen</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline" id="main-headline">
              Your Canteen, Just a Tap Away.
            </h1>

            {/* Short Description */}
            <p className="hero-description" id="main-description">
              Explore the menu and order your favourite canteen meals with ease.
            </p>

            {/* Download Action Section */}
            <div className="cta-download-block">
              {/* Primary APK Download Button */}
              <button
                type="button"
                id="download-android-button"
                className="btn-download-primary"
                onClick={handleDownload}
                disabled={downloading}
                aria-label="Download Android App"
              >
                <div className="btn-icon-wrapper">
                  {downloading ? (
                    <div className="toast-spinner" />
                  ) : (
                    /* Android Robot Icon */
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9996.4482.9996.9993.0001.5511-.4485.9997-.9996.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9994.4482.9994.9993 0 .5511-.4483.9997-.9994.9997m11.4045-6.02l1.996-3.4572c.1135-.1969.0462-.448-.1507-.5615-.1967-.1137-.448-.0464-.5616.1506l-2.0229 3.5036C15.5985 8.3582 13.8564 8 12 8s-3.5985.3582-5.1423.9569L4.8348 5.4533c-.1136-.197-.3649-.2643-.5616-.1506-.1969.1135-.2642.3646-.1507.5615l1.996 3.4572C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
                    </svg>
                  )}
                </div>
                <div className="btn-text-wrapper">
                  <span className="btn-text-main">Download Android App</span>
                  <span className="btn-text-sub">Direct APK File</span>
                </div>
              </button>

              {/* Under the button: Available for Android devices */}
              <div className="download-subtext" id="available-android-info">
                <CheckCircle2 size={16} className="check-icon" />
                <span>Available for Android devices.</span>
              </div>

              {/* Subtle Announcement: Coming Soon on Google Play Store */}
              <div
                className="play-store-pill"
                id="play-store-pill"
                role="note"
                aria-label="Coming Soon on Google Play Store"
              >
                {/* Google Play Tri-color Logo */}
                <svg
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M48.7 13.5c-4.3 4.6-6.8 11.5-6.8 20.3v444.4c0 8.8 2.5 15.7 6.8 20.3l1.1 1.1L277 272.2V265.8L49.8 12.4l-1.1 1.1z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M353.4 348.6l-76.4-76.4V265.8l76.4-76.4 1.7 1 90.6 51.5c25.9 14.7 25.9 38.7 0 53.4l-90.6 51.5-1.7 1.8z"
                  />
                  <path
                    fill="#EA4335"
                    d="M355.1 346.8L277 268.7 48.7 497.1c8.5 9 22.7 10.1 38.4 1.2l268-151.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M355.1 185.2L87.1 33.7C71.4 24.8 57.2 25.9 48.7 34.9L277 263.3l78.1-78.1z"
                  />
                </svg>
                <span>Coming Soon on Google Play Store</span>
              </div>
            </div>
          </section>

          {/* Clean Mobile App Mockup */}
          <aside className="mockup-column" aria-label="App Preview">
            <div className="phone-mockup-shell">
              <div className="phone-camera-notch" />
              <div className="mockup-inner-screen">
                {/* Mockup Header */}
                <div className="mockup-app-header">
                  <div className="mockup-app-brand">
                    <div className="mockup-mini-logo">
                      <Image
                        src="/logo.jpg"
                        alt="MBBS Canteen Icon"
                        width={28}
                        height={28}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <div className="mockup-title">MBBS Canteen</div>
                      <div className="mockup-subtitle">Daily Meals</div>
                    </div>
                  </div>
                  <div className="mockup-wallet-chip">
                    <span>₹1,650</span>
                  </div>
                </div>

                {/* Mockup Body Content */}
                <div className="mockup-body">
                  <div className="mockup-date-tabs">
                    <span className="mockup-tab-active">Today’s Menu</span>
                    <span className="mockup-tab-idle">Tomorrow</span>
                  </div>

                  <div className="mockup-cutoff-pill">
                    <Clock size={12} />
                    <span>Cutoff: 10:30 AM • Orders Open</span>
                  </div>

                  {/* Meal Card */}
                  <div className="mockup-meal-card">
                    <div className="mockup-meal-badge-row">
                      <div className="mockup-veg-tag">
                        <span className="mockup-veg-icon">
                          <span className="mockup-veg-dot" />
                        </span>
                        <span>PURE VEG THALI</span>
                      </div>
                      <span className="mockup-status-tag">Fresh</span>
                    </div>

                    <h4 className="mockup-meal-title">Special Meal Thali</h4>
                    <p className="mockup-meal-items">
                      Dal Makhani, Paneer Butter Masala, 3 Rotis, Steamed Rice & Sweet.
                    </p>

                    <div className="mockup-meal-footer">
                      <span className="mockup-price">₹80</span>
                      <button type="button" className="mockup-order-btn" tabIndex={-1}>
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="mockup-bottom-nav">
                  <div className="mockup-nav-item active">
                    <UtensilsCrossed size={13} />
                    <span>Menu</span>
                  </div>
                  <div className="mockup-nav-item">
                    <Clock size={13} />
                    <span>Orders</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Friendly Dialog If URL is Not Configured */}
      {modalInfo && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-title">
                <AlertCircle size={20} style={{ color: "var(--color-primary)" }} />
                <span>{modalInfo.title}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalInfo(null)}
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: "10px" }}>{modalInfo.message}</p>
              {modalInfo.codeHint && (
                <div
                  style={{
                    background: "#F8FAFC",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    fontSize: "0.8rem",
                    fontFamily: "monospace",
                    wordBreak: "break-all",
                    color: "var(--color-text-title)",
                  }}
                >
                  {modalInfo.codeHint}
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn-download-primary"
              style={{ width: "100%", maxWidth: "100%", minHeight: "44px", padding: "10px 20px" }}
              onClick={() => setModalInfo(null)}
            >
              <span className="btn-text-main">Understood</span>
            </button>
          </div>
        </div>
      )}

      {/* Minimal Clean Footer */}
      <footer className="site-footer">
        <p>© 2026 MBBS Canteen</p>
      </footer>
    </div>
  );
}
